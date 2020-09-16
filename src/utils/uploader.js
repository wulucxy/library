const toStream = require('blob-to-stream')

// import fetchStream from 'fetch-readablestream';

// function readAllChunks(readableStream) {
//   console.log('readableStream', readableStream)
//   const reader = readableStream.getReader();
//   const chunks = [];

//   function pump() {
//     return reader.read().then(({ value, done }) => {
//       console.log('====va====', value)
//       if (done) {
//         return chunks;
//       }
//       chunks.push(value);
//       return pump();
//     });
//   }

//   return pump();
// }
const imgToBlob = (url) => new Promise((resolve) => {
  var img = new Image()
  console.log('url', url)
  img.onload = function() {
    console.log('url', url)
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    console.log('canvas')
    canvas.toBlob((blob) => {
      resolve(blob)
    })
  }
  img.src = url
  console.log('crossOrigin老婆买个')
  //img.setAttribute('crossOrigin', 'Anonymous')
  img.crossOrigin = "";
})


// 生成二进制文件
// const fetchFileBlob = (url) => {
//   fetchStream(url)
//   .then(response => {
//     console.log('===response===', response)
//     return readAllChunks(response.body)
//   })
//   .then(chunks => {
//     console.dir(chunks)
//   })
// }

export const minIOUpload = ({ objectPath, fileList }) => {
  const promises = fileList.map(async(d) => {
    // 生成 stream 流
    const blob = await imgToBlob(d)
    console.log('===objectPath===', objectPath)
    const result = await window.minioClient.putObject(`${objectPath}`, toStream(blob))
    return result
  })
  return Promise.all(promises)
}
