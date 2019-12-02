const {Sequelize, Model, Op} = require('sequelize')
const { db } = require('../core/db')

class Article extends Model{
  static async getArticleByMovieId(movieId){
    return await Article.findAll({
      where: {
        movie_id: movieId
      }
    })
  }

  static async createZan(id) {
    const article = await Article.findOne({
      where: {
        id
      }
    })

    return await Article.update({
      zan_count: +article.dataValues.zan_count + 1
    }, {
      where: {
        id
      }
    })
  }

  static async articleAdd(data) {
    const {id, title, content, html, url} = data
    return await Article.create({
      zan_count: 0,
      movie_id: id,
      content,
      title,
      html,
      url
    })
  }
}

Article.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url:       Sequelize.STRING,
  title:     Sequelize.STRING,
  content:   Sequelize.STRING,
  zan_count: Sequelize.INTEGER,
  movie_id:  Sequelize.INTEGER,
  html:      Sequelize.TEXT
}, {
  sequelize: db,
  modelName: 'article'
})



module.exports= {
  Article
}
