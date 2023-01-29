const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  productionSourceMap: true,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 9888,
    proxy: {
      '^/api': {
        target: 'http://43.138.186.222:8080',
        changeOrigin: true,
        ws: false,
        pathRewrite: { '^/api': '' },
      },
    }
  }
})
