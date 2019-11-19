const {User} = require('../../models/user')
const Router = require('koa-router')
const router = new Router({
  prefix: '/user'
})

router.post('/create', async (ctx, next) => {
  ctx.body = await User.createUser({
    openid: ctx.request.body.openid,
    nike_name: ctx.request.body.nikeName
  })
})

router.get('/getInfo/:openid', async (ctx, next) => {
  const path = ctx.params
  ctx.body = await User.getUser(path.openid)
})

module.exports = router
