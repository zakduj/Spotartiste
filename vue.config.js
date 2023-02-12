const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser")
      }
    },
    plugins: [
      new Dotenv()
    ]
  }
})