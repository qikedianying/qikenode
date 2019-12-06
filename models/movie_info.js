const {Sequelize, Model} = require('sequelize')
const { db }             = require('../core/db')
const {MovieType}        = require('../lib/enum')

class MovieInfo extends Model{
  // 使用中
  static async getMovieInfoById(movieId) {
    const movieInfo = await MovieInfo.findOne({
      where: {
        movie_id: movieId
      }
    })
    return movieInfo
  }
  static async createMovieInfo() {
    MovieInfo.create({
      content: 'test',
      movie_id: 2
    })
  }
  static async getMovieInfoByMovieId(id) {
    return await MovieInfo.findOne({
      attributes: ['content', 'baidu_yun', 'extract_code', 'ftp_url'],
      where: {movie_id: id}
    })
  }
  static async createContent(content, id) {
    const result = await MovieInfo.getMovieInfoById(id)
    if (result) {
      return await MovieInfo.update({
        content
      }, {
        where: {
          movie_id: id
        }
      })
    } else {
      return await MovieInfo.create({
        content,
        movie_id: id
      })
    }
  }
  static async updateInfo(id, ids) {
    const result = await MovieInfo.getMovieInfoById(id)
    if (result) {
      return await MovieInfo.update({
        performer: ids
      }, {
        where: {
          movie_id: id
        }
      })
    } else {
      return await MovieInfo.create({
        performer: ids,
        movie_id: id
      })
    }
  }

  static async movieInfoUpdateByCrawl(data) {
    let movieInfo = await MovieInfo.getMovieInfoById(data.movie_id)
    if (movieInfo) {
      return await MovieInfo.update(data, {
        where: {movie_id: data.movie_id}
      })
    } else {
      return await MovieInfo.create(data)
    }
  }
}

MovieInfo.init({
  id: {
    type:          Sequelize.INTEGER,
    primaryKey:    true,
    autoIncrement: true,
  },
  content:      Sequelize.TEXT, // 简介
  movie_id:     Sequelize.INTEGER, //电影id
  baidu_yun:    Sequelize.STRING, // 百度云地址
  extract_code: Sequelize.STRING, // 百度云密码
  ftp_url:      Sequelize.STRING // ftp下载地址
}, {
  sequelize: db,
  modelName: 'movie_info'
})

module.exports= {
  MovieInfo
}
