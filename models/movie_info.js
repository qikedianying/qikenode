const {Sequelize, Model} = require('sequelize')
const { db }             = require('../core/db')
const {MovieType}        = require('../lib/enum')

class MovieInfo extends Model{

}

MovieInfo.init({
  id: {
    type:          Sequelize.INTEGER,
    primaryKey:    true,
    autoIncrement: true,
  },
  content:         Sequelize.STRING, // 简介
  performer:         Sequelize.STRING, // 演员
  movie_id: Sequelize.INTEGER, //电影id
  comment:    Sequelize.STRING,
  article:    Sequelize.STRING,
  baidu_yun:        Sequelize.STRING,
  extract_code:      Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'movie_info'
})

// La leggenda dei piansita sull'oceano

module.exports= {
  MovieInfo
}
