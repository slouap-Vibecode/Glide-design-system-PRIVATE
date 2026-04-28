#!/usr/bin/env node

/**
 * Build Script for External Distribution
 * Creates optimized builds for public npm distribution
 */

const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist-external");
const PACKAGE_EXTERNAL = path.join(ROOT_DIR, "package.external.json");
const README_EXTERNAL = path.join(ROOT_DIR, "README.external.md");

console.log("🚀 Building Neo Component Kit for External Distribution...");

async function buildExternal() {
  try {
    // Clean previous builds
    console.log("🧹 Cleaning previous builds...");
    await fs.remove(DIST_DIR);
    await fs.ensureDir(DIST_DIR);

    // Step 1: Build main library using external config
    console.log("📦 Building main library...");
    execSync(
      "vue-cli-service build --target lib --name neo-component-kit src/main.external.ts --config vue.config.external.js",
      {
        cwd: ROOT_DIR,
        stdio: "inherit",
      },
    );

    // Step 2: Build AI-optimized entry point
    console.log("🤖 Building AI-optimized entry point...");
    execSync("vue-cli-service build --target lib --name ai-main src/ai-main.ts --config vue.config.external.js", {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });

    // Step 3: Generate TypeScript declarations
    console.log("📝 Generating TypeScript declarations...");
    execSync("npm run buildTypes", {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });

    // Step 4: Copy external package.json
    console.log("📋 Preparing external package.json...");
    if (await fs.pathExists(PACKAGE_EXTERNAL)) {
      await fs.copy(PACKAGE_EXTERNAL, path.join(DIST_DIR, "package.json"));
    }

    // Step 5: Copy external README
    console.log("📖 Copying external README...");
    if (await fs.pathExists(README_EXTERNAL)) {
      await fs.copy(README_EXTERNAL, path.join(DIST_DIR, "README.md"));
    }

    // Step 6: Copy additional files for external distribution
    console.log("📁 Copying additional files...");

    // Copy AI metadata
    await fs.copy(path.join(ROOT_DIR, "ai-metadata"), path.join(DIST_DIR, "ai-metadata"));

    // Copy templates
    await fs.copy(path.join(ROOT_DIR, "templates"), path.join(DIST_DIR, "templates"));

    // Copy types to dist directory
    if (await fs.pathExists(path.join(ROOT_DIR, "types"))) {
      await fs.copy(path.join(ROOT_DIR, "types"), path.join(DIST_DIR, "types"));
    }

    // Step 7: Create external-specific files
    console.log("🔧 Creating external-specific configurations...");

    // Create install guide
    const installGuide = `# Neo Component Kit Installation Guide

## Quick Start

\`\`\`bash
npm install @neo-design/component-kit @neotechnologygroup/neo-icon-kit
\`\`\`

## Setup

\`\`\`typescript
import { createApp } from 'vue';
import { initialize } from '@neo-design/component-kit';
import '@neo-design/component-kit/styles';

const app = createApp(App);

initialize({
  urls: {
    iconsURL: '/icons/' // Path to your Neo Icon Kit icons
  }
});

app.mount('#app');
\`\`\`

## AI-Enhanced Development

\`\`\`typescript
import { suggestComponents, useSmartDefaults } from '@neo-design/component-kit/ai';

const suggestions = suggestComponents('user form');
const { smartButton } = useSmartDefaults();
const saveButton = smartButton('save');
\`\`\`

For full documentation, visit: https://neo-design.github.io/component-kit
`;

    await fs.writeFile(path.join(DIST_DIR, "INSTALL.md"), installGuide);

    // Create changelog
    const changelog = `# Changelog

## [16.1.0] - 2026-02-17

### Added
- External distribution support
- AI-optimized development experience
- Component discovery and suggestion system
- Smart defaults for rapid prototyping
- Pre-built template library
- Enhanced TypeScript definitions
- Comprehensive accessibility features

### Changed
- Optimized build for external usage
- Improved icon integration flexibility
- Enhanced component documentation

### External Distribution
- First public release of Neo Component Kit
- Full compatibility with Neo Icon Kit
- Vue 3 + TypeScript support
- Comprehensive component library (40+ components)
`;

    await fs.writeFile(path.join(DIST_DIR, "CHANGELOG.md"), changelog);

    // Step 8: Validate external build
    console.log("✅ Validating external build...");
    const packageJson = await fs.readJson(path.join(DIST_DIR, "package.json"));

    // Check required files exist
    const requiredFiles = [
      "dist/neo-component-kit.common.js",
      "dist/neo-component-kit.esm.js",
      "dist/ai-main.common.js",
      "dist/neo-component-kit.css",
      "types/main.d.ts",
      "ai-metadata/index.json",
      "templates/index.js",
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(DIST_DIR, file);
      if (!(await fs.pathExists(filePath))) {
        throw new Error(`Required file missing: ${file}`);
      }
    }

    // Validate package.json exports
    if (!packageJson.exports) {
      throw new Error("package.json missing exports field");
    }

    console.log("✨ External build completed successfully!");
    console.log(`📦 Build output: ${DIST_DIR}`);
    console.log("🎯 Ready for npm publishing");

    // Show build summary
    const stats = await getBuildStats(DIST_DIR);
    console.log("\n📊 Build Summary:");
    console.log(`   Main Library: ${stats.mainSize}`);
    console.log(`   AI Entry Point: ${stats.aiSize}`);
    console.log(`   CSS Bundle: ${stats.cssSize}`);
    console.log(`   TypeScript Definitions: ${stats.typesCount} files`);
    console.log(`   Templates: ${stats.templatesCount} templates`);
    console.log(`   Total Size: ${stats.totalSize}`);
  } catch (error) {
    console.error("❌ External build failed:", error.message);
    process.exit(1);
  }
}

async function getBuildStats(distDir) {
  const stats = {
    mainSize: "N/A",
    aiSize: "N/A",
    cssSize: "N/A",
    typesCount: 0,
    templatesCount: 0,
    totalSize: "N/A",
  };

  try {
    // Get file sizes
    const mainJs = path.join(distDir, "dist/neo-component-kit.common.js");
    const aiJs = path.join(distDir, "dist/ai-main.common.js");
    const css = path.join(distDir, "dist/neo-component-kit.css");

    if (await fs.pathExists(mainJs)) {
      const size = (await fs.stat(mainJs)).size;
      stats.mainSize = `${Math.round(size / 1024)}KB`;
    }

    if (await fs.pathExists(aiJs)) {
      const size = (await fs.stat(aiJs)).size;
      stats.aiSize = `${Math.round(size / 1024)}KB`;
    }

    if (await fs.pathExists(css)) {
      const size = (await fs.stat(css)).size;
      stats.cssSize = `${Math.round(size / 1024)}KB`;
    }

    // Count TypeScript files
    const typesDir = path.join(distDir, "types");
    if (await fs.pathExists(typesDir)) {
      const files = await fs.readdir(typesDir);
      stats.typesCount = files.filter((f) => f.endsWith(".d.ts")).length;
    }

    // Count templates
    stats.templatesCount = Object.keys(require("../templates/index.js").CommonUIPatterns).length;

    // Calculate total size (rough estimate)
    const du = execSync(`du -sh "${distDir}"`, { encoding: "utf8" });
    stats.totalSize = du.split("\t")[0];
  } catch (error) {
    console.warn("⚠️ Could not calculate build stats:", error.message);
  }

  return stats;
}

// Run the build if called directly
if (require.main === module) {
  buildExternal();
}

module.exports = { buildExternal };
