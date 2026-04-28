import * as fs from 'fs-extra';
import * as path from 'path';
import glob from 'fast-glob';

export interface NeoComponent {
  name: string;
  category: string;
  complexity: 'simple' | 'medium' | 'complex';
  description: string;
  usage: string;
  filePath: string;
  interfacePath?: string;
  props: ComponentProp[];
  events: ComponentEvent[];
  slots: ComponentSlot[];
  examples: ComponentExample[];
  aiMetadata?: any;
}

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description: string;
  validator?: string;
}

export interface ComponentEvent {
  name: string;
  payload?: string;
  description: string;
}

export interface ComponentSlot {
  name: string;
  description: string;
  props?: Record<string, string>;
}

export interface ComponentExample {
  name: string;
  code: string;
  context: string;
  description?: string;
}

export class ComponentExtractor {
  private componentKitPath: string;
  private cache: Map<string, NeoComponent> = new Map();
  private aiMetadata: any = {};
  private lastCacheTime = 0;

  constructor(componentKitPath: string) {
    this.componentKitPath = componentKitPath;
  }

  async initialize(): Promise<void> {
    await this.loadAiMetadata();
    await this.extractComponents();
  }

  private async loadAiMetadata(): Promise<void> {
    try {
      const aiMetadataPath = path.join(this.componentKitPath, 'ai-metadata.json');
      if (await fs.pathExists(aiMetadataPath)) {
        this.aiMetadata = await fs.readJson(aiMetadataPath);
      }
    } catch (error) {
      console.warn('Could not load AI metadata:', error);
    }
  }

  private async extractComponents(): Promise<void> {
    const componentsDir = path.join(this.componentKitPath, 'src/components');
    if (!await fs.pathExists(componentsDir)) {
      throw new Error(`Components directory not found: ${componentsDir}`);
    }

    // Find all Vue component files
    const componentFiles = await glob('**/*.vue', {
      cwd: componentsDir,
      absolute: true
    });

    for (const filePath of componentFiles) {
      try {
        const component = await this.extractComponentFromFile(filePath);
        if (component) {
          this.cache.set(component.name, component);
        }
      } catch (error) {
        console.warn(`Error extracting component from ${filePath}:`, error);
      }
    }

    this.lastCacheTime = Date.now();
  }

  private async extractComponentFromFile(filePath: string): Promise<NeoComponent | null> {
    const fileName = path.basename(filePath, '.vue');

    // Skip if not an nck component
    if (!fileName.startsWith('nck')) {
      return null;
    }

    const content = await fs.readFile(filePath, 'utf-8');
    const interfacePath = await this.findInterfaceFile(fileName);

    // Extract AI metadata for this component
    const aiComponentData = this.findAiMetadata(fileName);

    const component: NeoComponent = {
      name: fileName,
      category: aiComponentData?.category || this.inferCategory(fileName),
      complexity: aiComponentData?.complexity || this.inferComplexity(content),
      description: aiComponentData?.description || this.extractDescription(content),
      usage: aiComponentData?.usage || this.extractUsage(content),
      filePath: filePath,
      interfacePath: interfacePath,
      props: await this.extractProps(content, interfacePath),
      events: this.extractEvents(content),
      slots: this.extractSlots(content),
      examples: aiComponentData?.examples || this.extractExamples(content),
      aiMetadata: aiComponentData
    };

    return component;
  }

  private findAiMetadata(componentName: string): any {
    if (this.aiMetadata.components) {
      return this.aiMetadata.components.find((comp: any) =>
        comp.name === componentName || comp.name === componentName.replace('nck-', '').replace('-', '')
      );
    }
    return null;
  }

  private async findInterfaceFile(componentName: string): Promise<string | undefined> {
    const interfacesDir = path.join(this.componentKitPath, 'src/components/interfaces');
    const possibleNames = [
      `i${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.ts`,
      `I${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.ts`,
      `${componentName}.interface.ts`
    ];

    for (const name of possibleNames) {
      const interfacePath = path.join(interfacesDir, name);
      if (await fs.pathExists(interfacePath)) {
        return interfacePath;
      }
    }

    return undefined;
  }

