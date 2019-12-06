const {Movie}          = require('../../models/movie')
const Router           = require('koa-router')
const {Success}        = require('../../core/http-exception/common')
const {generateToken}  = require('../../lib/utils/utils')
const {MovieInfo}      = require('../../models/movie_info')
const {PerformerMovie} = require('../../models/performer_movie')
const {Comment}        = require('../../models/comment')

const router = new Router({
  prefix: '/movie'
})


// todo 接口popular
router.get('/popular', async (ctx, next) => {
  const data = await Movie.getPopularMovie()
  let result = data || []
  throw new Success(result)
})

// todo 接口/list
router.get('/list', async (ctx, next) => {
  const pageNum = ctx.request.query.pageNum
  const list = await Movie.getList(+pageNum)
  console.log(pageNum)
  throw new Success(list)
})

// todo 接口/detail
router.get('/detail', async (ctx, next) => {
  // 获取参数
  const movieId      = +ctx.request.query.id

  // 获取主要数据
  let movie     = await Movie.getMovieByMovieId(movieId)
  let movieInfo = await MovieInfo.getMovieInfoByMovieId(movieId)
  let performer = await PerformerMovie.getPerformerByMovieId(movieId)
  let comment   = await Comment.getCommentByMovieId(movieId)
  movie         = movie ? movie.dataValues : {}
  movieInfo     = movieInfo ? movieInfo.dataValues : {}
  performer     = performer.map(item => item.dataValues)
  comment       = comment.map(item => item.dataValues)

  const result = {
    ...movie,
    ...movieInfo,
    performer: performer,
    comment: comment
  }
  throw new Success(result)
})

// todo 接口/create
router.post('/create', async (ctx, next) => {
  console.log(ctx.request.body)
  const result = await Movie.movieCreate(ctx.request.body)

  throw new Success(result)
})

// todo 接口/content
router.post('/content', async (ctx, next) => {
  const content = await ctx.request.body.content
  const movieId = await ctx.request.body.id
  const result = await MovieInfo.createContent(content, movieId)
  throw new Success('操作成功')
})



module.exports = router
