const {Sequelize, Model} = require('sequelize')
const { db } = require('../core/db')

class Comment extends Model{
  static async createCommentByCrawl(data) {
    const item = await Comment.findOne({
      where: {
        movie_id: data.movie_id,
        avatar: data.avatar
      }
    })
    if (!item) {
      return await Comment.create(data)
    }
  }
  static async getCommentByMovieId(id) {
    return await Comment.findAll({
      attributes: ['avatar', 'name', 'content'],
      where: {movie_id: id}
    })
  }
}

Comment.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id: Sequelize.INTEGER,
  avatar:   Sequelize.STRING,
  name:     Sequelize.STRING,
  content:  Sequelize.TEXT
}, {
  sequelize: db,
  modelName: 'comment'
})



module.exports= {
  Comment
}
