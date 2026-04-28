import * as fs from 'fs-extra';
import * as path from 'path';
import glob from 'fast-glob';

export interface DesignToken {
  name: string;
  value: string;
  category: string;
  description?: string;
  usage?: string;
  deprecated?: boolean;
  semantic?: boolean;
}

export interface TokenCategory {
  name: string;
  description: string;
  tokens: DesignToken[];
}

export interface DesignTokens {
  colors: Record<string, DesignToken>;
  typography: Record<string, DesignToken>;
  spacing: Record<string, DesignToken>;
  radius: Record<string, DesignToken>;
  shadows: Record<string, DesignToken>;
  animation: Record<string, DesignToken>;
  breakpoints: Record<string, DesignToken>;
}

export class DesignTokenExtractor {
  private componentKitPath: string;
  private cache: DesignTokens | null = null;
  private lastCacheTime = 0;

  constructor(componentKitPath: string) {
    this.componentKitPath = componentKitPath;
  }

  async initialize(): Promise<void> {
    await this.extractTokens();
  }

  private async extractTokens(): Promise<void> {
    const stylesDir = path.join(this.componentKitPath, 'src/styles');
    if (!await fs.pathExists(stylesDir)) {
      throw new Error(`Styles directory not found: ${stylesDir}`);
    }

    this.cache = {
      colors: {},
      typography: {},
      spacing: {},
      radius: {},
      shadows: {},
      animation: {},
      breakpoints: {}
    };

    // Extract from LESS variable files
    await this.extractColorsFromLess();
    await this.extractTypographyFromLess();
    await this.extractRadiusFromLess();
    await this.extractShadowsFromLess();
    await this.extractAnimationFromLess();

    // Extract CSS custom properties
    await this.extractCssCustomProperties();

    this.lastCacheTime = Date.now();
  }

  private async extractColorsFromLess(): Promise<void> {
    const colorsPath = path.join(this.componentKitPath, 'src/styles/colorsVariables.less');

    if (!await fs.pathExists(colorsPath)) {
      console.warn('colorsVariables.less not found');
      return;
    }

    const content = await fs.readFile(colorsPath, 'utf-8');
    const colorMatches = content.matchAll(/@([a-zA-Z0-9-_]+):\s*([^;]+);/g);

    for (const match of colorMatches) {
      const [, name, value] = match;
      const cleanValue = value.trim();

      this.cache!.colors[name] = {
        name: `@${name}`,
        value: cleanValue,
        category: 'colors',
        description: this.generateColorDescription(name, cleanValue),
        usage: this.generateColorUsage(name),
        semantic: this.isSemanticColor(name)
      };
    }
  }

  private async extractTypographyFromLess(): Promise<void> {
    const typographyPath = path.join(this.componentKitPath, 'src/styles/typographyVariables.less');

    if (!await fs.pathExists(typographyPath)) {
      console.warn('typographyVariables.less not found');
      return;
    }

    const content = await fs.readFile(typographyPath, 'utf-8');

    // Extract font families
    const fontFamilyMatches = content.matchAll(/--font-family-([^:]+):\s*([^;]+);/g);
    for (const match of fontFamilyMatches) {
      const [, name, value] = match;
      this.cache!.typography[`font-family-${name}`] = {
        name: `--font-family-${name}`,
        value: value.trim(),
        category: 'typography',
        description: `Font family: ${name}`,
        usage: this.generateFontUsage(name)
      };
    }

    // Extract font sizes
    const fontSizeMatches = content.matchAll(/--font-size-([^:]+):\s*([^;]+);/g);
    for (const match of fontSizeMatches) {
      const [, name, value] = match;
      this.cache!.typography[`font-size-${name}`] = {
        name: `--font-size-${name}`,
        value: value.trim(),
        category: 'typography',
        description: `Font size: ${name}`,
        usage: this.generateFontSizeUsage(name)
      };
    }

    // Extract line heights
    const lineHeightMatches = content.matchAll(/--line-height-([^:]+):\s*([^;]+);/g);
    for (const match of lineHeightMatches) {
      const [, name, value] = match;
      this.cache!.typography[`line-height-${name}`] = {
        name: `--line-height-${name}`,
        value: value.trim(),
        category: 'typography',
        description: `Line height: ${name}`,
        usage: `Use for ${name} line spacing`
      };
    }

    // Also extract LESS typography variables
    const lessTypographyMatches = content.matchAll(/@([a-zA-Z0-9-_]+):\s*([^;]+);/g);
    for (const match of lessTypographyMatches) {
      const [, name, value] = match;
      if (this.isTypographyVariable(name)) {
        this.cache!.typography[name] = {
          name: `@${name}`,
          value: value.trim(),
          category: 'typography',
          description: this.generateTypographyDescription(name),
          usage: this.generateTypographyUsage(name)
        };
      }
    }
  }

