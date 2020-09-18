const JsBarcode = require('jsbarcode');
const pMap = require('p-map');
const fs = require('fs-extra');
const path = require('path');
const AdmZip = require('adm-zip');
const { createCanvas } = require("canvas")
 
const BookService = require('services/book')
const blacklist = ['.DS_Store'];

module.exports = async ctx => {
  const zip = new AdmZip()

  const { ids } = ctx.query
  const uploadsPath = path.join(__dirname, '../tmp')
  fs.ensureDirSync(uploadsPath)
  const bookService = new BookService(ctx)

  const instances = await bookService.getInstanceInfo({ ids })
  const mapper = instance => {
    const createCanvas = () => {}
    const canvas = createCanvas();
    const qsTxt = `${instance.strId}\n${instance.isbn}`
    JsBarcode(canvas, qsTxt, {
      displayValue: true
    });
    let buf = canvas.toBuffer();
    fs.writeFileSync(path.join(uploadsPath, `${instance.strId}.png`), buf);
  };
 
  const result = await pMap(instances, mapper, {concurrency: 5});

  const files = fs.readdirSync(uploadsPath);

  files
    .filter(file => {
      const extension = path.extname(file);
      return blacklist.indexOf(extension) > -1;
    })
    .forEach(file => {
      zip.addLocalFile(uploadsPath + '/' + file);
    });

  const buffer = zip.toBuffer();

  ctx.set({
    'Content-type': 'application/zip',
    'Content-Disposition': `attachment; filename=二维码`
  })

  ctx.body = buffer
}