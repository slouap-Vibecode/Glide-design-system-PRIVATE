import { NeoComponent, ComponentExample } from './componentExtractor';
import { NeoIcon } from './iconExtractor';
import { DesignTokens, DesignToken } from './designTokenExtractor';

interface SearchResult<T> {
  item: T;
  score: number;
  matchedFields: string[];
}

interface ComponentSearchArgs {
  query?: string;
  category?: string;
  complexity?: 'simple' | 'medium' | 'complex';
  limit?: number;
}

interface IconSearchArgs {
  keywords?: string;
  category?: string;
  limit?: number;
}

interface CodeGenerationArgs {
  component: string;
  props?: Record<string, any>;
  context?: string;
}

interface PageGenerationArgs {
  pageType: string;
  requirements?: string[];
  layout?: string;
  components?: string[];
  features?: string[];
}

interface ComponentRecommendation {
  component: NeoComponent;
  reason: string;
  confidence: number;
  usage: string;
}

export class NeoSearchEngine {
  private components: NeoComponent[] = [];
  private icons: NeoIcon[] = [];
  private tokens: DesignTokens = {
    colors: {},
    typography: {},
    spacing: {},
    radius: {},
    shadows: {},
    animation: {},
    breakpoints: {}
  };

  async buildIndexes(components: NeoComponent[], icons: NeoIcon[], tokens: DesignTokens): Promise<void> {
    this.components = components;
    this.icons = icons;
    this.tokens = tokens;
  }

