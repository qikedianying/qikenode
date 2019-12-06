const axios            = require('axios')
const cheerio          = require('cheerio')
const {MovieInfo}      = require('../../models/movie_info')
const {Movie}          = require('../../models/movie')
const {PerformerMovie} = require('../../models/performer_movie')
const {Comment}        = require('../../models/comment')

//http://m.maoyan.com/search?searchtype=movie&$from=canary

class MaoYan {
  constructor (kw) {
    this.url = 'http://m.maoyan.com/ajax/search?cityId=50&stype=-1&kw=' + encodeURIComponent(kw)
  }

  async getMovies () {
    const movies = await axios.get(this.url)
    if (!movies.data.movies) {
      return false
    }
    console.log('-----------------------------------------')
    const target = movies.data.movies.list[0]
    let now = new Date()
    let year = target.pubDesc.split('-')[0]
    if (now.getFullYear() - year < 2) {
      return {
        sc: target.sc,
        name: target.nm,
        img: target.img,
        pubDesc: target.pubDesc,
        id: target.id
      }
    }
  }

  static async getDetail (id) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>')
    console.log(id)
    console.log('<<<<<<<<<<<<<<<<<<<<<<')
    const url = 'https://maoyan.com/films/' + id
    const html = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      },
    })
    const $   = cheerio.load(html.data)
    let info = $($('.movie-brief-container').find('li.ellipsis')[1]).text()
    console.log('beforeupdate', id)
    await Movie.movieUpdateByCrawl({
      english_name: $($('.movie-brief-container').find('.ename')[0]).text(),
      label: $($('.movie-brief-container').find('li.ellipsis')[0]).text(),
      address: info ? info.split('/')[0] : '',
      movie_length: info ? info.split('/')[1]: '',
      movie_id: id
    })
    console.log('afterupdate', id)
    await MovieInfo.movieInfoUpdateByCrawl({
      content: $($('.mod-content').find('.dra')).text(),
      movie_id: id
    })

    let performer = []
    $('.celebrity-list').find('li.celebrity.actor').each((index, item) => {
      performer.push({
        movie_id: id,
        avatar: $($(item).find('img')[0]).attr('data-src'),
        name: $($(item).find('.name')[0]).text(),
        play_row: $($(item).find('.role')[0]).text()
      })
    })
    for (let i = 0; i < performer.length; i++) {
      await PerformerMovie.createDataByCrawl(performer[i])
    }

    let comment = []
    $('.comment-list-container').find('.comment-container ').each((index, item) => {
      comment.push({
        movie_id: id,
        avatar: $($(item).find('.portrait img')[0]).attr('src'),
        name: $($(item).find('.main-header .name')[0]).text(),
        content: $($(item).find('.comment-content')[0]).text()
      })
    })
    for (let i = 0; i < comment.length; i++) {
      await Comment.createCommentByCrawl(comment[i])
    }
  }
}

module.exports = {
  MaoYan
}
