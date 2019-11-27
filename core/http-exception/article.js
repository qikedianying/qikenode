const HttpException = require('./http-exception')

class HasZan extends HttpException{
  constructor (msg, errorCode) {
    super()
    this.code = 300
    this.msg = msg || '您已点过赞'
    this.errorCode = errorCode || 10000
  }

}


module.exports = {
  HasZan
}
