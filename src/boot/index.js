import { Toast } from 'vant'
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