  private inferCategory(componentName: string): string {
    const name = componentName.toLowerCase();

    if (name.includes('button') || name.includes('link')) return 'action';
    if (name.includes('input') || name.includes('form') || name.includes('field')) return 'form';
    if (name.includes('modal') || name.includes('popup') || name.includes('overlay')) return 'overlay';
    if (name.includes('card') || name.includes('container') || name.includes('layout')) return 'layout';
    if (name.includes('toast') || name.includes('alert') || name.includes('banner')) return 'feedback';
    if (name.includes('nav') || name.includes('menu') || name.includes('tab')) return 'navigation';
    if (name.includes('table') || name.includes('list') || name.includes('grid')) return 'data';

    return 'layout';
  }

  private inferComplexity(content: string): 'simple' | 'medium' | 'complex' {
    const lines = content.split('\n').length;
    const hasComputedProps = content.includes('computed(');
    const hasWatchers = content.includes('watch(');
    const hasMultipleSlots = (content.match(/slot/g) || []).length > 2;
    const hasComplexLogic = content.includes('onMounted') || content.includes('onUpdated');

    if (lines > 200 || (hasWatchers && hasComplexLogic && hasMultipleSlots)) return 'complex';
    if (lines > 100 || hasComputedProps || hasWatchers || hasMultipleSlots) return 'medium';
    return 'simple';
  }

  private extractDescription(content: string): string {
    // Look for @component JSDoc comment
    const componentMatch = content.match(/@component[\s\S]*?\*\s*([^@\n]+)/);
    if (componentMatch) {
      return componentMatch[1].trim();
    }

    // Look for @displayName JSDoc comment
    const displayNameMatch = content.match(/@displayName\s+[\w-]+\s*\n\s*\*\s*([^@\n]+)/);
    if (displayNameMatch) {
      return displayNameMatch[1].trim();
    }

    return 'Neo Design System component';
  }

  private extractUsage(content: string): string {
    // Look for usage comments or examples in the file
    const usageMatch = content.match(/(?:usage|Usage):\s*([^\n]+)/);
    return usageMatch ? usageMatch[1].trim() : 'General purpose component for Neo Design System applications';
  }

  private async extractProps(content: string, interfacePath?: string): Promise<ComponentProp[]> {
    const props: ComponentProp[] = [];

    // Try to extract from TypeScript interface first
    if (interfacePath) {
      try {
        const interfaceContent = await fs.readFile(interfacePath, 'utf-8');
        props.push(...this.parseInterfaceProps(interfaceContent));
      } catch (error) {
        console.warn(`Could not read interface file ${interfacePath}:`, error);
      }
    }

    // Also extract from Vue component defineProps
    props.push(...this.parseVueProps(content));

    return this.deduplicateProps(props);
  }

  private parseInterfaceProps(content: string): ComponentProp[] {
    const props: ComponentProp[] = [];

    // Match interface properties
    const interfaceMatch = content.match(/export\s+interface\s+\w+\s*{([^}]+)}/s);
    if (!interfaceMatch) return props;

    const interfaceBody = interfaceMatch[1];
    const propMatches = interfaceBody.matchAll(/(\w+)\?\?:\s*([^;]+);?/g);

    for (const match of propMatches) {
      const [, name, type] = match;
      props.push({
        name: name.trim(),
        type: type.trim(),
        required: !match[0].includes('?'),
        description: this.extractPropDescription(content, name.trim())
      });
    }

