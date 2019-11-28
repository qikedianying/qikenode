// const env = require('./dev')
const env = require('./prod')

module.exports = {
  ...env,
  security: {
    secretKey: '123!@#qweQWE',
    expiresIn: 60 * 60 * 24 *7// 一个小时 * 24 * 7
  },
  wx: {
    appid: 'wxf19a509c99a12155',
    appSecret: '544189fd7fb962e5d0497ef310df6e2a',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxf19a509c99a12155&secret=544189fd7fb962e5d0497ef310df6e2a&grant_type=authorization_code&js_code=',
  }
}
