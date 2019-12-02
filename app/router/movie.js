const {Movie}          = require('../../models/movie')
const Router           = require('koa-router')
const {Success}        = require('../../core/http-exception/common')
const {generateToken}  = require('../../lib/utils/utils')
const {MovieInfo}      = require('../../models/movie_info')
const {Performer}      = require('../../models/performer')
const {PerformerMovie} = require('../../models/performer_movie')
const {Article}        = require('../../models/articles')

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
  let movie          = await Movie.getMovieById(movieId)
  let movieInfo      = await MovieInfo.getMovieInfoById(movieId)
  movie              = movie ? movie.dataValues : {}
  movieInfo          = movieInfo ? movieInfo.dataValues : {}

  // 获取演员数据
  const performerIds = movieInfo.performer.split(',')
  let performerGroup = await Performer.getPerformer(performerIds)
  performerGroup     = performerGroup.map(item => item.dataValues)
  let performerMovie = await PerformerMovie.getPerformerGroups(movieId)
  performerMovie     = performerMovie.map(item => item.dataValues)

  // 演员数据组装返回
  let groups = []
  performerGroup.map(item => {
    let data = {}
    data.avatar = item.avatar
    data.name   = item.name
    performerMovie.map(subitem => {
      if (subitem.performer_id == item.id) {
        data.row = subitem.play_row
      }
    })
    groups.push(data)
  })

  // 获取文章数据
  let articleGroup = await Article.getArticleByMovieId(movieId)
  articleGroup = articleGroup.map(item => item.dataValues)

  const result = {
    ...movie,
    ...movieInfo,
    performer: groups,
    article: articleGroup
  }
  ctx.body = new Success(result)
})

// todo 接口/create
router.post('/create', async (ctx, next) => {
  console.log(ctx.request.body)
  const result = await Movie.movieCreate(ctx.request.body)

  throw new Success(result)
})

router.post('/content', async (ctx, next) => {
  const content = await ctx.request.body.content
  const movieId = await ctx.request.body.id
  const result = await MovieInfo.createContent(content, movieId)
  throw new Success('操作成功')
})



module.exports = router
