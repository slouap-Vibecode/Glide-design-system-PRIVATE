const path = require("path");

/**
 * External Webpack Configuration
 * Specialized build configuration for external/public distribution
 */
module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/main.ts"),
    "ai-optimized": path.resolve(__dirname, "../src/ai-main.ts"),
  },

  externals: {
    // Vue as peer dependency
    vue: {
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
      root: "Vue",
    },

    // Neo Icon Kit as flexible peer dependency
    "@neotechnologygroup/neo-icon-kit": {
      commonjs: "@neotechnologygroup/neo-icon-kit",
      commonjs2: "@neotechnologygroup/neo-icon-kit",
      amd: "@neotechnologygroup/neo-icon-kit",
      root: "NeoIconKit",
    },

    // Optional externals for different icon kit sources
    "@neo-design/icon-kit": {
      commonjs: "@neo-design/icon-kit",
      commonjs2: "@neo-design/icon-kit",
      amd: "@neo-design/icon-kit",
      root: "NeoIconKit",
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      // Provide flexible icon kit resolution
      "neo-icon-kit": "@neotechnologygroup/neo-icon-kit",
    },
  },

  output: {
    library: "NeoComponentKit",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: 'typeof self !== "undefined" ? self : this',
  },

  optimization: {
    // Enable tree shaking for external builds
    usedExports: true,
    sideEffects: false,

    // Split chunks for better loading performance
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
};
