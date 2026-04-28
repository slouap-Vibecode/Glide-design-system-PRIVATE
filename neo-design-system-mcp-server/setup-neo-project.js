#!/usr/bin/env node

/**
 * Neo Design System Project Setup Script
 *
 * This script helps set up new projects or integrate Neo Design System
 * into existing projects with proper MCP server configuration.
 */

const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    showHelp();
    return;
  }

  switch (command) {
    case 'init':
      await initProject(args.slice(1));
      break;
    case 'install':
      await installNeo(args.slice(1));
      break;
    case 'config':
      await setupMcpConfig(args.slice(1));
      break;
    case 'example':
      await createExample(args.slice(1));
      break;
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
  }
}

function showHelp() {
  console.log(`
🎨 Neo Design System Setup Tool

Usage:
  npx @neotechnologygroup/neo-design-system-mcp-server <command> [options]

Commands:
  init [project-name]     Initialize a new Vue 3 project with Neo Design System
  install                 Add Neo Design System to existing project
  config                  Set up Claude Code MCP configuration
  example <type>          Generate example components (home, dashboard, form)

Examples:
  npx @neotechnologygroup/neo-design-system-mcp-server init my-app
  npx @neotechnologygroup/neo-design-system-mcp-server install
  npx @neotechnologygroup/neo-design-system-mcp-server config
  npx @neotechnologygroup/neo-design-system-mcp-server example home

Options:
  --typescript           Use TypeScript (default: true)
  --package-manager      npm, yarn, or pnpm (default: npm)
  --layout              Layout type: header, sidebar, minimal (default: header)
  --help                Show this help message
`);
}

async function initProject(args) {
  const projectName = args[0] || 'neo-project';
  const options = parseOptions(args.slice(1));

  console.log(`🚀 Initializing Neo Design System project: ${projectName}`);

  try {
    // Create project directory
    await fs.ensureDir(projectName);
    process.chdir(projectName);

    // Generate project files using MCP server
    const projectPath = process.cwd();
    console.log('📁 Generating project structure...');

    // This would call the MCP server setup_neo_project tool
    await generateProjectStructure(projectPath, 'vue3-new', options);

    // Install dependencies
    console.log('📦 Installing dependencies...');
    await runCommand(options.packageManager || 'npm', ['install']);

    console.log(`✅ Project ${projectName} created successfully!`);
    console.log(`
Next steps:
  cd ${projectName}
  ${options.packageManager || 'npm'} run dev

The project includes:
  🧩 Neo Component Kit with 40+ Vue components
  🎨 833+ Neo icons
  🎯 Design tokens and styling
  📝 Example components and documentation
`);

  } catch (error) {
    console.error('❌ Error creating project:', error.message);
  }
}

async function installNeo(args) {
  const options = parseOptions(args);
  const projectPath = process.cwd();

  console.log('📦 Installing Neo Design System...');

  try {
    // Check if this is a Vue project
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
      throw new Error('No package.json found. Please run this command in a Node.js project.');
    }

    const packageJson = await fs.readJson(packageJsonPath);

    // Install Neo packages
    const packages = [
      '@neotechnologygroup/neo-component-kit',
      '@neotechnologygroup/neo-icon-kit'
    ];

    console.log('Installing Neo packages...');
    await runCommand(options.packageManager || 'npm', ['install', ...packages]);

    // Update project configuration
    console.log('⚙️ Configuring project for Neo...');
    await updateProjectForNeo(projectPath, packageJson);

    // Generate example files
    if (options.includeExamples !== false) {
      console.log('📝 Creating example components...');
      await generateExamples(projectPath);
    }

    console.log('✅ Neo Design System installed successfully!');
    console.log(`
Next steps:
  1. Import Neo components in your Vue files
  2. Use design tokens in your styles
  3. Check the generated examples for usage patterns

Example import:
  import { nckButton, nckCard } from '@neotechnologygroup/neo-component-kit'
`);

  } catch (error) {
    console.error('❌ Error installing Neo:', error.message);
  }
}

