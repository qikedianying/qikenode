const {Sequelize, Model} = require('sequelize')
const { db } = require('../core/db')

class Likes extends Model{
  static async getArticleZan(params){
    return await Likes.findOne({
      where: params
    })
  }
  static async createLike(data) {
    return await Likes.create(data)
  }
}

Likes.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id:   Sequelize.INTEGER,
  article_id: Sequelize.INTEGER,
  comment_id: Sequelize.INTEGER,
  user_id:    Sequelize.INTEGER
}, {
  sequelize: db,
  modelName: 'likes'
})



module.exports= {
  Likes
}
