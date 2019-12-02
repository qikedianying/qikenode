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
  static async createData(data) {
    for (let i = 0; i < data.length; i++) {
      await PerformerMovie.create(data[i])
    }
    return
  }
}

PerformerMovie.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id:     Sequelize.INTEGER,
  performer_id: Sequelize.INTEGER,
  play_row:     Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'performer_movie'
})



module.exports= {
  PerformerMovie
}
