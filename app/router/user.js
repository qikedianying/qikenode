const {User}          = require('../../models/user')
const Router          = require('koa-router')
const {Success}       = require('../../core/http-exception/common')
const axios           = require('axios')
const WXBizDataCrypt  = require('../../lib/utils/wxBizDataCrypt')
const {wx}            = require('../../config/config')
const {generateToken} = require('../../lib/utils/utils')

const router          = new Router({
  prefix: '/user'
})

router.post('/login', async (ctx, next) => {
  // 获取参数
  const code          = ctx.request.body.code
  const iv            = ctx.request.body.iv
  const encryptedData = ctx.request.body.encryptedData
  const appid         = wx.appid

  // 请求腾讯服务器
  const result        = await axios.get(`${wx.loginUrl}${code}`)
  const sessionKey    = result.data.session_key

  // 获取解密数据
  const pc            = new WXBizDataCrypt(appid, sessionKey)
  const data          = pc.decryptData(encryptedData, iv)

  // 获取用户详情
  const user          = await User.getUser(data.openId)

  // 用户不存在 添加用户
  if(!user) {
    await User.createUser(data)
  }

  console.log(data, 222)

  // 返回数据
  data.token = generateToken(data.openId)

  throw new Success(data)
})


module.exports = router
