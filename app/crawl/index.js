const {YangGuang}  = require('./yangGuang')
const {CrawlMovie} = require('../../models/crawl_movies')
const {MaoYan}     = require('./maoyan')
const {MovieInfo}  = require('../../models/movie_info')
const {Movie}      = require('../../models/movie')

const yangGuang    = new YangGuang()

const saveMovie = async () => {
  try {
    const movieNames = await yangGuang.getMovieName()
    for (let i = 0; i < movieNames.length; i++) {
      // 先获取 入过不存在 或者已查询过低分 直接下一个
      let crawlMovie = await CrawlMovie.getMovieByUrl(movieNames[i].url)
      if (crawlMovie) {
        console.log(111, crawlMovie.dataValues)
      } else {
        console.log(1, crawlMovie)
      }

      if (!crawlMovie) {
        await CrawlMovie.createMovie({
          crawl_url : movieNames[i].url,
        })
      }
      console.log(2);
      if (crawlMovie && crawlMovie.dataValues.type) {
        continue
      }

      // console.log(movieNames[i]);
      const maoYan = new MaoYan(movieNames[i].name)
      const data   = await maoYan.getMovies()
      console.log(data)
      if (!data) {
        continue
      }
      crawlMovie   = await CrawlMovie.getMovieByName(data.name)

      console.log(4, crawlMovie);
      if (crawlMovie) {
        continue
      }

      let type = 3
      if ((data.sc - 0) > 8.5) {
        type = 2
        if (!data.id) {
          continue
        }
        await Movie.movieCreateByCrawl({
          type:  2,
          likes: 0,
          face:     data.img,
          name:     data.name,
          score:    data.sc,
          pub_desc: data.pubDesc,
          movie_id: data.id
        })
        console.log('--------------')
        console.log(data.id)
        console.log('==============')
        await MaoYan.getDetail(data.id)
        let ftp = await YangGuang.getFtpSrc(movieNames[i].url)
        await MovieInfo.movieInfoUpdateByCrawl({
          movie_id: data.id,
          ftp_url:  ftp.ftp
        })
        await Movie.movieUpdateByCrawl({
          face: ftp.face,
          movie_id: data.id
        })
      }
      await CrawlMovie.movieUpdate({
        type,
        crawl_url: movieNames[i].url,
        name:     data.name,
        score:    data.sc,
        pubDesc:  data.pubDesc,
        face:     data.img,
        movie_id: data.id
      })
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  saveMovie
}
