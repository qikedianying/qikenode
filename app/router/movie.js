const {Movie}         = require('../../models/movie')
const Router          = require('koa-router')
const {Success}       = require('../../core/http-exception/common')
const {generateToken} = require('../../lib/utils/utils')

const router = new Router({
  prefix: '/movie'
})

router.get('/popular', async (ctx, next) => {
  const data = await Movie.getPopularMovie()
  let result = data || []

  throw new Success(result)
})

module.exports = router
