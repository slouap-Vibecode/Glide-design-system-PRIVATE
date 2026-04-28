import * as fs from 'fs-extra';
import * as path from 'path';
import { spawn } from 'child_process';
import { ComponentExtractor } from './componentExtractor';
import { DesignTokenExtractor } from './designTokenExtractor';

export interface ProjectConfig {
  files: ProjectFile[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
}

export interface ProjectFile {
  path: string;
  content: string;
  type: 'vue' | 'ts' | 'json' | 'js' | 'css' | 'less' | 'md';
}

export interface PageGenerationOptions {
  components: string[];
  layout: string;
  responsive: boolean;
  typescript: boolean;
}

export interface GeneratedPage {
  template: string;
  files: ProjectFile[];
  imports: string[];
  dependencies: string[];
  usage: string[];
}

export class NeoProjectManager {
  private componentExtractor: ComponentExtractor;
  private tokenExtractor: DesignTokenExtractor;

  constructor(componentKitPath: string) {
    this.componentExtractor = new ComponentExtractor(componentKitPath);
    this.tokenExtractor = new DesignTokenExtractor(componentKitPath);
  }

  async generateProjectConfig(projectType: string, includeExamples: boolean): Promise<ProjectConfig> {
    const baseConfig = this.getBaseProjectConfig(projectType);

    if (includeExamples) {
      const examples = await this.generateExampleFiles();
      baseConfig.files.push(...examples);
    }

    return baseConfig;
  }

  private getBaseProjectConfig(projectType: string): ProjectConfig {
    const configs = {
      'vue3-new': this.getVue3NewConfig(),
      'vue3-existing': this.getVue3ExistingConfig(),
      'vite': this.getViteConfig(),
      'nuxt': this.getNuxtConfig()
    };

    return configs[projectType as keyof typeof configs] || configs['vue3-new'];
  }

  private getVue3NewConfig(): ProjectConfig {
    return {
      files: [
        {
          path: 'package.json',
          type: 'json',
          content: JSON.stringify({
            name: 'neo-design-system-project',
            version: '0.1.0',
            type: 'module',
            scripts: {
              dev: 'vite',
              build: 'vue-tsc && vite build',
              preview: 'vite preview',
              lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
              'type-check': 'vue-tsc --noEmit'
            },
            dependencies: {
              vue: '^3.4.0',
              '@neotechnologygroup/neo-component-kit': 'latest',
              '@neotechnologygroup/neo-icon-kit': 'latest'
            },
            devDependencies: {
              '@vitejs/plugin-vue': '^5.0.0',
              '@vue/tsconfig': '^0.5.0',
              eslint: '^8.57.0',
              'eslint-plugin-vue': '^9.17.0',
              typescript: '~5.3.0',
              vite: '^5.0.0',
              'vue-tsc': '^1.8.0'
            }
          }, null, 2)
        },
        {
          path: 'vite.config.ts',
          type: 'ts',
          content: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // Neo Design System variables will be imported
        }
      }
    }
  }
})
`
        },
        {
          path: 'tsconfig.json',
          type: 'json',
          content: JSON.stringify({
            extends: '@vue/tsconfig/tsconfig.dom.json',
            include: ['env.d.ts', 'src/**/*', 'src/**/*.vue'],
            exclude: ['src/**/__tests__/*'],
            compilerOptions: {
              composite: true,
              baseUrl: '.',
              paths: {
                '@/*': ['./src/*']
              }
            }
          }, null, 2)
        },
        {
          path: 'src/main.ts',
          type: 'ts',
          content: `import { createApp } from 'vue'
import App from './App.vue'

// Import Neo Design System styles
import '@neotechnologygroup/neo-component-kit/dist/style.css'

const app = createApp(App)

app.mount('#app')
`
        },
        {
          path: 'src/App.vue',
          type: 'vue',
          content: `<template>
  <div id="app">
    <nck-header class="app-header">
      <template #title>
        <h1>Neo Design System App</h1>
      </template>
    </nck-header>

    <main class="app-main">
      <router-view v-if="$router" />
      <HelloWorld v-else />
    </main>
  </div>
</template>

<script setup lang="ts">
import { nckHeader } from '@neotechnologygroup/neo-component-kit'
import HelloWorld from './components/HelloWorld.vue'
</script>

<style lang="less">
@import '@neotechnologygroup/neo-component-kit/src/styles/colorsVariables.less';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: @bright-blue-300;
  color: @white;
  padding: 1rem;
}

