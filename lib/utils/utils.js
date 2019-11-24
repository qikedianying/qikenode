const jwt = require('jsonwebtoken')

const generateToken = function (openid){
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  const token = jwt.sign({
    openid
  }, secretKey, {
    expiresIn
  })
  return token
}

module.exports = {
  generateToken
}
