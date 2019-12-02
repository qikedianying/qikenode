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
  static async getMovieById(id) {
    return await Movie.findOne({
      where: { id }
    })
  }

  static async getList(pageNum) {
    const offset = ( pageNum -1 ) * 10
    return await Movie.findAndCountAll({
      limit: 10,
      order: [['type'], ['id', 'DESC']],
      offset
    })
  }
  static async movieCreate(data) {
    const {
      name,
      englishName,
      face,
      meiScore,
      maoScore,
      address,
      label,
      movieLength,
      releaseTime,
      type,
      releaseCountry,
    } = data
    console.log(data)
    return await Movie.create({
      name,
      type,
      face: face[0],
      english_name: englishName,
      mei_score: meiScore,
      mao_score: maoScore,
      label,
      address,
      movie_length: movieLength,
      release_time: releaseTime,
      release_country: releaseCountry,
      likes: 0
    })
  }
  static async movieUpdate(data) {
    const {
      name,
      englishName,
      face,
      meiScore,
      maoScore,
      address,
      label,
      movieLength,
      releaseTime,
      id,
      type,
      releaseCountry,
    } = data
    return await Movie.update({
      name,
      type,
      face: face[0],
      english_name: englishName,
      mei_score: meiScore,
      mao_score: maoScore,
      label,
      address,
      movie_length: movieLength,
      release_time: releaseTime,
      release_country: releaseCountry
    }, {
      where: {
        id
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

module.exports= {
  Movie
}
