require('app-module-path/register')

const Koa = require('koa');

const app = new Koa();
const serve = require('koa-static');
const mount = require('koa-mount');
const proxy = require('koa-proxies');
const bodyParser = require('koa-bodyparser')

const fs = require('fs');
const path = require('path');
const util = require('util');

const axiosMiddleware = require('./middleware/axios')
const errorMiddleware = require('./middleware/error')
const router = require('./router')

const readFile = util.promisify(fs.readFile);

const PORT = process.env.PORT || 3000

app.use(errorMiddleware())

app.use(proxy('/dd', {
  target: 'https://oapi.dingtalk.com',
  changeOrigin: true,
  rewrite: path => path.replace(/^\/dd/, ''),
  logs: true
}))

// todo: 指向到真实环境
app.use(proxy('/api', {
  // target: 'http://10.252.2.38:7080', // 测试环境
  target: 'http://10.5.29.82:7080', // 生产环境
  changeOrigin: true,
  rewrite: path => path.replace(/^\/api/, '/api'),
  logs: true
}))

app.use(bodyParser())

app.use(mount('/static', serve(path.join(__dirname, '../dist/static'))));
app.use(mount('/uploads', serve(path.join(__dirname, 'uploads'))));

app.use(axiosMiddleware())
// 路由配置
app.use(router.routes(), router.allowedMethods())

app.use(async (ctx) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = await readFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT,  e => console.log(e || `listening at ${PORT}`));
