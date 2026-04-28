import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  McpError,
  ErrorCode,
} from '@modelcontextprotocol/sdk/types.js';
import { ComponentExtractor } from './utils/componentExtractor';
import { IconExtractor } from './utils/iconExtractor';
import { DesignTokenExtractor, DesignTokens } from './utils/designTokenExtractor';
import { NeoSearchEngine } from './utils/searchEngine';
import { NeoProjectManager } from './utils/projectManager';
import * as fs from 'fs-extra';
import * as path from 'path';
import { watch } from 'chokidar';

export interface NeoMcpServerConfig {
  componentKitPath?: string;
  iconKitPath?: string;
  cacheDir?: string;
  enableWatcher?: boolean;
}

export class NeoDesignSystemMcpServer {
  private server: Server;
  private componentExtractor: ComponentExtractor;
  private iconExtractor: IconExtractor;
  private tokenExtractor: DesignTokenExtractor;
  private searchEngine: NeoSearchEngine;
  private projectManager: NeoProjectManager;
  private config: NeoMcpServerConfig;
  private initialized = false;

  constructor(config: NeoMcpServerConfig = {}) {
    this.config = {
      componentKitPath: config.componentKitPath || this.findComponentKitPath(),
      iconKitPath: config.iconKitPath || this.findIconKitPath(),
      cacheDir: config.cacheDir || path.join(process.cwd(), '.neo-mcp-cache'),
      enableWatcher: config.enableWatcher ?? true,
    };

    this.server = new Server({
      name: 'neo-design-system-mcp-server',
      version: '1.0.0',
    }, {
      capabilities: {
        resources: {},
        tools: {},
      },
    });

    this.componentExtractor = new ComponentExtractor(this.config.componentKitPath!);
    this.iconExtractor = new IconExtractor(this.config.iconKitPath!);
    this.tokenExtractor = new DesignTokenExtractor(this.config.componentKitPath!);
    this.searchEngine = new NeoSearchEngine();
    this.projectManager = new NeoProjectManager(this.config.componentKitPath!);

    this.setupHandlers();
  }

  private findComponentKitPath(): string {
    const possiblePaths = [
      process.env.NEO_COMPONENT_KIT_PATH,
      './node_modules/@neotechnologygroup/neo-component-kit',
      '../Neo Design System/neo-component-kit-ai-enhanced',
      './neo-component-kit-ai-enhanced',
    ];

    for (const possiblePath of possiblePaths) {
      if (possiblePath && fs.existsSync(possiblePath)) {
        return path.resolve(possiblePath);
      }
    }

    throw new Error('Neo Component Kit path not found. Set NEO_COMPONENT_KIT_PATH environment variable.');
  }

