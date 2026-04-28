import * as fs from 'fs-extra';
import * as path from 'path';
import glob from 'fast-glob';

export interface NeoIcon {
  name: string;
  category: string;
  filePath: string;
  svgContent: string;
  base64Preview: string;
  dimensions: {
    width: number;
    height: number;
  };
  keywords: string[];
  colors: string[];
  size: number;
  metadata?: any;
}

export interface IconCategory {
  name: string;
  description: string;
  iconCount: number;
  icons: string[];
}

export class IconExtractor {
  private iconKitPath: string;
  private cache: Map<string, NeoIcon> = new Map();
  private categories: Map<string, IconCategory> = new Map();
  private iconMetadata: any = {};
  private lastCacheTime = 0;

  constructor(iconKitPath: string) {
    this.iconKitPath = iconKitPath;
  }

  async initialize(): Promise<void> {
    await this.loadIconMetadata();
    await this.extractIcons();
    await this.buildCategories();
  }

  private async loadIconMetadata(): Promise<void> {
    try {
      const metadataPath = path.join(this.iconKitPath, 'icons-metadata.json');
      if (await fs.pathExists(metadataPath)) {
        this.iconMetadata = await fs.readJson(metadataPath);
      }
    } catch (error) {
      console.warn('Could not load icon metadata:', error);
    }
  }

  private async extractIcons(): Promise<void> {
    const iconsDir = path.join(this.iconKitPath, 'icons');
    if (!await fs.pathExists(iconsDir)) {
      throw new Error(`Icons directory not found: ${iconsDir}`);
    }

    // Find all SVG files recursively
    const iconFiles = await glob('**/*.svg', {
      cwd: iconsDir,
      absolute: true
    });

    console.error(`Found ${iconFiles.length} icon files`);

    for (const filePath of iconFiles) {
      try {
        const icon = await this.extractIconFromFile(filePath);
        if (icon) {
          this.cache.set(icon.name, icon);
        }
      } catch (error) {
        console.warn(`Error extracting icon from ${filePath}:`, error);
      }
    }

    this.lastCacheTime = Date.now();
  }

  private async extractIconFromFile(filePath: string): Promise<NeoIcon | null> {
    const relativePath = path.relative(path.join(this.iconKitPath, 'icons'), filePath);
    const pathParts = relativePath.split(path.sep);
    const fileName = path.basename(filePath, '.svg');
    const category = pathParts.length > 1 ? pathParts[0] : 'general';

    const svgContent = await fs.readFile(filePath, 'utf-8');
    const dimensions = this.extractDimensions(svgContent);
    const colors = this.extractColors(svgContent);
    const keywords = this.generateKeywords(fileName, category, svgContent);
    const base64Preview = this.generateBase64Preview(svgContent);

    // Get metadata for this icon if available
    const metadata = this.findIconMetadata(fileName);

    const icon: NeoIcon = {
      name: fileName,
      category: category,
      filePath: filePath,
      svgContent: svgContent,
      base64Preview: base64Preview,
      dimensions: dimensions,
      keywords: keywords,
      colors: colors,
      size: svgContent.length,
      metadata: metadata
    };

    return icon;
  }

  private findIconMetadata(iconName: string): any {
    if (this.iconMetadata.icons) {
      return this.iconMetadata.icons[iconName] || this.iconMetadata.icons[iconName.replace('-', '_')];
    }
    return null;
  }

