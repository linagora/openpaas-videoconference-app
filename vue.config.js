const path = require("path");

module.exports = {
  transpileDependencies: ["vue-openpaas-components"],
  configureWebpack: {
    resolve: {
      alias: {
        "%": path.resolve(__dirname, "tests"),
        "%utils": path.resolve(__dirname, "tests", "unit", "utils")
      }
    }
  }
};