  private findIconKitPath(): string {
    const possiblePaths = [
      process.env.NEO_ICON_KIT_PATH,
      './node_modules/@neotechnologygroup/neo-icon-kit',
      '../Neo Design System/neo-icon-kit',
      './neo-icon-kit',
    ];

    for (const possiblePath of possiblePaths) {
      if (possiblePath && fs.existsSync(possiblePath)) {
        return path.resolve(possiblePath);
      }
    }

    throw new Error('Neo Icon Kit path not found. Set NEO_ICON_KIT_PATH environment variable.');
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_components',
          description: 'Search Neo Design System components by query, category, or complexity',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search query for component functionality' },
              category: { type: 'string', description: 'Component category (form, action, layout, etc.)' },
              complexity: { type: 'string', enum: ['simple', 'medium', 'complex'] },
              limit: { type: 'number', default: 10 }
            },
            required: []
          }
        },
        {
          name: 'find_icons',
          description: 'Find Neo Design System icons by keywords, category, or style',
          inputSchema: {
            type: 'object',
            properties: {
              keywords: { type: 'string', description: 'Icon search keywords' },
              category: { type: 'string', description: 'Icon category (action, navigation, communication, etc.)' },
              limit: { type: 'number', default: 20 }
            },
            required: []
          }
        },
        {
          name: 'generate_component_code',
          description: 'Generate Vue component code using Neo Design System patterns',
          inputSchema: {
            type: 'object',
            properties: {
              component: { type: 'string', description: 'Component name (e.g., nck-button)' },
              props: { type: 'object', description: 'Component props to apply' },
              context: { type: 'string', description: 'Usage context for code generation' }
            },
            required: ['component']
          }
        },
        {
          name: 'get_design_tokens',
          description: 'Get Neo Design System design tokens for colors, spacing, typography',
          inputSchema: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['colors', 'spacing', 'typography', 'radius', 'shadows', 'all'] },
              usage: { type: 'string', description: 'Usage context for token recommendations' }
            },
            required: ['type']
          }
        },
        {
          name: 'setup_neo_project',
          description: 'Set up a new project with Neo Design System integration',
          inputSchema: {
            type: 'object',
            properties: {
              projectPath: { type: 'string', description: 'Path to the project directory' },
              projectType: { type: 'string', enum: ['vue3-new', 'vue3-existing', 'vite', 'nuxt'], default: 'vue3-new' },
              includeExamples: { type: 'boolean', default: true, description: 'Include example components' }
            },
            required: ['projectPath']
          }
        },
        {
          name: 'install_neo_packages',
          description: 'Install Neo Design System packages in a project',
          inputSchema: {
            type: 'object',
            properties: {
              projectPath: { type: 'string', description: 'Path to the project directory' },
              packages: {
                type: 'array',
                items: { type: 'string' },
                default: ['@neotechnologygroup/neo-component-kit', '@neotechnologygroup/neo-icon-kit']
              },
              packageManager: { type: 'string', enum: ['npm', 'yarn', 'pnpm'], default: 'npm' }
            },
            required: ['projectPath']
          }
        },
        {
          name: 'generate_page_with_neo',
          description: 'Generate a complete Vue page using real Neo components',
          inputSchema: {
            type: 'object',
            properties: {
              pageType: { type: 'string', description: 'Type of page to generate (home, dashboard, profile, form, etc.)' },
              components: {
                type: 'array',
                items: { type: 'string' },
                description: 'Specific Neo components to include'
              },
              layout: { type: 'string', enum: ['sidebar', 'header', 'minimal', 'full'], default: 'header' },
              responsive: { type: 'boolean', default: true },
              typescript: { type: 'boolean', default: true }
            },
            required: ['pageType']
          }
        },
        {
          name: 'analyze_neo_usage',
          description: 'Analyze Neo component usage in a project and suggest improvements',
          inputSchema: {
            type: 'object',
            properties: {
              projectPath: { type: 'string', description: 'Path to the project directory' },
              checkUpdates: { type: 'boolean', default: true },
              auditCompliance: { type: 'boolean', default: true }
            },
            required: ['projectPath']
          }
        },
        {
          name: 'migrate_neo_version',
          description: 'Migrate project to a new Neo Design System version',
          inputSchema: {
            type: 'object',
            properties: {
              projectPath: { type: 'string', description: 'Path to the project directory' },
              targetVersion: { type: 'string', description: 'Target Neo version to migrate to' },
              dryRun: { type: 'boolean', default: true, description: 'Perform dry run without making changes' }
            },
            required: ['projectPath', 'targetVersion']
          }
        }
      ]
    }));

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'neo://components',
          name: 'All Neo Components',
          description: 'Complete list of Neo Design System components with metadata'
        },
        {
          uri: 'neo://icons',
          name: 'All Neo Icons',
          description: 'Complete Neo icon library with categories and search capabilities'
        },
        {
          uri: 'neo://tokens',
          name: 'Design Tokens',
          description: 'Neo Design System design tokens (colors, typography, spacing)'
        },
        {
          uri: 'neo://ai-metadata',
          name: 'AI Metadata',
          description: 'AI-optimized metadata for components and usage patterns'
        }
      ]
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
      await this.ensureInitialized();

      switch (request.params.name) {
        case 'search_components':
          return await this.handleSearchComponents(request.params.arguments || {});

        case 'find_icons':
          return await this.handleFindIcons(request.params.arguments || {});

        case 'generate_component_code':
          return await this.handleGenerateCode(request.params.arguments || {});

        case 'get_design_tokens':
          return await this.handleGetTokens(request.params.arguments || {});

        case 'setup_neo_project':
          return await this.handleSetupProject(request.params.arguments || {});

        case 'install_neo_packages':
          return await this.handleInstallPackages(request.params.arguments || {});

        case 'generate_page_with_neo':
          return await this.handleGeneratePage(request.params.arguments || {});

        case 'analyze_neo_usage':
          return await this.handleAnalyzeUsage(request.params.arguments || {});

        case 'migrate_neo_version':
          return await this.handleMigrateVersion(request.params.arguments || {});

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Tool ${request.params.name} not found`
          );
      }
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request: any) => {
      await this.ensureInitialized();

      const uri = request.params.uri;

      if (uri.startsWith('neo://components')) {
        return await this.handleReadComponents(uri);
      } else if (uri.startsWith('neo://icons')) {
        return await this.handleReadIcons(uri);
      } else if (uri.startsWith('neo://tokens')) {
        return await this.handleReadTokens(uri);
      } else if (uri.startsWith('neo://ai-metadata')) {
        return await this.handleReadAiMetadata(uri);
      } else {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Resource ${uri} not found`
        );
      }
    });
  }

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize extractors and search engine
      await this.componentExtractor.initialize();
      await this.iconExtractor.initialize();
      await this.tokenExtractor.initialize();

      // Build search indexes
      const components = await this.componentExtractor.getComponents();
      const icons = await this.iconExtractor.getIcons();
      const tokens = await this.tokenExtractor.getTokens();

      await this.searchEngine.buildIndexes(components, icons, tokens);

      // Setup file watchers if enabled
      if (this.config.enableWatcher) {
        this.setupFileWatchers();
      }

      this.initialized = true;
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to initialize MCP server: ${error}`
      );
    }
  }

  private setupFileWatchers(): void {
    // Watch component files
    const componentWatcher = watch([
      path.join(this.config.componentKitPath!, 'src/components/**/*.vue'),
      path.join(this.config.componentKitPath!, 'src/components/**/*.ts'),
      path.join(this.config.componentKitPath!, 'ai-metadata.json')
    ]);

    componentWatcher.on('change', () => {
      this.componentExtractor.invalidateCache();
    });

    // Watch icon files
    const iconWatcher = watch([
      path.join(this.config.iconKitPath!, 'icons/**/*.svg'),
      path.join(this.config.iconKitPath!, 'icons-metadata.json')
    ]);

    iconWatcher.on('change', () => {
      this.iconExtractor.invalidateCache();
    });

    // Watch design token files
    const tokenWatcher = watch([
      path.join(this.config.componentKitPath!, 'src/styles/**/*.less')
    ]);

    tokenWatcher.on('change', () => {
      this.tokenExtractor.invalidateCache();
    });
  }

  // Tool handlers
  private async handleSearchComponents(args: any) {
    const results = await this.searchEngine.searchComponents(args);
    return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
  }

  private async handleFindIcons(args: any) {
    const results = await this.searchEngine.findIcons(args);
    return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
  }

  private async handleGenerateCode(args: any) {
    const code = await this.searchEngine.generateCode(args);
    return { content: [{ type: 'text', text: code }] };
  }

  private async handleGetTokens(args: any) {
    const tokens = await this.tokenExtractor.getTokens();
    const filteredTokens = args.type === 'all' ? tokens : tokens[args.type as keyof DesignTokens] || {};
    return { content: [{ type: 'text', text: JSON.stringify(filteredTokens, null, 2) }] };
  }

  // New distributed MCP handlers
  private async handleSetupProject(args: any) {
    const { projectPath, projectType = 'vue3-new', includeExamples = true } = args;

    try {
      // Ensure project directory exists
      await fs.ensureDir(projectPath);

      // Generate project configuration based on type
      const config = await this.projectManager.generateProjectConfig(projectType, includeExamples);

      // Write configuration files
      await this.projectManager.writeProjectFiles(projectPath, config);

      const result = {
        success: true,
        message: `Neo Design System project setup completed at ${projectPath}`,
        projectType,
        filesCreated: config.files.map(f => f.path),
        nextSteps: [
          'cd ' + projectPath,
          'npm install',
          'npm run dev'
        ]
      };

      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: `Failed to setup project: ${error}`
          }, null, 2)
        }]
      };
    }
  }

  private async handleInstallPackages(args: any) {
    const { projectPath, packages = ['@neotechnologygroup/neo-component-kit', '@neotechnologygroup/neo-icon-kit'], packageManager = 'npm' } = args;

    try {
      // Check if project exists and has package.json
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (!await fs.pathExists(packageJsonPath)) {
        throw new Error('package.json not found. Please run setup_neo_project first.');
      }

      // Install packages
      const installResult = await this.projectManager.installNeoPackages(projectPath, packages, packageManager);

      // Update project configuration for Neo
      await this.projectManager.updateProjectForNeo(projectPath);

      const result = {
        success: true,
        message: 'Neo Design System packages installed successfully',
        packagesInstalled: packages,
        packageManager,
        configurationUpdated: true,
        nextSteps: [
          'Import Neo components in your Vue files',
          'Use design tokens in your styles',
          'Check the generated examples for usage patterns'
        ]
      };

      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: `Failed to install packages: ${error}`
          }, null, 2)
        }]
      };
    }
  }

  private async handleGeneratePage(args: any) {
    const { pageType, components = [], layout = 'header', responsive = true, typescript = true } = args;

    try {
      // Generate real Vue component code using Neo components
      const pageCode = await this.projectManager.generateRealNeoPage(pageType, {
        components,
        layout,
        responsive,
        typescript
      });

      const result = {
        success: true,
        pageType,
        code: pageCode.template,
        files: pageCode.files,
        imports: pageCode.imports,
        dependencies: pageCode.dependencies,
        usage: pageCode.usage
      };

      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: `Failed to generate page: ${error}`
          }, null, 2)
        }]
      };
    }
  }

  private async handleAnalyzeUsage(args: any) {
    const { projectPath, checkUpdates = true, auditCompliance = true } = args;

    try {
      const analysis = await this.projectManager.analyzeNeoUsage(projectPath, { checkUpdates, auditCompliance });

      return { content: [{ type: 'text', text: JSON.stringify(analysis, null, 2) }] };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: `Failed to analyze project: ${error}`
          }, null, 2)
        }]
      };
    }
  }

  private async handleMigrateVersion(args: any) {
    const { projectPath, targetVersion, dryRun = true } = args;

    try {
      const migration = await this.projectManager.migrateNeoVersion(projectPath, targetVersion, dryRun);

      return { content: [{ type: 'text', text: JSON.stringify(migration, null, 2) }] };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: `Failed to migrate project: ${error}`
          }, null, 2)
        }]
      };
    }
  }

  // Resource handlers
  private async handleReadComponents(uri: string) {
    const components = await this.componentExtractor.getComponents();
    return { contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(components, null, 2) }] };
  }

  private async handleReadIcons(uri: string) {
    const icons = await this.iconExtractor.getIcons();
    return { contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(icons, null, 2) }] };
  }

  private async handleReadTokens(uri: string) {
    const tokens = await this.tokenExtractor.getTokens();
    return { contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(tokens, null, 2) }] };
  }

  private async handleReadAiMetadata(uri: string) {
    const aiMetadataPath = path.join(this.config.componentKitPath!, 'ai-metadata.json');
    const metadata = await fs.readJson(aiMetadataPath);
    return { contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(metadata, null, 2) }] };
  }

  async run(options: { transport?: any } = {}) {
    const transport = options.transport || new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Neo Design System MCP Server started successfully');
  }
}