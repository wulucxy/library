import { Toast } from 'vant'
import MinioClient from '@/utils/minio';
// import 'web-streams-polyfill'

// 实例化 minIO
window.minioClient = new MinioClient();

// 只针对 promise 异步捕获
// eslint-disable-next-line func-names
window.addEventListener('unhandledrejection', function(event) {
  const {reason} = event;
  if (reason) {
    if (reason.message) {
      Toast.fail({
        message: reason.message,
      });
    }
  }
});