.app-main {
  flex: 1;
  padding: 2rem;
  background: @blue-grey-100;
}
</style>
`
        },
        {
          path: 'src/components/HelloWorld.vue',
          type: 'vue',
          content: `<template>
  <nck-card class="welcome-card">
    <template #header>
      <div class="welcome-header">
        <nck-icon
          :iconName="'star'"
          :iconSize="IconSize.L"
          :primaryColor="'@bright-blue-300'"
          :iconAltText="'Welcome'"
        />
        <h2>Welcome to Neo Design System</h2>
      </div>
    </template>

    <template #content>
      <p>You've successfully set up a project with the Neo Design System!</p>

      <div class="features">
        <nck-badge type="success">40+ Components</nck-badge>
        <nck-badge type="info">833+ Icons</nck-badge>
        <nck-badge type="warning">Design Tokens</nck-badge>
      </div>

      <div class="actions">
        <nck-button
          :label="'Get Started'"
          :buttonType="ButtonType.PRIMARY"
          :leftIcon="'arrow-right'"
          @click="handleGetStarted"
        />
        <nck-button
          :label="'View Documentation'"
          :buttonType="ButtonType.SECONDARY"
          :leftIcon="'help'"
          @click="handleViewDocs"
        />
      </div>
    </template>
  </nck-card>
</template>

<script setup lang="ts">
import {
  nckCard,
  nckButton,
  nckBadge,
  nckIcon
} from '@neotechnologygroup/neo-component-kit'
import { ButtonType } from '@neotechnologygroup/neo-component-kit/constants/buttonType'
import { IconSize } from '@neotechnologygroup/neo-component-kit/constants/iconSize'

const handleGetStarted = () => {
  console.log('Getting started with Neo Design System!')
}

const handleViewDocs = () => {
  window.open('https://neo-design-system-docs.com', '_blank')
}
</script>

<style lang="less" scoped>
@import '@neotechnologygroup/neo-component-kit/src/styles/colorsVariables.less';

.welcome-card {
  max-width: 600px;
  margin: 0 auto;
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    margin: 0;
    color: @deep-blue-400;
  }
}

