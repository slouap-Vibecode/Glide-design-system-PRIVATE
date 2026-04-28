const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  chainWebpack: (config) => {
    if (config.plugins.has("optimize-css")) {
      config.plugin("optimize-css").tap((args) => {
        // Do not compute CSS calc instructions to avoid IE11 bugs with measurements with more than 2 decimal digits
        args[0].cssnanoOptions.preset[1].calc = false;
        return args;
      });
    }

    config.plugin("define").tap((definitions) => {
      definitions[0]["process.env"].BRANCH_NAME = process.env.BRANCH_NAME;
      return definitions;
    });
  },

  // https://github.com/vue-macros/vue2-vue-cli/blob/main/vue.config.js
  parallel: false,
});
