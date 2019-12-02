const Router    = require('koa-router')
const Qiniu     = require('qiniu')
const {Success} = require('../../core/http-exception/common')

const router          = new Router({
  prefix: '/qiniu'
})

router.get('/token', async (ctx, next) => {
  const accessKey = 'PoeHvBTqWenFVBFUKzPWa7SKWgfYf1zmpMBwyyhB';
  const secretKey = 'pFWBS_Zby1PYfsnkOCUVGWwZCrmYPIlTLEkVLbuz';
  const mac       = new Qiniu.auth.digest.Mac(accessKey, secretKey);
  const options   = {
    scope: 'qikemovie',
    expires: 7200 * 12
  }


  const putPolicy   = new Qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  throw new Success(uploadToken)
})

module.exports = router
