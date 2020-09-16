const Minio = require('minio');
const toArray = require('stream-to-array');
const CONST = require('./const');

// 导出 bucketName 和 host
export const bucketName = CONST.minio.bucketName
export const bucketHost = `${location.protocol}//${CONST.minio.config.endPoint}:${CONST.minio.config.port}`

// 上传文件
class MinioClient {
  constructor() {
    this.minIOConfig = CONST.minio.config;
    this.bucketName = CONST.minio.bucketName;
    this.init();
  }

  async init() {
    this.client = new Minio.Client(this.minIOConfig);
    await this.makeBucket(this.bucketName);
  }

  async makeBucket(name) {
    const bucketExists = await this.client.bucketExists(name);
    if (bucketExists) {
      return;
    }
    // eslint-disable-next-line
    await makeBucket(this.client, name);
  }

  async listObjects(prefix, recursive = true) {
    const result = await this.client.listObjects(this.bucketName, prefix, recursive);
    return toArray(result);
  }

  async putObject(objectName, stream, ...rest) {
    try {
      console.log('this.bucketName', this.bucketName)
      console.log('objectName', objectName)
      console.log('stream', stream)
      const result = await this.client.putObject(this.bucketName, objectName, stream, ...rest);
      if (result) {
        return { err: null, data: {
          objectName, result,
        }};
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default MinioClient;
