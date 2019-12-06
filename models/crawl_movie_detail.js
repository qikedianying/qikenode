const {Sequelize, Model} = require('sequelize')
const { db } = require('../core/db')

class CrawlMovieDetail extends Model{

}

User.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

}, {
  sequelize: db,
  modelName: 'crawl_movie_detail'
})



module.exports= {
  CrawlMovieDetail
}
