const {Sequelize, Model} = require('sequelize')
const { db }             = require('../core/db')

class CrawlMovie extends Model{
  static async getMovieByUrl (url) {
    return await CrawlMovie.findOne({
      where: { crawl_url: url }
    })
  }

  static async getMovieByName (name) {
    return await CrawlMovie.findOne({
      where: { name }
    })
  }

  static async movieUpdate (data) {
    return await CrawlMovie.update(data, {
      where: {
        crawl_url: data.crawl_url
      }
    })
  }
  static async createMovie(data){
    return await CrawlMovie.create(data)
  }
}

CrawlMovie.init({
  type:      Sequelize.INTEGER, // 1 完成 2 可爬 3 不可爬
  name:      Sequelize.STRING,
  face:      Sequelize.STRING,
  pubDesc:   Sequelize.STRING,
  crawl_url: Sequelize.STRING,
  movie_id:  Sequelize.INTEGER,
  score:     Sequelize.FLOAT
}, {
  sequelize: db,
  modelName: 'crawl_movie'
})

module.exports= {
  CrawlMovie
}
