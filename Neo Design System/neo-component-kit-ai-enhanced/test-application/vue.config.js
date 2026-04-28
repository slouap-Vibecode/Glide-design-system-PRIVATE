const { defineConfig } = require('@vue/cli-service');
const FontPreloadPlugin = require("webpack-font-preload-plugin");
const path = require("node:path")

module.exports = defineConfig({
    publicPath: './',
    chainWebpack: config => {
      /* the sole purpose of this app is for test so we might
      as well always toggle tools to debug */
      config.plugin('define').tap((definitions) => {
        // https://vuejs.org/api/compile-time-flags.html#VUE_PROD_DEVTOOLS
        definitions[0].__VUE_PROD_DEVTOOLS__ = "true";
        return definitions;
      })

      config.resolve.alias.set( "vue$", path.resolve(__dirname, "./node_modules/vue/dist/vue.runtime.esm-bundler.js"));

      config.plugin("preloadFont").use(FontPreloadPlugin);

      config.resolve.symlinks = false;
    }
});
