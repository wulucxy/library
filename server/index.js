const Koa = require('koa');

const app = new Koa();
const serve = require('koa-static');
const mount = require('koa-mount');
const proxy = require('koa-proxies');

const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const PORT = process.env.PORT || 3000

app.use(proxy('/dd', {
  target: 'https://oapi.dingtalk.com',
  changeOrigin: true,
  rewrite: path => path.replace(/^\/dd/, ''),
  logs: true
}))

app.use(mount('/static', serve(path.join(__dirname, '../dist/static'))));

app.use(async (ctx) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = await readFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT,  e => console.log(e || `listening at ${PORT}`));
