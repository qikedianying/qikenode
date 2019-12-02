const Router           = require('koa-router')
const jwt = require('jsonwebtoken')
const {Likes} = require('../../models/likes')
const {Success}       = require('../../core/http-exception/common')
const {User} = require('../../models/user')
const {HasZan} = require('../../core/http-exception/article')
const {Article} = require('../../models/articles')

const router = new Router({
  prefix: '/article'
})

router.get('/zan', async (ctx, next) => {

  const token     = ctx.request.header.token
  const movieId   = ctx.request.query.movieId
  const articleId = ctx.request.query.articleId
  const decoded   = jwt.verify(token, global.config.security.secretKey)

  const user = await User.getUser(decoded.openid)
  console.log(user)
  const zanRocord = await Likes.getArticleZan({
    user_id: user.dataValues.id,
    movie_id: movieId,
    article_id: articleId
  })
  if (zanRocord) {
    throw new HasZan('请勿重复点赞')
  } else {
    await Likes.createLike({
      movie_id: movieId,
      article_id: articleId,
      user_id: +user.dataValues.id
    })
    await Article.createZan(articleId)
    throw new Success()
  }
})
router.post('/add', async (ctx, next) => {
  const result = await Article.articleAdd(ctx.request.body)
  console.log(result)
  throw new Success(result)
})

module.exports = router
