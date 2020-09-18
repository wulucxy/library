// 统一错误处理
module.exports = () => {
  const errCallback = async (error, ctx) => {
    console.log('err', error)
    const { status = 500, message, origin = '', ...rest } = error
      ctx.status = status
      ctx.body = {
        code: 1,
        ...rest,
        error: message,
        errorOrigin: origin,
      }
  }

  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      await errCallback(err, ctx)
    }
  }
}
