const vConsolePlugin = require('vconsole-webpack-plugin');

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8081,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/dd': {
        ws: false,
        target: 'https://oapi.dingtalk.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/dd': ''
        }
      },
    }
  },
  configureWebpack: config => {
    const devPlugins = [
      new vConsolePlugin({
        filter: [],
        enable: true
      })
    ]
    if (process.env.NODE_ENV === 'development') {
      config.plugins = [...config.plugins, ...devPlugins];
    }
  }
}