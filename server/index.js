const Koa = require('koa');

const app = new Koa();
const serve = require('koa-static');
const mount = require('koa-mount');

const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

app.use(mount('/static', serve(path.join(__dirname, '../dist/static'))));

app.use(async (ctx) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = await readFile(path.join(__dirname, '../dist/index.html'));
});

console.log('process.env', process.env)

app.listen(process.env.PORT || 3000);
