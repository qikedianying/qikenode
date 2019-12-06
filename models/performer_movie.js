const {Sequelize, Model, Op} = require('sequelize')
const { db } = require('../core/db')

class PerformerMovie extends Model{
  static async getPerformerGroups (movieId) {
    return await PerformerMovie.findAll({
      attributes: ['movie_id', 'performer_id', 'play_row'],
      where: {
        movie_id: movieId
      }
    })
  }
  static async getPerformerByMovieId(movieId) {
   return await PerformerMovie.findAll({
     attributes: ['name', 'avatar', 'play_row'],
     where: {movie_id: movieId}
   })
  }
  static async createData(data) {
    for (let i = 0; i < data.length; i++) {
      await PerformerMovie.create(data[i])
    }
    return
  }
  static async createDataByCrawl(data) {
    const item = await PerformerMovie.findOne({
      where: {
        avatar: data.avatar,
        movie_id: data.movie_id
      }
    })
    if (!item) {
      return await PerformerMovie.create(data)
    }
  }
}

PerformerMovie.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:     Sequelize.STRING,
  movie_id: Sequelize.INTEGER,
  avatar:   Sequelize.STRING,
  play_row: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'performer_movie'
})



module.exports= {
  PerformerMovie
}
