const {Sequelize, Model} = require('sequelize')
const { db }             = require('../core/db')
const {MovieType}        = require('../lib/enum')

class MovieInfo extends Model{
  static async getMovieInfoById(movieId) {
    const movieInfo = await MovieInfo.findOne({
      attributes: ['content', 'performer', 'comment', 'article', 'baidu_yun', 'extract_code'],
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
}

MovieInfo.init({
  id: {
    type:          Sequelize.INTEGER,
    primaryKey:    true,
    autoIncrement: true,
  },
  content:      Sequelize.STRING, // 简介
  performer:    Sequelize.STRING, // 演员
  movie_id:     Sequelize.INTEGER, //电影id
  comment:      Sequelize.STRING, // 评论
  article:      Sequelize.STRING, // 文章
  baidu_yun:    Sequelize.STRING, // 百度云地址
  extract_code: Sequelize.STRING // 百度云密码
}, {
  sequelize: db,
  modelName: 'movie_info'
})

module.exports= {
  MovieInfo
}
