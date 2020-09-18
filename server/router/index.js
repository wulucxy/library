const Router = require('koa-router')
const appConfig = require('config')

const { apiPrefix } = appConfig

// 路由定义
const router = new Router({ prefix: apiPrefix })
router.post('/upload', require('controllers/upload'))
router.get('/instances/export', require('controllers/export'))

module.exports = router