  async searchComponents(args: ComponentSearchArgs): Promise<SearchResult<NeoComponent>[]> {
    let candidates = [...this.components];

    // Filter by category if specified
    if (args.category) {
      candidates = candidates.filter(c => c.category.toLowerCase() === args.category?.toLowerCase());
    }

    // Filter by complexity if specified
    if (args.complexity) {
      candidates = candidates.filter(c => c.complexity === args.complexity);
    }

    // If no query, return filtered results
    if (!args.query) {
      return candidates.slice(0, args.limit || 10).map(component => ({
        item: component,
        score: 0,
        matchedFields: []
      }));
    }

    // Score and rank results
    const searchTerms = args.query.toLowerCase().split(/\s+/);
    const results: SearchResult<NeoComponent>[] = [];

    for (const component of candidates) {
      const result = this.scoreComponent(component, searchTerms);
      if (result.score > 0) {
        results.push(result);
      }
    }

    // Sort by score and apply limit
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, args.limit || 10);
  }

  private scoreComponent(component: NeoComponent, searchTerms: string[]): SearchResult<NeoComponent> {
    let score = 0;
    const matchedFields: string[] = [];

    // Exact name match gets highest priority
    if (searchTerms.some(term => component.name.toLowerCase() === term)) {
      score += 100;
      matchedFields.push('name');
    }

    // Name contains search terms
    if (searchTerms.some(term => component.name.toLowerCase().includes(term))) {
      score += 50;
      matchedFields.push('name');
    }

    // Description matches
    const description = component.description.toLowerCase();
    for (const term of searchTerms) {
      if (description.includes(term)) {
        score += 30;
        if (!matchedFields.includes('description')) {
          matchedFields.push('description');
        }
      }
    }

    // Usage matches
    const usage = component.usage.toLowerCase();
    for (const term of searchTerms) {
      if (usage.includes(term)) {
        score += 25;
        if (!matchedFields.includes('usage')) {
          matchedFields.push('usage');
        }
      }
    }

    // Category matches
    if (searchTerms.some(term => component.category.toLowerCase().includes(term))) {
      score += 20;
      matchedFields.push('category');
    }

    // Props match
    for (const prop of component.props) {
      for (const term of searchTerms) {
        if (prop.name.toLowerCase().includes(term) || prop.description.toLowerCase().includes(term)) {
          score += 15;
          if (!matchedFields.includes('props')) {
            matchedFields.push('props');
          }
        }
      }
    }

    // Examples match
    for (const example of component.examples) {
      for (const term of searchTerms) {
        if (example.context.toLowerCase().includes(term) || example.name.toLowerCase().includes(term)) {
          score += 10;
          if (!matchedFields.includes('examples')) {
            matchedFields.push('examples');
          }
        }
      }
    }

    // Semantic scoring for common UI patterns
    score += this.getSemanticScore(component, searchTerms);

    return {
      item: component,
      score,
      matchedFields
    };
  }

  private getSemanticScore(component: NeoComponent, searchTerms: string[]): number {
    let semanticScore = 0;

    const joinedTerms = searchTerms.join(' ');

    // Common UI pattern matches
    const patterns = [
      { pattern: 'button|click|action|submit', component: 'button', score: 20 },
      { pattern: 'input|form|field|text', component: 'input|field|text', score: 20 },
      { pattern: 'card|container|box', component: 'card|container', score: 15 },
      { pattern: 'modal|dialog|popup|overlay', component: 'modal|dialog|popup', score: 20 },
      { pattern: 'table|list|grid|data', component: 'table|list|grid', score: 15 },
      { pattern: 'nav|menu|navigation', component: 'nav|menu', score: 15 },
      { pattern: 'alert|toast|notification|message', component: 'alert|toast|banner', score: 15 },
      { pattern: 'loading|spinner|loader', component: 'loader|spinner', score: 20 },
      { pattern: 'tab|tabs|tabbed', component: 'tab', score: 20 },
      { pattern: 'dropdown|select|picker', component: 'dropdown|select', score: 20 }
    ];

    for (const { pattern, component: componentPattern, score } of patterns) {
      const patternRegex = new RegExp(pattern, 'i');
      const componentRegex = new RegExp(componentPattern, 'i');

      if (patternRegex.test(joinedTerms) && componentRegex.test(component.name)) {
        semanticScore += score;
      }
    }

    return semanticScore;
  }

  async findIcons(args: IconSearchArgs): Promise<SearchResult<NeoIcon>[]> {
    let candidates = [...this.icons];

    // Filter by category if specified
    if (args.category) {
      candidates = candidates.filter(i => i.category.toLowerCase() === args.category?.toLowerCase());
    }

    // If no keywords, return category results
    if (!args.keywords) {
      return candidates.slice(0, args.limit || 20).map(icon => ({
        item: icon,
        score: 0,
        matchedFields: []
      }));
    }

    // Score and rank results
    const searchTerms = args.keywords.toLowerCase().split(/\s+/);
    const results: SearchResult<NeoIcon>[] = [];

    for (const icon of candidates) {
      const result = this.scoreIcon(icon, searchTerms);
      if (result.score > 0) {
        results.push(result);
      }
    }

    // Sort by score and apply limit
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, args.limit || 20);
  }

  private scoreIcon(icon: NeoIcon, searchTerms: string[]): SearchResult<NeoIcon> {
    let score = 0;
    const matchedFields: string[] = [];

    // Exact name match gets highest priority
    if (searchTerms.some(term => icon.name.toLowerCase() === term)) {
      score += 100;
      matchedFields.push('name');
    }

    // Name contains search terms
    for (const term of searchTerms) {
      if (icon.name.toLowerCase().includes(term)) {
        score += 50;
        if (!matchedFields.includes('name')) {
          matchedFields.push('name');
        }
      }
    }

    // Keywords match
    for (const keyword of icon.keywords) {
      for (const term of searchTerms) {
        if (keyword.includes(term)) {
          score += 30;
          if (!matchedFields.includes('keywords')) {
            matchedFields.push('keywords');
          }
        }
      }
    }

    // Category matches
    if (searchTerms.some(term => icon.category.toLowerCase().includes(term))) {
      score += 20;
      matchedFields.push('category');
    }

    // Semantic scoring for icon contexts
    score += this.getIconSemanticScore(icon, searchTerms);

    return {
      item: icon,
      score,
      matchedFields
    };
  }

  private getIconSemanticScore(icon: NeoIcon, searchTerms: string[]): number {
    let semanticScore = 0;
    const joinedTerms = searchTerms.join(' ');

    // Context-based scoring
    const contexts = [
      { context: 'navigation|nav|arrow|direction', icons: 'arrow|nav|direction|back|forward|up|down', score: 15 },
      { context: 'action|edit|delete|save|create', icons: 'edit|delete|save|add|plus|minus|trash', score: 15 },
      { context: 'communication|contact|email|phone', icons: 'mail|email|phone|call|chat|message', score: 15 },
      { context: 'status|state|success|error|warning', icons: 'check|success|error|warning|alert|info', score: 15 },
      { context: 'media|play|pause|video|audio', icons: 'play|pause|stop|volume|media|video|audio', score: 15 },
      { context: 'file|document|folder|download', icons: 'file|document|folder|download|upload|attach', score: 15 },
      { context: 'ui|interface|menu|close|settings', icons: 'menu|close|settings|gear|hamburger|x', score: 10 }
    ];

    for (const { context, icons, score } of contexts) {
      const contextRegex = new RegExp(context, 'i');
      const iconsRegex = new RegExp(icons, 'i');

      if (contextRegex.test(joinedTerms) && iconsRegex.test(icon.name)) {
        semanticScore += score;
      }
    }

    return semanticScore;
  }

  async generateCode(args: CodeGenerationArgs): Promise<string> {
    // Find the component
    const component = this.components.find(c => c.name === args.component);
    if (!component) {
      return `// Component '${args.component}' not found in Neo Design System`;
    }

    // Generate Vue component code
    const imports = this.generateImports(component, args.props);
    const template = this.generateTemplate(component, args.props, args.context);
    const script = this.generateScript(component, args.props, args.context);
    const styles = this.generateStyles(component, args.context);

    return [
      imports,
      '',
      '<template>',
      template,
      '</template>',
      '',
      '<script setup lang="ts">',
      script,
      '</script>',
      '',
      styles ? '<style scoped>' : '',
      styles || '',
      styles ? '</style>' : ''
    ].filter(line => line !== null).join('\n');
  }

  private generateImports(component: NeoComponent, props?: Record<string, any>): string {
    const imports = [`import { ${this.toPascalCase(component.name)} } from '@neotechnologygroup/neo-component-kit';`];

    // Add icon imports if needed
    if (props?.leftIcon || props?.rightIcon || props?.icon) {
      imports.push("import { IconSize } from '@neotechnologygroup/neo-component-kit';");
    }

    // Add type imports
    if (component.interfacePath) {
      const interfaceName = `I${this.toPascalCase(component.name)}`;
      imports.push(`import type { ${interfaceName} } from '@neotechnologygroup/neo-component-kit';`);
    }

    return imports.join('\n');
  }

  private generateTemplate(component: NeoComponent, props?: Record<string, any>, context?: string): string {
    const elementName = component.name;
    const attributes: string[] = [];

    // Add provided props
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        if (typeof value === 'string') {
          attributes.push(`${key}="${value}"`);
        } else if (typeof value === 'boolean') {
          attributes.push(value ? key : `:${key}="false"`);
        } else {
          attributes.push(`:${key}="${JSON.stringify(value)}"`);
        }
      }
    }

    // Add context-specific defaults
    if (context && !props) {
      const contextProps = this.getContextualProps(component, context);
      attributes.push(...contextProps);
    }

    // Generate basic template
    const hasSlots = component.slots.length > 0;
    const indent = '  ';

    if (hasSlots) {
      const slotContent = this.generateSlotContent(component, context);
      return `${indent}<${elementName}${attributes.length ? ' ' + attributes.join(' ') : ''}>\n${slotContent}\n${indent}</${elementName}>`;
    } else {
      return `${indent}<${elementName}${attributes.length ? ' ' + attributes.join(' ') : ''} />`;
    }
  }

  private generateSlotContent(component: NeoComponent, context?: string): string {
    const indent = '    ';
    const slots: string[] = [];

    for (const slot of component.slots) {
      if (slot.name === 'default') {
        // Generate default slot content based on component type
        const content = this.getDefaultSlotContent(component, context);
        if (content) {
          slots.push(`${indent}${content}`);
        }
      } else {
        // Generate named slots with context-appropriate content
        const content = this.getNamedSlotContent(slot.name, component, context);
        if (content) {
          slots.push(`${indent}<template #${slot.name}>\n${indent}  ${content}\n${indent}</template>`);
        }
      }
    }

    return slots.join('\n');
  }

  private getDefaultSlotContent(component: NeoComponent, context?: string): string {
    if (component.name.includes('button')) {
      return context?.includes('save') ? 'Save Changes' :
             context?.includes('submit') ? 'Submit' :
             context?.includes('cancel') ? 'Cancel' :
             'Click Me';
    }

    if (component.name.includes('card') || component.name.includes('container')) {
      return '<!-- Your content here -->';
    }

    if (component.name.includes('modal') || component.name.includes('dialog')) {
      return '<p>Modal content goes here</p>';
    }

    return '<!-- Content -->';
  }

  private getNamedSlotContent(slotName: string, component: NeoComponent, context?: string): string {
    if (slotName.includes('header') || slotName.includes('title')) {
      return context?.includes('form') ? '<h3>Form Title</h3>' :
             context?.includes('settings') ? '<h3>Settings</h3>' :
             '<h3>Title</h3>';
    }

    if (slotName.includes('footer') || slotName.includes('actions')) {
      return `<${component.name.includes('button') ? component.name : 'nck-button'} type="filled">Action</${component.name.includes('button') ? component.name : 'nck-button'}>`;
    }

    return '<!-- Slot content -->';
  }

  private getContextualProps(component: NeoComponent, context: string): string[] {
    const props: string[] = [];

    // Button context
    if (component.name.includes('button')) {
      if (context.includes('primary') || context.includes('submit')) {
        props.push('type="filled"');
      } else if (context.includes('secondary')) {
        props.push('type="outlined"');
      } else if (context.includes('cancel') || context.includes('cancel')) {
        props.push('type="text"');
      }
    }

    // Input context
    if (component.name.includes('input') || component.name.includes('field')) {
      if (context.includes('email')) {
        props.push('type="email"', 'label="Email Address"');
      } else if (context.includes('password')) {
        props.push('type="password"', 'label="Password"');
      } else if (context.includes('name')) {
        props.push('label="Name"');
      }
    }

    return props;
  }

  private generateScript(component: NeoComponent, props?: Record<string, any>, context?: string): string {
    const lines: string[] = [];

    // Add reactive refs if component has events
    if (component.events.length > 0) {
      lines.push("import { ref } from 'vue';");
      lines.push('');
    }

    // Add component props interface if available
    if (component.interfacePath) {
      const interfaceName = `I${this.toPascalCase(component.name)}`;
      lines.push(`// Component props follow ${interfaceName} interface`);
    }

    // Add event handlers
    if (component.events.length > 0) {
      for (const event of component.events) {
        const handlerName = `handle${this.toPascalCase(event.name)}`;
        lines.push(`const ${handlerName} = (${event.payload || 'event'}) => {`);
        lines.push(`  // Handle ${event.name} event`);
        lines.push('  console.log(\'Event:\', event);');
        lines.push('};');
      }
    }

    return lines.join('\n');
  }

  private generateStyles(component: NeoComponent, context?: string): string | null {
    // Only generate styles if context suggests customization is needed
    if (!context?.includes('custom') && !context?.includes('style')) {
      return null;
    }

    return [
      '/* Component-specific styles */',
      '/* Use Neo Design System tokens for consistency */',
      `.${component.name} {`,
      '  /* Custom styles here */',
      '}'
    ].join('\n');
  }

  private toPascalCase(str: string): string {
    return str
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  async getDesignTokenRecommendations(usage: string, type?: keyof DesignTokens): Promise<DesignToken[]> {
    const recommendations: DesignToken[] = [];
    const searchTerms = usage.toLowerCase().split(/\s+/);

    const categories = type ? [type] : (Object.keys(this.tokens) as (keyof DesignTokens)[]);

    for (const category of categories) {
      const categoryTokens = this.tokens[category];

      for (const token of Object.values(categoryTokens)) {
        const score = this.scoreTokenForUsage(token, searchTerms);
        if (score > 0) {
          recommendations.push(token);
        }
      }
    }

    return recommendations
      .sort((a, b) => this.scoreTokenForUsage(b, searchTerms) - this.scoreTokenForUsage(a, searchTerms))
      .slice(0, 10);
  }

  private scoreTokenForUsage(token: DesignToken, searchTerms: string[]): number {
    let score = 0;

    const tokenText = [
      token.name,
      token.description || '',
      token.usage || '',
      token.category
    ].join(' ').toLowerCase();

    for (const term of searchTerms) {
      if (tokenText.includes(term)) {
        score += 10;
      }
    }

    // Boost semantic matches
    if (token.semantic) {
      score += 5;
    }

    return score;
  }

  // Intelligent component recommendation methods
  async recommendComponents(pageArgs: PageGenerationArgs): Promise<ComponentRecommendation[]> {
    const recommendations: ComponentRecommendation[] = [];

    // Define component patterns for different page types
    const pagePatterns = this.getPagePatterns(pageArgs.pageType);

    // Score components based on page requirements
    for (const component of this.components) {
      const recommendation = this.scoreComponentForPage(component, pageArgs, pagePatterns);
      if (recommendation.confidence > 0.3) { // Only include confident recommendations
        recommendations.push(recommendation);
      }
    }

    // Sort by confidence and return top recommendations
    return recommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 20);
  }

  private getPagePatterns(pageType: string): Record<string, number> {
    const patterns: Record<string, Record<string, number>> = {
      'home': {
        'nckHeader': 0.9,
        'nckCard': 0.8,
        'nckButton': 0.9,
        'nckIcon': 0.7,
        'nckBadge': 0.6,
        'nckBanner': 0.5
      },
      'dashboard': {
        'nckHeader': 0.9,
        'nckCard': 0.95,
        'nckTable': 0.8,
        'nckBadge': 0.8,
        'nckStatusIndicator': 0.7,
        'nckLoader': 0.6,
        'nckTabs': 0.7
      },
      'form': {
        'nckForm': 0.95,
        'nckTextInput': 0.9,
        'nckButton': 0.9,
        'nckCheckbox': 0.7,
        'nckRadioButtons': 0.7,
        'nckDropdown': 0.8,
        'nckTextArea': 0.6,
        'nckDatepickerSingle': 0.5
      },
      'profile': {
        'nckCard': 0.9,
        'nckButton': 0.8,
        'nckBadge': 0.7,
        'nckIcon': 0.8,
        'nckModal': 0.6,
        'nckForm': 0.7
      },
      'settings': {
        'nckTabs': 0.9,
        'nckForm': 0.8,
        'nckSwitch': 0.8,
        'nckButton': 0.8,
        'nckCard': 0.7,
        'nckDropdown': 0.6
      },
      'contact': {
        'nckForm': 0.95,
        'nckTextInput': 0.9,
        'nckTextArea': 0.9,
        'nckButton': 0.9,
        'nckCard': 0.8
      }
    };

    return patterns[pageType] || {};
  }

  private scoreComponentForPage(
    component: NeoComponent,
    pageArgs: PageGenerationArgs,
    patterns: Record<string, number>
  ): ComponentRecommendation {
    let confidence = 0;
    let reason = '';

    // Base score from page patterns
    const patternScore = patterns[component.name] || 0;
    confidence += patternScore * 0.6;

    if (patternScore > 0) {
      reason += `Essential for ${pageArgs.pageType} pages. `;
    }

    // Score based on specified components
    if (pageArgs.components?.includes(component.name)) {
      confidence += 0.4;
      reason += 'Explicitly requested. ';
    }

    // Score based on category matching
    if (pageArgs.layout === 'header' && component.category === 'layout') {
      confidence += 0.2;
      reason += 'Matches layout requirements. ';
    }

    // Score based on features
    if (pageArgs.features) {
      for (const feature of pageArgs.features) {
        if (component.description?.toLowerCase().includes(feature.toLowerCase()) ||
            component.name.toLowerCase().includes(feature.toLowerCase())) {
          confidence += 0.3;
          reason += `Supports ${feature} functionality. `;
        }
      }
    }

    // Score based on complexity appropriateness
    if (pageArgs.pageType === 'home' && component.complexity === 'simple') {
      confidence += 0.1;
      reason += 'Simple components work well for home pages. ';
    }

    // Generate usage recommendation
    const usage = this.generateUsageRecommendation(component, pageArgs);

    return {
      component,
      reason: reason.trim(),
      confidence: Math.min(confidence, 1.0),
      usage
    };
  }

  private generateUsageRecommendation(component: NeoComponent, pageArgs: PageGenerationArgs): string {
    const usagePatterns: Record<string, string> = {
      'nckHeader': 'Use as the main page header with navigation and branding.',
      'nckCard': 'Group related content and provide visual separation.',
      'nckButton': 'Primary actions like "Get Started", "Learn More", "Submit".',
      'nckForm': 'Collect user input with validation and proper structure.',
      'nckTable': 'Display structured data with sorting and pagination.',
      'nckModal': 'Show detailed information or capture user input in a focused overlay.',
      'nckBadge': 'Highlight status, categories, or important labels.',
      'nckTabs': 'Organize content into distinct sections.',
      'nckIcon': 'Enhance visual communication and improve usability.'
    };

    return usagePatterns[component.name] ||
           `Use ${component.name} for ${component.category} functionality in your ${pageArgs.pageType} page.`;
  }

  async generateIntelligentPage(pageArgs: PageGenerationArgs): Promise<string> {
    // Get component recommendations
    const recommendations = await this.recommendComponents(pageArgs);

    // Select top components for the page
    const selectedComponents = recommendations
      .filter(r => r.confidence > 0.5)
      .slice(0, 8)
      .map(r => r.component);

    // Generate the page structure
    return this.generatePageFromComponents(pageArgs, selectedComponents, recommendations);
  }

  private generatePageFromComponents(
    pageArgs: PageGenerationArgs,
    components: NeoComponent[],
    recommendations: ComponentRecommendation[]
  ): string {
    const pageType = pageArgs.pageType;
    const layout = pageArgs.layout || 'header';

    // Generate imports
    const imports = components.map(c => c.name).join(', ');

    // Generate component usage with intelligent placement
    const componentUsage = this.generateIntelligentComponentPlacement(components, pageArgs);

    return `<template>
  <div class="${pageType}-page">
    ${layout === 'header' ? this.generateHeaderSection(components) : ''}

    <main class="page-content">
      ${componentUsage}
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ${imports}
} from '@neotechnologygroup/neo-component-kit'
import { ButtonType } from '@neotechnologygroup/neo-component-kit/constants/buttonType'
import { IconSize } from '@neotechnologygroup/neo-component-kit/constants/iconSize'
import { ref } from 'vue'

// Component state and methods
${this.generateIntelligentComponentLogic(components, pageArgs)}
</script>

<style lang="less" scoped>
@import '@neotechnologygroup/neo-component-kit/src/styles/colorsVariables.less';

.${pageType}-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: 2rem;
  background: @blue-grey-100;
}

${this.generateIntelligentComponentStyles(components, pageArgs)}
</style>`;
  }

  private generateHeaderSection(components: NeoComponent[]): string {
    const hasHeader = components.some(c => c.name === 'nckHeader');

    if (hasHeader) {
      return `
    <nck-header class="page-header">
      <template #title>
        <h1>{{ pageTitle }}</h1>
      </template>
      <template #actions>
        <nck-button
          :label="'Get Started'"
          :buttonType="ButtonType.PRIMARY"
          @click="handleGetStarted"
        />
      </template>
    </nck-header>`;
    }

    return '';
  }

  private generateIntelligentComponentPlacement(
    components: NeoComponent[],
    pageArgs: PageGenerationArgs
  ): string {
    let content = '';

    // Group components by their typical page sections
    const sectionComponents = {
      hero: components.filter(c => ['nckCard', 'nckButton', 'nckIcon'].includes(c.name)),
      content: components.filter(c => ['nckTable', 'nckList', 'nckTabs'].includes(c.name)),
      forms: components.filter(c => c.category === 'form'),
      feedback: components.filter(c => ['nckBadge', 'nckBanner', 'nckToast'].includes(c.name))
    };

    // Generate hero section if applicable
    if (sectionComponents.hero.length > 0 && pageArgs.pageType === 'home') {
      content += this.generateHeroSection(sectionComponents.hero);
    }

    // Generate form section
    if (sectionComponents.forms.length > 0) {
      content += this.generateFormSection(sectionComponents.forms, pageArgs);
    }

    // Generate content section
    if (sectionComponents.content.length > 0) {
      content += this.generateContentSection(sectionComponents.content);
    }

    return content;
  }

  private generateHeroSection(components: NeoComponent[]): string {
    return `
      <section class="hero-section">
        <nck-card class="hero-card">
          <template #content>
            <div class="hero-content">
              <nck-icon
                :iconName="'star'"
                :iconSize="IconSize.XL"
                :primaryColor="'@bright-blue-300'"
                class="hero-icon"
              />
              <h2>{{ heroTitle }}</h2>
              <p>{{ heroDescription }}</p>

              <div class="hero-actions">
                <nck-button
                  :label="'Get Started'"
                  :buttonType="ButtonType.PRIMARY"
                  @click="handleGetStarted"
                />
              </div>
            </div>
          </template>
        </nck-card>
      </section>`;
  }

  private generateFormSection(components: NeoComponent[], pageArgs: PageGenerationArgs): string {
    const hasForm = components.some(c => c.name === 'nckForm');

    if (hasForm) {
      return `
      <section class="form-section">
        <nck-card>
          <template #header>
            <h3>{{ formTitle }}</h3>
          </template>
          <template #content>
            <nck-form @submit="handleFormSubmit">
              ${this.generateIntelligentFormFields(components)}

              <div class="form-actions">
                <nck-button
                  :label="'Submit'"
                  :buttonType="ButtonType.PRIMARY"
                  type="submit"
                />
              </div>
            </nck-form>
          </template>
        </nck-card>
      </section>`;
    }

    return '';
  }

  private generateContentSection(components: NeoComponent[]): string {
    return `
      <section class="content-section">
        <h3>Content Section</h3>
        <!-- Content components will be placed here -->
      </section>`;
  }

  private generateIntelligentFormFields(components: NeoComponent[]): string {
    let fields = '';

    const inputComponents = components.filter(c =>
      ['nckTextInput', 'nckTextArea', 'nckDropdown', 'nckCheckbox'].includes(c.name)
    );

    for (const component of inputComponents) {
      const fieldName = component.name.replace('nck', '').replace(/([A-Z])/g, ' $1').trim();
      fields += `
              <div class="form-field">
                <${component.name}
                  :label="'${fieldName}'"
                  v-model="formData.${component.name.replace('nck', '').toLowerCase()}"
                />
              </div>`;
    }

    return fields;
  }

  private generateIntelligentComponentLogic(components: NeoComponent[], pageArgs: PageGenerationArgs): string {
    return `
// Reactive data
const pageTitle = ref('${pageArgs.pageType.charAt(0).toUpperCase() + pageArgs.pageType.slice(1)} Page')
const heroTitle = ref('Welcome to Our Platform')
const heroDescription = ref('Discover amazing features and capabilities.')
const formTitle = ref('Get in Touch')
const formData = ref({})

// Methods
const handleGetStarted = (): void => {
  console.log('Getting started...')
}

const handleFormSubmit = (data: any): void => {
  console.log('Form submitted:', data)
}`;
  }

  private generateIntelligentComponentStyles(components: NeoComponent[], pageArgs: PageGenerationArgs): string {
    return `
.hero-section {
  margin-bottom: 3rem;

  .hero-card {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-content {
    padding: 2rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
}

.form-section {
  max-width: 600px;
  margin: 0 auto;
}

.form-field {
  margin-bottom: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .page-content {
    padding: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
}`;
  }
}