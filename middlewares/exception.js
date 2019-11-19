const HttpException = require('../core/http-exception/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (e) {

    const isHttpException = e instanceof HttpException
    if (isHttpException) {
      ctx.body = {
        code: e.code,
        msg: e.msg
      }
    }
    // console.log(e.msg, e.errorCode)
    else {
      ctx.body = {
        code: 500,
        msg: '出现了一个未知错误'
      }
    }
  }
}

module.exports = catchError
