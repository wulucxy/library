const path = require('path')
const Promise = require('bluebird')
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
          '^/api': '/api'
        }
      },
    },
    before (app){
      function requireUncached(module) {
        try {
          // 删除缓存，动态加载
          delete require.cache[require.resolve(module)]
          return require(module)
        } catch (e) {
          console.log(`can't load module in ${module}`)
        }
      }

      // 根据 mock 请求发送响应
      function sendValue(req, res, value) {
        if (typeof value === 'function') {
          value = value(req, res)
        }

        if (value.$$header) {
          Object.keys(value.$$header).forEach(key => {
            res.setHeader(key, value.$$header[key])
          })
        }

        const delay = value.$$delay || 0

        delete value.$$header
        delete value.$$delay

        Promise.delay(delay, value).then(result => {
          res.send(result)
        })
      }

      // 处理 restful mock 接口
    const mockMap = require(path.join(__dirname, 'mock/mock-map'))

    // 对于每个 mock 请求，require mock 文件夹下的对应路径文件，并返回响应
    Object.keys(mockMap).forEach(mockPath => {
      app.all(path.posix.join('/mock', mockPath), function(req, res) {
        const value = requireUncached(path.join(__dirname, 'mock', mockMap[mockPath]))

        sendValue(req, res, value)
      })
    })

      app.all('/mock/*', function(req, res) {
        const mockPath = path.join(__dirname, req.path)
        const value = requireUncached(mockPath)
        if (value) {
          sendValue(req, res, value)
        } else {
          res.sendStatus(404)
        }
      })
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
    if (process.env.NODE_ENV === 'development') {
      config.plugins = [...config.plugins, ...devPlugins];
    }
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