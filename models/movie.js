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
  static async getMovieByMovieId(id) {
    return await Movie.findOne({
      where: { movie_id: id }
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

  static async movieCreateByCrawl (data) {
    const item = await Movie.findOne({
      where: {
        movie_id: data.movie_id
      }
    })
    if (!item) {
      return await Movie.create(data)
    }

  }
  static async movieUpdateByCrawl(data) {
    console.log('data', data)
    return await Movie.update(data, {
      where: {movie_id: data.movie_id}
    })
  }
}

Movie.init({
  id: {
    type:          Sequelize.INTEGER,
    primaryKey:    true,
    autoIncrement: true,
  },
  type:         Sequelize.INTEGER,
  face:         Sequelize.STRING,
  name:         Sequelize.STRING,
  english_name: Sequelize.STRING,
  score:        Sequelize.FLOAT,
  label:        Sequelize.STRING,
  address:      Sequelize.STRING,
  movie_length: Sequelize.STRING,
  pub_desc:     Sequelize.STRING,
  likes:        Sequelize.INTEGER,
  movie_id:     Sequelize.INTEGER
}, {
  sequelize: db,
  modelName: 'movie'
})

module.exports= {
  Movie
}