  private async extractRadiusFromLess(): Promise<void> {
    const radiusPath = path.join(this.componentKitPath, 'src/styles/radiusVariables.less');

    if (!await fs.pathExists(radiusPath)) {
      console.warn('radiusVariables.less not found');
      return;
    }

    const content = await fs.readFile(radiusPath, 'utf-8');

    // Extract CSS custom properties for radius
    const radiusMatches = content.matchAll(/--nck-radius-([^:]+):\s*([^;]+);/g);
    for (const match of radiusMatches) {
      const [, name, value] = match;
      this.cache!.radius[`nck-radius-${name}`] = {
        name: `--nck-radius-${name}`,
        value: value.trim(),
        category: 'radius',
        description: `Border radius: ${name}`,
        usage: this.generateRadiusUsage(name)
      };
    }

    // Also extract LESS radius variables
    const lessRadiusMatches = content.matchAll(/@([a-zA-Z0-9-_]+):\s*([^;]+);/g);
    for (const match of lessRadiusMatches) {
      const [, name, value] = match;
      if (name.includes('radius') || name.includes('border')) {
        this.cache!.radius[name] = {
          name: `@${name}`,
          value: value.trim(),
          category: 'radius',
          description: `Border radius: ${name}`,
          usage: this.generateRadiusUsage(name)
        };
      }
    }
  }

  private async extractShadowsFromLess(): Promise<void> {
    const shadowsPath = path.join(this.componentKitPath, 'src/styles/boxShadowsVariables.less');

    if (!await fs.pathExists(shadowsPath)) {
      // Try alternative names
      const altPaths = [
        path.join(this.componentKitPath, 'src/styles/shadowsVariables.less'),
        path.join(this.componentKitPath, 'src/styles/elevationVariables.less')
      ];

      for (const altPath of altPaths) {
        if (await fs.pathExists(altPath)) {
          return this.extractShadowsFromFile(altPath);
        }
      }

      console.warn('No shadow variables file found');
      return;
    }

    return this.extractShadowsFromFile(shadowsPath);
  }

  private async extractShadowsFromFile(filePath: string): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');

    // Extract CSS custom properties for shadows
    const shadowMatches = content.matchAll(/--([^:]+shadow[^:]*|elevation[^:]*|box-shadow[^:]*):\s*([^;]+);/g);
    for (const match of shadowMatches) {
      const [, name, value] = match;
      this.cache!.shadows[name] = {
        name: `--${name}`,
        value: value.trim(),
        category: 'shadows',
        description: this.generateShadowDescription(name),
        usage: this.generateShadowUsage(name)
      };
    }

