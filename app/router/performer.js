const Router          = require('koa-router')
const {Success}       = require('../../core/http-exception/common')
const {Performer} = require('../../models/performer')
const {MovieInfo} = require('../../models/movie_info')
const {PerformerMovie} = require('../../models/performer_movie')

const router          = new Router({
  prefix: '/performer'
})

router.post('/add', async (ctx, next) => {
  const result = await Performer.addperformer(ctx.request.body)
  throw new Success(result)
})

router.get('/serachByName', async (ctx, next) => {
  const result = await Performer.searchByName(ctx.request.query.key)
  console.log(result)
  throw new Success(result)
})

router.post('/addRole', async (ctx, next) => {
  const request   = ctx.request.body
  const performer = request.performer
  const ids       = request.ids
  const movieId   = request.id
  await MovieInfo.updateInfo(movieId, ids)
  await PerformerMovie.createData(performer)
  throw new Success('更新成功')
})

module.exports = router
