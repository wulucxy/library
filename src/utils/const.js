module.exports = {
  title: "之江图书借阅系统",
  pageSize: 10,
  minio: {
    config: {
      endPoint: '10.5.29.82',
      port: 9000,
      useSSL: false,
      accessKey: 'admin',
      secretKey: '123@abc.com'
    },
    bucketName: 'static',
  },
}