    return props;
  }

  private parseVueProps(content: string): ComponentProp[] {
    const props: ComponentProp[] = [];

    // Match defineProps with TypeScript generic
    const definePropsMatch = content.match(/defineProps<{([^}]+)}>/s);
    if (definePropsMatch) {
      const propsBody = definePropsMatch[1];
      const propMatches = propsBody.matchAll(/(\w+)\??\s*:\s*([^;,\n]+)/g);

      for (const match of propMatches) {
        const [, name, type] = match;
        props.push({
          name: name.trim(),
          type: type.trim(),
          required: !match[0].includes('?'),
          description: this.extractPropDescription(content, name.trim())
        });
      }
    }

    return props;
  }

  private extractPropDescription(content: string, propName: string): string {
    // Look for JSDoc comment above prop
    const pattern = new RegExp(`\\/\\*\\*[^*]*\\*\\s*([^@\n]+)[^*]*\\*\\/\\s*${propName}`, 'i');
    const match = content.match(pattern);
    return match ? match[1].trim() : '';
  }

  private deduplicateProps(props: ComponentProp[]): ComponentProp[] {
    const seen = new Set();
    return props.filter(prop => {
      if (seen.has(prop.name)) return false;
      seen.add(prop.name);
      return true;
    });
  }

  private extractEvents(content: string): ComponentEvent[] {
    const events: ComponentEvent[] = [];

    // Match defineEmits
    const emitsMatch = content.match(/defineEmits<{([^}]+)}>/s);
    if (emitsMatch) {
      const emitsBody = emitsMatch[1];
      const eventMatches = emitsBody.matchAll(/(\w+):\s*\[([^\]]*)\]/g);

      for (const match of eventMatches) {
        const [, name, payload] = match;
        events.push({
          name: name.trim(),
          payload: payload.trim(),
          description: this.extractEventDescription(content, name.trim())
        });
      }
    }

    // Also look for emit calls
    const emitMatches = content.matchAll(/emit\(['"`](\w+)['"`]/g);
    for (const match of emitMatches) {
      const eventName = match[1];
      if (!events.find(e => e.name === eventName)) {
        events.push({
          name: eventName,
          description: `${eventName} event`
        });
      }
    }

    return events;
  }

  private extractEventDescription(content: string, eventName: string): string {
    // Look for JSDoc comment above emit definition
    const pattern = new RegExp(`\\/\\*\\*[^*]*\\*\\s*([^@\n]+)[^*]*\\*\\/[^}]*${eventName}`, 'i');
    const match = content.match(pattern);
    return match ? match[1].trim() : `${eventName} event`;
  }

  private extractSlots(content: string): ComponentSlot[] {
    const slots: ComponentSlot[] = [];

    // Match slot comments
    const slotMatches = content.matchAll(/<!--\s*@slot\s+([^-]+)-->/g);
    for (const match of slotMatches) {
      const description = match[1].trim();
      const slotMatch = description.match(/^(\w+)?\s*(.+)$/);

      if (slotMatch) {
        const [, name, desc] = slotMatch;
        slots.push({
          name: name || 'default',
          description: desc || description
        });
      }
    }

    // Also look for slot tags
    const slotTagMatches = content.matchAll(/<slot(?:\s+name=['"`](\w+)['"`])?[^>]*>/g);
    for (const match of slotTagMatches) {
      const name = match[1] || 'default';
      if (!slots.find(s => s.name === name)) {
        slots.push({
          name,
          description: `${name} slot`
        });
      }
    }

    return slots;
  }

  private extractExamples(content: string): ComponentExample[] {
    const examples: ComponentExample[] = [];

    // Look for example comments
    const exampleMatches = content.matchAll(/<!--\s*@example\s*([^-]+)-->/g);
    for (const match of exampleMatches) {
      const exampleText = match[1].trim();
      examples.push({
        name: 'usage',
        code: exampleText,
        context: 'General usage example'
      });
    }

    return examples;
  }

  async getComponents(): Promise<NeoComponent[]> {
    if (this.cache.size === 0 || this.shouldRefreshCache()) {
      await this.extractComponents();
    }
    return Array.from(this.cache.values());
  }

  async getComponent(name: string): Promise<NeoComponent | undefined> {
    const components = await this.getComponents();
    return components.find(c => c.name === name);
  }

  invalidateCache(): void {
    this.cache.clear();
    this.lastCacheTime = 0;
  }

  private shouldRefreshCache(): boolean {
    return Date.now() - this.lastCacheTime > 60000; // Refresh after 1 minute
  }
}