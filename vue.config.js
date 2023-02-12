const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser")
      }
    }
  }
}
const Dotenv = require('dotenv-webpack');

module.exports = {
  // ...
  plugins: [
    // ...
    new Dotenv()
  ]
}