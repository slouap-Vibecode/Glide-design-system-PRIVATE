const { defineConfig } = require("@vue/cli-service");

/**
 * External build configuration for Neo Component Kit
 * This configuration is optimized for external/public distribution
 */
module.exports = defineConfig({
  chainWebpack: (config) => {
    // Remove internal environment variables for external build
    config.plugin("define").tap((definitions) => {
      // Keep only essential environment variables for external build
      definitions[0]["process.env"] = {
        NODE_ENV: process.env.NODE_ENV,
        // Remove internal BRANCH_NAME for external builds
      };
      return definitions;
    });

    // Optimize CSS for external distribution
    if (config.plugins.has("optimize-css")) {
      config.plugin("optimize-css").tap((args) => {
        // Enhanced CSS optimization for external builds
        args[0].cssnanoOptions.preset[1].calc = false;
        // Add minification optimizations for external distribution
        args[0].cssnanoOptions.preset[1].discardComments = { removeAll: true };
        return args;
      });
    }

    // Configure externals for peer dependencies
    config.externals({
      vue: {
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
        root: "Vue",
      },
      // Make Neo Icon Kit a peer dependency for external builds
      "@neotechnologygroup/neo-icon-kit": {
        commonjs: "@neotechnologygroup/neo-icon-kit",
        commonjs2: "@neotechnologygroup/neo-icon-kit",
        amd: "@neotechnologygroup/neo-icon-kit",
        root: "NeoIconKit",
      },
    });
  },

  // Disable parallel processing for consistent external builds
  parallel: false,

  // Configure output for external distribution
  outputDir: "dist-external",

  // Enable source maps for debugging external builds
  productionSourceMap: true,

  // CSS configuration for external builds
  css: {
    extract: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        // Configure LESS options for external builds
        globalVars: {
          // Ensure external builds have access to design tokens
        },
      },
    },
  },
});
