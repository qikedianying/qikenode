const HttpException = require('./http-exception')

class ParameterException extends HttpException{
  constructor (msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

class NotFound extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 404
    this.msg = msg || '资源未找到'
    this.errorCode = errorCode || 10000

  }
}

class Success extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 200
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

module.exports = {
  ParameterException,
  NotFound,
  Success
}
