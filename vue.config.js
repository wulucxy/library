const path = require('path')
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
    historyApiFallback: true,
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
      '/api': {
        ws: false,
        target: process.env.VUE_APP_BASE_API,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
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
    // todo: 生产环境优化
    // config.plugins = [...config.plugins, ...devPlugins];
    // if (process.env.NODE_ENV === 'development') {
    //   config.plugins = [...config.plugins, ...devPlugins];
    // }
  },
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import '${path.join(__dirname, './src/assets/theme.less')}'`
          },
        },
      },
    },
  },
}