const HttpException = require('../core/http-exception/http-exception')
const chalk         = require('chalk')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    console.log(chalk.hex('#ed6673').bold('=================================='))
    console.log(chalk.hex('#ed6673').bold(e))
    console.log(chalk.hex('#ed6673').bold('=================================='))

    const isHttpException = e instanceof HttpException
    if (isHttpException) {
      ctx.body = {
        code: e.code,
        msg: e.msg,
        data: e.data
      }
    }
    // console.log(e.msg, e.errorCode)
    else {

      // ctx.body = e
      ctx.body = {
        code: 500,
        msg: '出现了一个未知错误'
      }
    }
  }
}

module.exports = catchError