  private extractDimensions(svgContent: string): { width: number; height: number } {
    const widthMatch = svgContent.match(/width=['"](\d+)['"]/) || svgContent.match(/viewBox=['"][^'"]*\s(\d+)\s/);
    const heightMatch = svgContent.match(/height=['"](\d+)['"]/) || svgContent.match(/viewBox=['"][^'"]*\s[^'"]*\s(\d+)['"]/) ;

    return {
      width: widthMatch ? parseInt(widthMatch[1], 10) : 24,
      height: heightMatch ? parseInt(heightMatch[1], 10) : 24
    };
  }

  private extractColors(svgContent: string): string[] {
    const colors = new Set<string>();

    // Extract fill colors
    const fillMatches = svgContent.matchAll(/fill=['"]([^'"]+)['"]|fill:\s*([^;}\s]+)/g);
    for (const match of fillMatches) {
      const color = match[1] || match[2];
      if (color && color !== 'none' && color !== 'currentColor') {
        colors.add(color.toLowerCase());
      }
    }

    // Extract stroke colors
    const strokeMatches = svgContent.matchAll(/stroke=['"]([^'"]+)['"]|stroke:\s*([^;}\s]+)/g);
    for (const match of strokeMatches) {
      const color = match[1] || match[2];
      if (color && color !== 'none' && color !== 'currentColor') {
        colors.add(color.toLowerCase());
      }
    }

    return Array.from(colors);
  }

  private generateKeywords(fileName: string, category: string, svgContent: string): string[] {
    const keywords = new Set<string>();

    // Add filename parts
    fileName.split(/[-_]/).forEach(part => {
      if (part.length > 1) {
        keywords.add(part.toLowerCase());
      }
    });

    // Add category
    keywords.add(category.toLowerCase());

    // Add semantic keywords based on filename and category
    this.addSemanticKeywords(fileName, category, keywords);

    // Add SVG element keywords
    if (svgContent.includes('circle')) keywords.add('circle');
    if (svgContent.includes('rect')) keywords.add('rectangle');
    if (svgContent.includes('path')) keywords.add('path');
    if (svgContent.includes('polygon')) keywords.add('polygon');

    return Array.from(keywords);
  }

  private addSemanticKeywords(fileName: string, category: string, keywords: Set<string>): void {
    const name = fileName.toLowerCase();

    // Navigation keywords
    if (category === 'navigation' || name.includes('arrow') || name.includes('nav')) {
      keywords.add('navigation');
      keywords.add('direction');
      if (name.includes('left')) keywords.add('back');
      if (name.includes('right')) keywords.add('forward');
      if (name.includes('up')) keywords.add('up');
      if (name.includes('down')) keywords.add('down');
    }

    // Action keywords
    if (category === 'action' || name.includes('edit') || name.includes('delete') || name.includes('add')) {
      keywords.add('action');
      keywords.add('interactive');
      if (name.includes('edit')) keywords.add('modify');
      if (name.includes('delete') || name.includes('trash')) keywords.add('remove');
      if (name.includes('add') || name.includes('plus')) keywords.add('create');
      if (name.includes('save')) keywords.add('store');
    }

    // Communication keywords
    if (category === 'communication' || name.includes('mail') || name.includes('phone') || name.includes('chat')) {
      keywords.add('communication');
      keywords.add('contact');
      if (name.includes('mail') || name.includes('email')) keywords.add('email');
      if (name.includes('phone') || name.includes('call')) keywords.add('phone');
      if (name.includes('chat') || name.includes('message')) keywords.add('messaging');
    }

    // Status keywords
    if (category === 'status' || name.includes('success') || name.includes('error') || name.includes('warning')) {
      keywords.add('status');
      keywords.add('feedback');
      if (name.includes('success') || name.includes('check') || name.includes('tick')) keywords.add('success');
      if (name.includes('error') || name.includes('cross') || name.includes('x')) keywords.add('error');
      if (name.includes('warning') || name.includes('alert')) keywords.add('warning');
    }

    // Media keywords
    if (category === 'media' || name.includes('play') || name.includes('pause') || name.includes('volume')) {
      keywords.add('media');
      keywords.add('playback');
      if (name.includes('play')) keywords.add('start');
      if (name.includes('pause')) keywords.add('stop');
      if (name.includes('volume')) keywords.add('audio');
    }

    // File keywords
    if (name.includes('file') || name.includes('document') || name.includes('folder')) {
      keywords.add('file');
      keywords.add('document');
      if (name.includes('folder') || name.includes('directory')) keywords.add('folder');
      if (name.includes('download')) keywords.add('download');
      if (name.includes('upload')) keywords.add('upload');
    }

    // UI keywords
    if (name.includes('menu') || name.includes('hamburger') || name.includes('close')) {
      keywords.add('ui');
      keywords.add('interface');
      if (name.includes('menu')) keywords.add('menu');
      if (name.includes('close') || name.includes('x')) keywords.add('close');
    }
  }

