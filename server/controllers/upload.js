const fs = require('fs-extra')
const path = require('path')

module.exports = async ctx => {
  const { url: imageUrl } = ctx.request.body
  const uploadUrl = await ctx.axios({
    url: imageUrl,
    responseType: 'stream'
  }).then(response => {
    const resourseName = path.basename(imageUrl)
    fs.ensureDirSync(path.join(__dirname, `../uploads`))
    const destPath = path.join(__dirname, `../uploads/${resourseName}`)
    response.data.pipe(fs.createWriteStream(destPath));
    return `/uploads/${resourseName}`;
  })
  ctx.body = {
    code: 200,
    message: '下载成功',
    data: uploadUrl
  }
}