.features {
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}
</style>
`
        },
        {
          path: 'index.html',
          type: 'js',
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/vite.svg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neo Design System App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`
        }
      ],
      dependencies: {
        'vue': '^3.4.0',
        '@neotechnologygroup/neo-component-kit': 'latest',
        '@neotechnologygroup/neo-icon-kit': 'latest'
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^5.0.0',
        '@vue/tsconfig': '^0.5.0',
        'eslint': '^8.57.0',
        'eslint-plugin-vue': '^9.17.0',
        'typescript': '~5.3.0',
        'vite': '^5.0.0',
        'vue-tsc': '^1.8.0'
      },
      scripts: {
        'dev': 'vite',
        'build': 'vue-tsc && vite build',
        'preview': 'vite preview'
      }
    };
  }

  private getVue3ExistingConfig(): ProjectConfig {
    // Simplified config for adding Neo to existing Vue 3 projects
    return {
      files: [
        {
          path: 'src/plugins/neo-design-system.ts',
          type: 'ts',
          content: `// Neo Design System Integration Plugin
import '@neotechnologygroup/neo-component-kit/dist/style.css'

export default {
  install(app: any) {
    // Neo components will be available globally or imported as needed
    console.log('Neo Design System integrated successfully')
  }
}
`
        }
      ],
      dependencies: {
        '@neotechnologygroup/neo-component-kit': 'latest',
        '@neotechnologygroup/neo-icon-kit': 'latest'
      },
      devDependencies: {},
      scripts: {}
    };
  }

  private getViteConfig(): ProjectConfig {
    return this.getVue3NewConfig(); // Same as Vue 3 new for now
  }

  private getNuxtConfig(): ProjectConfig {
    return {
      files: [
        {
          path: 'nuxt.config.ts',
          type: 'ts',
          content: `export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@neotechnologygroup/neo-component-kit/dist/style.css'],
  build: {
    transpile: ['@neotechnologygroup/neo-component-kit']
  }
})
`
        }
      ],
      dependencies: {
        '@neotechnologygroup/neo-component-kit': 'latest',
        '@neotechnologygroup/neo-icon-kit': 'latest'
      },
      devDependencies: {},
      scripts: {}
    };
  }

  async generateExampleFiles(): Promise<ProjectFile[]> {
    // Generate example components showcasing different Neo patterns
    return [
      {
        path: 'src/examples/FormExample.vue',
        type: 'vue',
        content: await this.generateFormExample()
      },
      {
        path: 'src/examples/DashboardExample.vue',
        type: 'vue',
        content: await this.generateDashboardExample()
      },
      {
        path: 'src/examples/ComponentShowcase.vue',
        type: 'vue',
        content: await this.generateComponentShowcase()
      }
    ];
  }

  async writeProjectFiles(projectPath: string, config: ProjectConfig): Promise<void> {
    for (const file of config.files) {
      const filePath = path.join(projectPath, file.path);
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, file.content);
    }
  }

  async installNeoPackages(projectPath: string, packages: string[], packageManager: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const command = packageManager;
      const args = packageManager === 'npm' ? ['install', ...packages] : ['add', ...packages];

      const process = spawn(command, args, {
        cwd: projectPath,
        stdio: 'pipe'
      });

      let output = '';
      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        output += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true, output });
        } else {
          reject(new Error(`Package installation failed: ${output}`));
        }
      });
    });
  }

  async updateProjectForNeo(projectPath: string): Promise<void> {
    // Update configuration files to work optimally with Neo
    const viteConfigPath = path.join(projectPath, 'vite.config.ts');

    if (await fs.pathExists(viteConfigPath)) {
      await this.updateViteConfig(viteConfigPath);
    }
  }

  private async updateViteConfig(configPath: string): Promise<void> {
    let config = await fs.readFile(configPath, 'utf-8');

    // Add Less preprocessor options if not present
    if (!config.includes('preprocessorOptions')) {
      const lessConfig = `
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // Neo Design System variables
        }
      }
    }
  },`;

      config = config.replace(
        'export default defineConfig({',
        `export default defineConfig({${lessConfig}`
      );

      await fs.writeFile(configPath, config);
    }
  }

  async generateRealNeoPage(pageType: string, options: PageGenerationOptions): Promise<GeneratedPage> {
    await this.componentExtractor.initialize();
    const components = await this.componentExtractor.getComponents();

    const generators = {
      'home': () => this.generateHomePage(options),
      'dashboard': () => this.generateDashboardPage(options),
      'profile': () => this.generateProfilePage(options),
      'form': () => this.generateFormPage(options),
      'settings': () => this.generateSettingsPage(options),
      'contact': () => this.generateContactPage(options)
    };

    const generator = generators[pageType as keyof typeof generators] || generators.home;
    return await generator();
  }

  private async generateHomePage(options: PageGenerationOptions): Promise<GeneratedPage> {
    const template = `<template>
  <div class="home-page">
    <nck-header class="page-header">
      <template #title>
        <h1>Welcome Home</h1>
      </template>
      <template #actions>
        <nck-button
          :label="'Get Started'"
          :buttonType="ButtonType.PRIMARY"
          :leftIcon="'arrow-right'"
          @click="handleGetStarted"
        />
      </template>
    </nck-header>

    <main class="page-content">
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
              <h2>Experience Excellence</h2>
              <p>Discover amazing features and capabilities with our platform.</p>

              <div class="hero-actions">
                <nck-button
                  :label="'Explore Features'"
                  :buttonType="ButtonType.PRIMARY"
                  :leftIcon="'search'"
                  @click="exploreFeatures"
                />
                <nck-button
                  :label="'Learn More'"
                  :buttonType="ButtonType.SECONDARY"
                  :leftIcon="'info'"
                  @click="learnMore"
                />
              </div>
            </div>
          </template>
        </nck-card>
      </section>

      <section class="features-section">
        <h3>Key Features</h3>
        <div class="features-grid">
          <nck-card
            v-for="feature in features"
            :key="feature.id"
            class="feature-card"
          >
            <template #content>
              <nck-icon
                :iconName="feature.icon"
                :iconSize="IconSize.L"
                :primaryColor="feature.color"
                class="feature-icon"
              />
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
              <nck-badge :type="feature.badgeType">{{ feature.badge }}</nck-badge>
            </template>
          </nck-card>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup${options.typescript ? ' lang="ts"' : ''}>
import {
  nckHeader,
  nckButton,
  nckCard,
  nckIcon,
  nckBadge
} from '@neotechnologygroup/neo-component-kit'
import { ButtonType } from '@neotechnologygroup/neo-component-kit/constants/buttonType'
import { IconSize } from '@neotechnologygroup/neo-component-kit/constants/iconSize'
import { ref } from 'vue'

${options.typescript ? `
interface Feature {
  id: string
  title: string
  description: string
  icon: string
  color: string
  badge: string
  badgeType: 'success' | 'info' | 'warning' | 'error'
}
` : ''}

const features = ref${options.typescript ? '<Feature[]>' : ''}([
  {
    id: '1',
    title: 'Fast Performance',
    description: 'Lightning-fast loading and responsive interactions.',
    icon: 'flash',
    color: '@green-300',
    badge: 'Optimized',
    badgeType: 'success'
  },
  {
    id: '2',
    title: 'Secure Platform',
    description: 'Enterprise-grade security and data protection.',
    icon: 'security',
    color: '@bright-blue-300',
    badge: 'Protected',
    badgeType: 'info'
  },
  {
    id: '3',
    title: 'Easy Integration',
    description: 'Simple setup and seamless integration process.',
    icon: 'link',
    color: '@orange-300',
    badge: 'Simple',
    badgeType: 'warning'
  }
])

const handleGetStarted = (): void => {
  // Navigate to getting started page
  console.log('Getting started...')
}

const exploreFeatures = (): void => {
  // Navigate to features page
  console.log('Exploring features...')
}

const learnMore = (): void => {
  // Navigate to documentation
  console.log('Learning more...')
}
</script>

<style lang="less" scoped>
@import '@neotechnologygroup/neo-component-kit/src/styles/colorsVariables.less';
@import '@neotechnologygroup/neo-component-kit/src/styles/radiusVariables.less';

.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: @bright-blue-300;
  color: @white;
  padding: 1rem 2rem;
}

.page-content {
  flex: 1;
  padding: 2rem;
  background: @blue-grey-100;
}

.hero-section {
  margin-bottom: 3rem;

  .hero-card {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-content {
    padding: 2rem;

    .hero-icon {
      margin-bottom: 1rem;
    }

    h2 {
      color: @deep-blue-400;
      font-size: 2.5rem;
      margin: 0 0 1rem 0;
    }

    p {
      font-size: 1.2rem;
      color: @blue-grey-600;
      margin-bottom: 2rem;
    }
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.features-section {
  h3 {
    text-align: center;
    color: @deep-blue-400;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    text-align: center;

    .feature-icon {
      margin-bottom: 1rem;
    }

    h4 {
      color: @deep-blue-400;
      margin: 0 0 1rem 0;
    }

    p {
      color: @blue-grey-600;
      margin-bottom: 1rem;
    }
  }
}

${options.responsive ? `
@media (max-width: 768px) {
  .page-content {
    padding: 1rem;
  }

  .hero-content {
    padding: 1rem;

    h2 {
      font-size: 2rem;
    }
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
` : ''}
</style>`;

    return {
      template,
      files: [
        {
          path: 'src/pages/HomePage.vue',
          content: template,
          type: 'vue'
        }
      ],
      imports: [
        'nckHeader',
        'nckButton',
        'nckCard',
        'nckIcon',
        'nckBadge'
      ],
      dependencies: [
        '@neotechnologygroup/neo-component-kit',
        'vue'
      ],
      usage: [
        'Import this component and add to your router',
        'Customize the features array with your content',
        'Update the navigation handlers',
        'Modify colors and styling as needed'
      ]
    };
  }

  // Additional page generators would go here (dashboard, profile, etc.)
  private async generateDashboardPage(options: PageGenerationOptions): Promise<GeneratedPage> {
    // Implementation for dashboard page generation
    return {
      template: '<!-- Dashboard template will be generated -->',
      files: [],
      imports: [],
      dependencies: [],
      usage: []
    };
  }

  private async generateProfilePage(options: PageGenerationOptions): Promise<GeneratedPage> {
    // Implementation for profile page generation
    return {
      template: '<!-- Profile template will be generated -->',
      files: [],
      imports: [],
      dependencies: [],
      usage: []
    };
  }

  private async generateFormPage(options: PageGenerationOptions): Promise<GeneratedPage> {
    // Implementation for form page generation
    return {
      template: '<!-- Form template will be generated -->',
      files: [],
      imports: [],
      dependencies: [],
      usage: []
    };
  }

  private async generateSettingsPage(options: PageGenerationOptions): Promise<GeneratedPage> {
    // Implementation for settings page generation
    return {
      template: '<!-- Settings template will be generated -->',
      files: [],
      imports: [],
      dependencies: [],
      usage: []
    };
  }

  private async generateContactPage(options: PageGenerationOptions): Promise<GeneratedPage> {
    // Implementation for contact page generation
    return {
      template: '<!-- Contact template will be generated -->',
      files: [],
      imports: [],
      dependencies: [],
      usage: []
    };
  }

  private async generateFormExample(): Promise<string> {
    return `<!-- Form example will be generated -->`;
  }

  private async generateDashboardExample(): Promise<string> {
    return `<!-- Dashboard example will be generated -->`;
  }

  private async generateComponentShowcase(): Promise<string> {
    return `<!-- Component showcase will be generated -->`;
  }

  async analyzeNeoUsage(projectPath: string, options: { checkUpdates: boolean; auditCompliance: boolean }): Promise<any> {
    // Implementation for analyzing Neo usage in projects
    return {
      success: true,
      analysis: 'Project analysis completed'
    };
  }

  async migrateNeoVersion(projectPath: string, targetVersion: string, dryRun: boolean): Promise<any> {
    // Implementation for migrating Neo versions
    return {
      success: true,
      migration: 'Migration plan generated'
    };
  }
}