async function setupMcpConfig(args) {
  const options = parseOptions(args);

  console.log('⚙️ Setting up Claude Code MCP configuration...');

  try {
    const claudeDir = '.claude';
    const configPath = path.join(claudeDir, 'config.json');

    // Ensure .claude directory exists
    await fs.ensureDir(claudeDir);

    // Read existing config or create new
    let config = {};
    if (await fs.pathExists(configPath)) {
      config = await fs.readJson(configPath);
    }

    // Add Neo MCP server configuration
    if (!config.mcpServers) {
      config.mcpServers = {};
    }

    config.mcpServers['neo-design-system'] = {
      command: 'node',
      args: ['./node_modules/@neotechnologygroup/neo-design-system-mcp-server/build/index.js'],
      env: {
        NEO_COMPONENT_KIT_PATH: './node_modules/@neotechnologygroup/neo-component-kit',
        NEO_ICON_KIT_PATH: './node_modules/@neotechnologygroup/neo-icon-kit',
        NEO_MCP_CACHE_DIR: './.neo-mcp-cache',
        NEO_MCP_ENABLE_WATCHER: 'true'
      }
    };

    // Write updated config
    await fs.writeJson(configPath, config, { spaces: 2 });

    console.log('✅ Claude Code MCP configuration updated!');
    console.log(`
Configuration file: ${configPath}

To use Neo Design System with Claude Code:
  1. Restart Claude Code to load the new configuration
  2. Ask Claude Code to "create a home page using Neo components"
  3. Use natural language to search components and icons

Example queries:
  - "Find button components in Neo"
  - "Create a dashboard with Neo cards"
  - "What icons are available for navigation?"
`);

  } catch (error) {
    console.error('❌ Error setting up MCP config:', error.message);
  }
}

async function createExample(args) {
  const exampleType = args[0] || 'home';
  const options = parseOptions(args.slice(1));

  console.log(`📝 Creating ${exampleType} example component...`);

  try {
    const projectPath = process.cwd();

    // This would call the MCP server generate_page_with_neo tool
    const pageCode = await generateExamplePage(exampleType, options);

    // Write the example file
    const exampleDir = path.join('src', 'examples');
    await fs.ensureDir(exampleDir);

    const fileName = `${capitalize(exampleType)}Example.vue`;
    const filePath = path.join(exampleDir, fileName);

    await fs.writeFile(filePath, pageCode);

    console.log(`✅ Example created: ${filePath}`);
    console.log(`
To use this example:
  1. Import it in your router or parent component
  2. Customize the components and styling
  3. Update the data and event handlers

Example import:
  import ${capitalize(exampleType)}Example from './examples/${fileName}'
`);

  } catch (error) {
    console.error('❌ Error creating example:', error.message);
  }
}

function parseOptions(args) {
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.substring(2);
      const value = args[i + 1];

      if (value && !value.startsWith('--')) {
        options[key] = value;
        i++; // Skip next arg as it's the value
      } else {
        options[key] = true;
      }
    }
  }

  return options;
}

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {
      stdio: 'inherit',
      ...options
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    process.on('error', (error) => {
      reject(error);
    });
  });
}

async function generateProjectStructure(projectPath, projectType, options) {
  // This is a placeholder - in a real implementation, this would
  // use the MCP server's setup_neo_project tool
  console.log('Generating project structure...');
}

async function updateProjectForNeo(projectPath, packageJson) {
  // Update Vite config if it exists
  const viteConfigPath = path.join(projectPath, 'vite.config.ts');
  const viteConfigJsPath = path.join(projectPath, 'vite.config.js');

  let configPath = null;
  if (await fs.pathExists(viteConfigPath)) {
    configPath = viteConfigPath;
  } else if (await fs.pathExists(viteConfigJsPath)) {
    configPath = viteConfigJsPath;
  }

  if (configPath) {
    let config = await fs.readFile(configPath, 'utf-8');

    // Add CSS preprocessor options for Less
    if (!config.includes('preprocessorOptions')) {
      const lessConfig = `
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
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
}

async function generateExamples(projectPath) {
  // Generate basic example files
  const examplesDir = path.join(projectPath, 'src', 'examples');
  await fs.ensureDir(examplesDir);

  // Create a simple example component
  const exampleContent = `<template>
  <nck-card class="neo-example">
    <template #header>
      <h2>Neo Design System Example</h2>
    </template>

    <template #content>
      <p>This is an example of using Neo components!</p>

      <div class="actions">
        <nck-button
          :label="'Primary Action'"
          :buttonType="ButtonType.PRIMARY"
          @click="handleClick"
        />
        <nck-button
          :label="'Secondary Action'"
          :buttonType="ButtonType.SECONDARY"
          @click="handleClick"
        />
      </div>
    </template>
  </nck-card>
</template>

<script setup lang="ts">
import { nckCard, nckButton } from '@neotechnologygroup/neo-component-kit'
import { ButtonType } from '@neotechnologygroup/neo-component-kit/constants/buttonType'

const handleClick = () => {
  console.log('Neo button clicked!')
}
</script>

<style lang="less" scoped>
@import '@neotechnologygroup/neo-component-kit/src/styles/colorsVariables.less';

.neo-example {
  max-width: 500px;
  margin: 2rem auto;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>`;

  await fs.writeFile(
    path.join(examplesDir, 'NeoExample.vue'),
    exampleContent
  );
}

async function generateExamplePage(type, options) {
  // This is a placeholder - in a real implementation, this would
  // use the MCP server's generate_page_with_neo tool
  return `<!-- ${capitalize(type)} example page would be generated here -->`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Run the script
main().catch(console.error);