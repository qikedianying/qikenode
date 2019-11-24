const {Sequelize, Model} = require('sequelize')
const { db }             = require('../core/db')
const {MovieType}        = require('../lib/enum')

class Movie extends Model{
  static async getPopularMovie() {
    return await Movie.findAll({
      where: {
        type: MovieType.POPULAR
      }
    })
  }
}

Movie.init({
  id: {
    type:          Sequelize.INTEGER,
    primaryKey:    true,
    autoIncrement: true,
  },
  // 1 最新电影宝宝有资源 2 正常电影 3 没有资源的电影
  type:         Sequelize.INTEGER,
  face:         Sequelize.STRING,
  name:         Sequelize.STRING,
  english_name: Sequelize.STRING,
  mei_score:    Sequelize.FLOAT,
  mao_score:    Sequelize.FLOAT,
  label:        Sequelize.STRING,
  address:      Sequelize.STRING,
  movie_length: Sequelize.STRING,
  release_time: Sequelize.STRING,
  release_country: Sequelize.STRING,
  likes:        Sequelize.INTEGER
}, {
  sequelize: db,
  modelName: 'movie'
})

// La leggenda dei piansita sull'oceano

module.exports= {
  Movie
}
