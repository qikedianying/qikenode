const {User} = require('../../models/user')
const Router = require('koa-router')
const {Success} = require('../../core/http-exception/common')
const axios = require('axios')
const WXBizDataCrypt = require('../../lib/utils/wxBizDataCrypt')
const {wx} = require('../../config/config')
const router = new Router({
  prefix: '/user'
})

router.post('/create', async (ctx, next) => {
  ctx.body = await User.createUser({
    openid: ctx.request.body.openid,
    nike_name: ctx.request.body.nikeName
  })
})

router.post('/login', async (ctx, next) => {
  const code = ctx.request.body.code
  const iv = ctx.request.body.iv
  const encryptedData = ctx.request.body.encryptedData
  const appid = wx.appid

  const result = await axios.get(`${wx.loginUrl}${code}`)
  const sessionKey = result.data.session_key

  const pc = new WXBizDataCrypt(appid, sessionKey)
  const data = pc.decryptData(encryptedData, iv)

  throw new Success(data, '请求成功')
})

router.get('/getInfo/:openid', async (ctx, next) => {
  const path = ctx.params
  ctx.body = await User.getUser(path.openid)
})

module.exports = router