    // Extract LESS shadow variables
    const lessShadowMatches = content.matchAll(/@([a-zA-Z0-9-_]*(?:shadow|elevation)[a-zA-Z0-9-_]*):\s*([^;]+);/g);
    for (const match of lessShadowMatches) {
      const [, name, value] = match;
      this.cache!.shadows[name] = {
        name: `@${name}`,
        value: value.trim(),
        category: 'shadows',
        description: this.generateShadowDescription(name),
        usage: this.generateShadowUsage(name)
      };
    }
  }

  private async extractAnimationFromLess(): Promise<void> {
    const animationPath = path.join(this.componentKitPath, 'src/styles/animationVariables.less');

    if (!await fs.pathExists(animationPath)) {
      console.warn('animationVariables.less not found');
      return;
    }

    const content = await fs.readFile(animationPath, 'utf-8');

    // Extract animation variables
    const animationMatches = content.matchAll(/@([a-zA-Z0-9-_]*(?:animation|transition|duration|easing)[a-zA-Z0-9-_]*):\s*([^;]+);/g);
    for (const match of animationMatches) {
      const [, name, value] = match;
      this.cache!.animation[name] = {
        name: `@${name}`,
        value: value.trim(),
        category: 'animation',
        description: this.generateAnimationDescription(name),
        usage: this.generateAnimationUsage(name)
      };
    }

    // Extract CSS custom properties for animations
    const cssAnimationMatches = content.matchAll(/--([^:]*(?:animation|transition|duration|easing)[^:]*):\s*([^;]+);/g);
    for (const match of cssAnimationMatches) {
      const [, name, value] = match;
      this.cache!.animation[name] = {
        name: `--${name}`,
        value: value.trim(),
        category: 'animation',
        description: this.generateAnimationDescription(name),
        usage: this.generateAnimationUsage(name)
      };
    }
  }

  private async extractCssCustomProperties(): Promise<void> {
    const stylesDir = path.join(this.componentKitPath, 'src/styles');
    const styleFiles = await glob('**/*.{css,less}', { cwd: stylesDir, absolute: true });

    for (const filePath of styleFiles) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        await this.extractCssPropertiesFromContent(content);
      } catch (error) {
        console.warn(`Error reading style file ${filePath}:`, error);
      }
    }
  }

  private async extractCssPropertiesFromContent(content: string): Promise<void> {
    // Extract CSS custom properties (--property-name: value;)
    const cssPropertyMatches = content.matchAll(/--([^:]+):\s*([^;]+);/g);

    for (const match of cssPropertyMatches) {
      const [, name, value] = match;
      const category = this.determineCssPropertyCategory(name);
      const cleanValue = value.trim();

      // Don't overwrite existing tokens
      if (!this.cache![category as keyof DesignTokens][name]) {
        (this.cache![category as keyof DesignTokens] as Record<string, DesignToken>)[name] = {
          name: `--${name}`,
          value: cleanValue,
          category: category,
          description: this.generateCssPropertyDescription(name, category),
          usage: this.generateCssPropertyUsage(name, category)
        };
      }
    }
  }

  private determineCssPropertyCategory(propertyName: string): string {
    const name = propertyName.toLowerCase();

    if (name.includes('color') || name.includes('bg') || name.includes('background')) return 'colors';
    if (name.includes('font') || name.includes('text') || name.includes('line-height')) return 'typography';
    if (name.includes('spacing') || name.includes('margin') || name.includes('padding') || name.includes('gap')) return 'spacing';
    if (name.includes('radius') || name.includes('border-radius')) return 'radius';
    if (name.includes('shadow') || name.includes('elevation')) return 'shadows';
    if (name.includes('transition') || name.includes('animation') || name.includes('duration') || name.includes('easing')) return 'animation';
    if (name.includes('breakpoint') || name.includes('screen') || name.includes('media')) return 'breakpoints';

    return 'spacing'; // Default fallback
  }

  // Description generators
  private generateColorDescription(name: string, value: string): string {
    if (name.includes('blue')) return `Blue color variant: ${value}`;
    if (name.includes('red')) return `Red color variant: ${value}`;
    if (name.includes('green')) return `Green color variant: ${value}`;
    if (name.includes('yellow')) return `Yellow color variant: ${value}`;
    if (name.includes('gray') || name.includes('grey')) return `Gray color variant: ${value}`;
    if (name.includes('white')) return `White color: ${value}`;
    if (name.includes('black')) return `Black color: ${value}`;
    if (name.includes('primary')) return `Primary brand color: ${value}`;
    if (name.includes('secondary')) return `Secondary brand color: ${value}`;
    if (name.includes('accent')) return `Accent color: ${value}`;
    if (name.includes('success')) return `Success state color: ${value}`;
    if (name.includes('error')) return `Error state color: ${value}`;
    if (name.includes('warning')) return `Warning state color: ${value}`;

    return `Color token: ${value}`;
  }

  private generateColorUsage(name: string): string {
    if (name.includes('primary')) return 'Use for primary buttons, links, and main brand elements';
    if (name.includes('secondary')) return 'Use for secondary actions and supporting elements';
    if (name.includes('success')) return 'Use for success messages, confirmations, and positive states';
    if (name.includes('error')) return 'Use for error messages, validation failures, and destructive actions';
    if (name.includes('warning')) return 'Use for warnings, cautions, and intermediate states';
    if (name.includes('background')) return 'Use for page and component backgrounds';
    if (name.includes('text')) return 'Use for text content and typography';
    if (name.includes('border')) return 'Use for borders, dividers, and outlines';

    return `Use for ${name.replace(/-/g, ' ')} related styling`;
  }

  private isSemanticColor(name: string): boolean {
    const semanticTerms = ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark', 'text', 'background', 'border'];
    return semanticTerms.some(term => name.toLowerCase().includes(term));
  }

  private generateFontUsage(name: string): string {
    if (name.includes('primary')) return 'Use as the primary font family for body text and UI elements';
    if (name.includes('heading')) return 'Use for headings and display text';
    if (name.includes('mono') || name.includes('code')) return 'Use for code, technical content, and monospaced text';

    return `Use for ${name} typography contexts`;
  }

  private generateFontSizeUsage(name: string): string {
    if (name.includes('xs') || name === 'small') return 'Use for very small text like captions and fine print';
    if (name.includes('sm') || name === 'small') return 'Use for small text like labels and secondary information';
    if (name.includes('base') || name === 'body') return 'Use for body text and general content';
    if (name.includes('lg') || name === 'large') return 'Use for large text like subheadings';
    if (name.includes('xl') || name.includes('heading')) return 'Use for headings and prominent text';
    if (name.includes('display')) return 'Use for display headings and hero text';

    return `Use for ${name} sized text`;
  }

  private isTypographyVariable(name: string): boolean {
    return name.includes('font') || name.includes('text') || name.includes('line') || name.includes('weight') || name.includes('size');
  }

  private generateTypographyDescription(name: string): string {
    if (name.includes('font-family')) return `Font family: ${name}`;
    if (name.includes('font-size')) return `Font size: ${name}`;
    if (name.includes('font-weight')) return `Font weight: ${name}`;
    if (name.includes('line-height')) return `Line height: ${name}`;
    if (name.includes('letter-spacing')) return `Letter spacing: ${name}`;

    return `Typography token: ${name}`;
  }

  private generateTypographyUsage(name: string): string {
    return `Use for ${name.replace(/-/g, ' ')} typography styling`;
  }

  private generateRadiusUsage(name: string): string {
    if (name.includes('xs') || name === 's') return 'Use for subtle rounded corners on small elements';
    if (name.includes('sm') || name === 'm') return 'Use for moderate rounded corners on buttons and cards';
    if (name.includes('md') || name === 'l') return 'Use for prominent rounded corners on containers';
    if (name.includes('lg') || name === 'xl') return 'Use for highly rounded corners on special elements';
    if (name.includes('full') || name === 'circle') return 'Use for fully rounded elements like avatars and pills';

    return `Use for ${name} border radius styling`;
  }

  private generateShadowDescription(name: string): string {
    if (name.includes('level') || name.includes('elevation')) return `Elevation shadow level: ${name}`;
    if (name.includes('button')) return `Button shadow: ${name}`;
    if (name.includes('card')) return `Card shadow: ${name}`;
    if (name.includes('modal')) return `Modal shadow: ${name}`;

    return `Shadow token: ${name}`;
  }

  private generateShadowUsage(name: string): string {
    if (name.includes('1') || name.includes('low')) return 'Use for subtle elevation on interactive elements';
    if (name.includes('2') || name.includes('medium')) return 'Use for moderate elevation on cards and buttons';
    if (name.includes('3') || name.includes('high')) return 'Use for high elevation on dropdowns and tooltips';
    if (name.includes('4') || name.includes('highest')) return 'Use for highest elevation on modals and overlays';

    return `Use for ${name} shadow and elevation effects`;
  }

  private generateAnimationDescription(name: string): string {
    if (name.includes('duration')) return `Animation duration: ${name}`;
    if (name.includes('easing')) return `Animation easing: ${name}`;
    if (name.includes('transition')) return `Transition: ${name}`;

    return `Animation token: ${name}`;
  }

  private generateAnimationUsage(name: string): string {
    if (name.includes('fast') || name.includes('quick')) return 'Use for quick micro-interactions and state changes';
    if (name.includes('normal') || name.includes('base')) return 'Use for standard transitions and animations';
    if (name.includes('slow') || name.includes('long')) return 'Use for prominent animations and page transitions';

    return `Use for ${name} animation timing and easing`;
  }

  private generateCssPropertyDescription(name: string, category: string): string {
    return `${category.charAt(0).toUpperCase() + category.slice(1)} token: ${name}`;
  }

  private generateCssPropertyUsage(name: string, category: string): string {
    return `Use for ${name.replace(/-/g, ' ')} ${category} styling`;
  }

  async getTokens(): Promise<DesignTokens> {
    if (!this.cache || this.shouldRefreshCache()) {
      await this.extractTokens();
    }
    return this.cache!;
  }

  async getTokensByCategory(category: keyof DesignTokens): Promise<Record<string, DesignToken>> {
    const tokens = await this.getTokens();
    return tokens[category];
  }

  async findTokens(query: string, category?: keyof DesignTokens): Promise<DesignToken[]> {
    const tokens = await this.getTokens();
    const searchTerms = query.toLowerCase().split(/\s+/);
    const results: DesignToken[] = [];

    const categoriesToSearch = category ? [category] : Object.keys(tokens) as (keyof DesignTokens)[];

    for (const cat of categoriesToSearch) {
      const categoryTokens = tokens[cat];
      for (const token of Object.values(categoryTokens)) {
        const searchableText = [
          token.name,
          token.value,
          token.description || '',
          token.usage || '',
          token.category
        ].join(' ').toLowerCase();

        if (searchTerms.every(term => searchableText.includes(term))) {
          results.push(token);
        }
      }
    }

    return results;
  }

  invalidateCache(): void {
    this.cache = null;
    this.lastCacheTime = 0;
  }

  private shouldRefreshCache(): boolean {
    return Date.now() - this.lastCacheTime > 60000; // Refresh after 1 minute
  }
}