#!/usr/bin/env node

/**
 * Neo Design System Workflow Watcher
 * Monitors file changes and suggests appropriate workflows
 */

const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

class WorkflowWatcher {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '../..');
    this.logFile = path.join(__dirname, 'workflow-suggestions.log');
    this.setupWatchers();
    this.lastSuggestion = {};
  }

  setupWatchers() {
    console.log('🔍 Neo Design System Workflow Watcher Starting...');
    console.log(`📁 Watching: ${this.projectRoot}`);

    // Watch Vue components
    chokidar.watch('internal-component-kit-master/src/components/*.vue', {
      cwd: this.projectRoot,
      ignoreInitial: true
    })
    .on('change', (path) => this.handleVueChange(path))
    .on('add', (path) => this.handleNewVue(path));

    // Watch TypeScript interfaces
    chokidar.watch('internal-component-kit-master/src/components/interfaces/*.ts', {
      cwd: this.projectRoot,
      ignoreInitial: true
    })
    .on('change', (path) => this.handleInterfaceChange(path));

    // Watch style files
    chokidar.watch('internal-component-kit-master/src/styles/*.less', {
      cwd: this.projectRoot,
      ignoreInitial: true
    })
    .on('change', (path) => this.handleStyleChange(path));

    // Watch constants
    chokidar.watch('internal-component-kit-master/src/constants/*.ts', {
      cwd: this.projectRoot,
      ignoreInitial: true
    })
    .on('change', (path) => this.handleConstantChange(path));

    // Watch build configs
    chokidar.watch([
      'internal-component-kit-master/vite.config.ts',
      'internal-component-kit-master/package.json',
      'internal-component-kit-master/tsconfig.json'
    ], {
      cwd: this.projectRoot,
      ignoreInitial: true
    })
    .on('change', (path) => this.handleConfigChange(path));

    console.log('✅ File watchers active');
    console.log('💡 Suggestions will appear here and be logged to:', this.logFile);
  }

  handleVueChange(filePath) {
    const componentName = path.basename(filePath, '.vue');
    console.log(`\n🔄 Vue component modified: ${componentName}`);

    // Check for TypeScript errors
    this.checkTypeScriptErrors(filePath)
      .then(hasErrors => {
        if (hasErrors) {
          this.suggestWorkflow('bug-fix-typescript', {
            file: filePath,
            component: componentName,
            reason: 'TypeScript compilation errors detected'
          });
        } else {
          this.suggestWorkflow('component-validation', {
            file: filePath,
            component: componentName,
            reason: 'Component updated - validation recommended'
          });
        }
      });

    // Check if component has corresponding interface
    this.checkInterfaceExists(componentName)
      .then(hasInterface => {
        if (!hasInterface) {
          this.suggestWorkflow('interface-creation', {
            component: componentName,
            reason: 'Component missing TypeScript interface'
          });
        }
      });
  }

  handleNewVue(filePath) {
    const componentName = path.basename(filePath, '.vue');
    console.log(`\n📁 New Vue component detected: ${componentName}`);

    this.suggestWorkflow('component-development', {
      file: filePath,
      component: componentName,
      reason: 'New component requires full development workflow'
    });
  }

  handleInterfaceChange(filePath) {
    const interfaceName = path.basename(filePath, '.ts');
    console.log(`\n📝 Interface modified: ${interfaceName}`);

    this.suggestWorkflow('interface-validation', {
      file: filePath,
      interface: interfaceName,
      reason: 'Interface updated - component sync validation needed'
    });
  }

  handleStyleChange(filePath) {
    const styleFile = path.basename(filePath);
    console.log(`\n🎨 Style file modified: ${styleFile}`);

    this.suggestWorkflow('design-system-validation', {
      file: filePath,
      styleFile: styleFile,
      reason: 'Design tokens updated - system-wide validation recommended'
    });
  }

  handleConstantChange(filePath) {
    const constantFile = path.basename(filePath);
    console.log(`\n⚙️  Constants modified: ${constantFile}`);

    this.suggestWorkflow('constant-validation', {
      file: filePath,
      constantFile: constantFile,
      reason: 'Constants updated - component integration check needed'
    });
  }

  handleConfigChange(filePath) {
    const configFile = path.basename(filePath);
    console.log(`\n🔧 Configuration modified: ${configFile}`);

    this.suggestWorkflow('build-validation', {
      file: filePath,
      configFile: configFile,
      reason: 'Build configuration changed - system validation required'
    });
  }

  async checkTypeScriptErrors(filePath) {
    return new Promise((resolve) => {
      exec('npm run typecheck', {
        cwd: path.join(this.projectRoot, 'internal-component-kit-master')
      }, (error, stdout, stderr) => {
        const hasErrors = error !== null;
        resolve(hasErrors);
      });
    });
  }

  async checkInterfaceExists(componentName) {
    const interfacePath = path.join(
      this.projectRoot,
      'internal-component-kit-master/src/components/interfaces',
      `i${componentName}.ts`
    );

    return fs.existsSync(interfacePath);
  }

  suggestWorkflow(workflowType, context) {
    // Prevent spam - only suggest once per minute for same file
    const suggestionKey = `${workflowType}-${context.file}`;
    const now = Date.now();
    if (this.lastSuggestion[suggestionKey] && (now - this.lastSuggestion[suggestionKey]) < 60000) {
      return;
    }
    this.lastSuggestion[suggestionKey] = now;

    const suggestion = this.generateWorkflowSuggestion(workflowType, context);

    console.log('\n' + '='.repeat(80));
    console.log('🤖 WORKFLOW SUGGESTION');
    console.log('='.repeat(80));
    console.log(`📋 Type: ${workflowType}`);
    console.log(`📄 File: ${context.file || 'N/A'}`);
    console.log(`💡 Reason: ${context.reason}`);
    console.log('');
    console.log('🚀 Claude Code Command:');
    console.log(`   claude code "${suggestion}"`);
    console.log('');
    console.log('📝 Alternative (copy/paste to Claude):');
    console.log(`   ${suggestion}`);
    console.log('='.repeat(80));

    // Log to file
    this.logSuggestion(workflowType, context, suggestion);
  }

  generateWorkflowSuggestion(workflowType, context) {
    const suggestions = {
      'component-development': `Act as a Vue 3 Design System Engineer. Create comprehensive ${context.component} component for Neo Design System. File: ${context.file}. Include TypeScript interfaces, design tokens, accessibility features, and follow existing component patterns in src/components/.`,

      'bug-fix-typescript': `Act as a TypeScript debugging expert. Fix compilation errors in ${context.component} component at ${context.file}. Focus on type safety, Vue 3 Composition API compatibility, and interface definitions.`,

      'component-validation': `Act as a component quality specialist. Validate ${context.component} component changes in ${context.file}. Check TypeScript interfaces, design system compliance, accessibility standards, and integration with other Neo components.`,

      'interface-creation': `Act as a TypeScript interface architect. Create missing interface i${context.component}.ts for ${context.component} component. Define proper type definitions, component props, events, and slots following Neo Design System patterns.`,

      'interface-validation': `Act as a TypeScript integration specialist. Validate ${context.interface} interface changes in ${context.file}. Ensure component implementation matches updated interface definitions and maintain type safety.`,

      'design-system-validation': `Act as a design system governance expert. Validate design token changes in ${context.styleFile}. Check consistency across all components, update documentation, and ensure brand compliance.`,

      'constant-validation': `Act as a system integration specialist. Validate constant changes in ${context.constantFile}. Check component integration, update dependent components, and ensure proper constant usage patterns.`,

      'build-validation': `Act as a build system engineer. Validate configuration changes in ${context.configFile}. Check build system health, run tests, ensure no breaking changes, and optimize build performance.`
    };

    return suggestions[workflowType] || `Act as a ${workflowType} specialist and address changes in ${context.file}`;
  }

  logSuggestion(workflowType, context, suggestion) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      workflowType,
      context,
      suggestion
    };

    const logLine = `${timestamp} | ${workflowType} | ${context.file || 'N/A'} | ${suggestion}\n`;

    fs.appendFileSync(this.logFile, logLine);
  }

  // Health monitoring
  startHealthMonitoring() {
    console.log('🏥 Starting health monitoring...');

    // Check system health every 5 minutes
    setInterval(() => {
      this.performHealthCheck();
    }, 300000);

    // Initial health check
    setTimeout(() => {
      this.performHealthCheck();
    }, 10000);
  }

  performHealthCheck() {
    console.log('\n🔍 Performing system health check...');

    // TypeScript compilation check
    exec('npm run typecheck', {
      cwd: path.join(this.projectRoot, 'internal-component-kit-master')
    }, (error, stdout, stderr) => {
      if (error) {
        console.log('⚠️  Health Check Alert: TypeScript compilation issues detected');
        this.suggestWorkflow('health-typescript-fix', {
          reason: 'Periodic health check found TypeScript errors',
          errorOutput: stderr
        });
      } else {
        console.log('✅ TypeScript compilation: OK');
      }
    });

    // Check for common issues
    this.checkForCommonIssues();
  }

  checkForCommonIssues() {
    // Check for missing interfaces
    const componentsDir = path.join(this.projectRoot, 'internal-component-kit-master/src/components');
    const interfacesDir = path.join(this.projectRoot, 'internal-component-kit-master/src/components/interfaces');

    if (fs.existsSync(componentsDir) && fs.existsSync(interfacesDir)) {
      const vueFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.vue'));
      const interfaceFiles = fs.readdirSync(interfacesDir).filter(f => f.endsWith('.ts'));

      const missingInterfaces = vueFiles.filter(vueFile => {
        const componentName = path.basename(vueFile, '.vue');
        const expectedInterface = `i${componentName}.ts`;
        return !interfaceFiles.includes(expectedInterface);
      });

      if (missingInterfaces.length > 0) {
        console.log(`⚠️  Health Check Alert: ${missingInterfaces.length} components missing interfaces`);
        this.suggestWorkflow('missing-interfaces-audit', {
          reason: `${missingInterfaces.length} components found without TypeScript interfaces`,
          missingInterfaces: missingInterfaces
        });
      }
    }
  }
}

// Start the watcher
const watcher = new WorkflowWatcher();

// Start health monitoring
watcher.startHealthMonitoring();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Workflow watcher shutting down...');
  process.exit(0);
});

console.log('\n💡 Workflow Watcher is now running!');
console.log('   - Modify any Vue component to see workflow suggestions');
console.log('   - Press Ctrl+C to stop');
console.log('   - Suggestions are logged to: .claude/scripts/workflow-suggestions.log');