  private generateBase64Preview(svgContent: string): string {
    // Clean the SVG and make it suitable for base64 encoding
    const cleanSvg = svgContent
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return `data:image/svg+xml;base64,${Buffer.from(cleanSvg).toString('base64')}`;
  }

  private async buildCategories(): Promise<void> {
    this.categories.clear();

    const categoryCounts = new Map<string, string[]>();

    // Group icons by category
    for (const icon of this.cache.values()) {
      if (!categoryCounts.has(icon.category)) {
        categoryCounts.set(icon.category, []);
      }
      categoryCounts.get(icon.category)!.push(icon.name);
    }

    // Build category objects
    for (const [categoryName, iconNames] of categoryCounts) {
      this.categories.set(categoryName, {
        name: categoryName,
        description: this.getCategoryDescription(categoryName),
        iconCount: iconNames.length,
        icons: iconNames.sort()
      });
    }
  }

  private getCategoryDescription(categoryName: string): string {
    const descriptions: Record<string, string> = {
      action: 'Interactive action icons (edit, delete, save, etc.)',
      navigation: 'Navigation and directional icons (arrows, menus, etc.)',
      communication: 'Communication icons (email, phone, chat, etc.)',
      media: 'Media control icons (play, pause, volume, etc.)',
      status: 'Status and feedback icons (success, error, warning, etc.)',
      file: 'File and document icons (folder, download, upload, etc.)',
      ui: 'User interface icons (close, menu, settings, etc.)',
      brand: 'Brand and logo icons',
      general: 'General purpose icons'
    };

    return descriptions[categoryName] || `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} icons`;
  }

  async getIcons(): Promise<NeoIcon[]> {
    if (this.cache.size === 0 || this.shouldRefreshCache()) {
      await this.extractIcons();
      await this.buildCategories();
    }
    return Array.from(this.cache.values());
  }

  async getIcon(name: string): Promise<NeoIcon | undefined> {
    const icons = await this.getIcons();
    return icons.find(i => i.name === name);
  }

  async getCategories(): Promise<IconCategory[]> {
    if (this.categories.size === 0 || this.shouldRefreshCache()) {
      await this.buildCategories();
    }
    return Array.from(this.categories.values());
  }

  async getIconsByCategory(category: string): Promise<NeoIcon[]> {
    const icons = await this.getIcons();
    return icons.filter(i => i.category === category);
  }

  async searchIcons(query: string, limit: number = 20): Promise<NeoIcon[]> {
    const icons = await this.getIcons();
    const searchTerms = query.toLowerCase().split(/\s+/);

    const results = icons.filter(icon => {
      const searchableText = [
        icon.name,
        icon.category,
        ...icon.keywords
      ].join(' ').toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });

    // Score and sort results
    const scored = results.map(icon => {
      let score = 0;

      // Exact name match gets highest score
      if (icon.name.toLowerCase() === query.toLowerCase()) {
        score += 100;
      }

      // Name contains query
      if (icon.name.toLowerCase().includes(query.toLowerCase())) {
        score += 50;
      }

      // Keywords match
      for (const keyword of icon.keywords) {
        if (keyword.includes(query.toLowerCase())) {
          score += 10;
        }
      }

      // Category match
      if (icon.category.toLowerCase().includes(query.toLowerCase())) {
        score += 5;
      }

      return { icon, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(result => result.icon);
  }

  invalidateCache(): void {
    this.cache.clear();
    this.categories.clear();
    this.lastCacheTime = 0;
  }

  private shouldRefreshCache(): boolean {
    return Date.now() - this.lastCacheTime > 60000; // Refresh after 1 minute
  }
}