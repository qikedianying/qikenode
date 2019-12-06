const cheerio = require('cheerio')
const iconv   = require('iconv-lite')
const https   = require('https')

class YangGuang {
  constructor () {
    this.url = 'https://www.ygdy8.com/index.html'
  }
  getMovieName () {
    return new Promise((resolve, reject) => {
      https.get(this.url, res => {
        let chunks = []
        res.on('data', chunk => {
          chunks.push(chunk)
        })

        res.on('end', res => {
          try {
            let html   = iconv.decode(Buffer.concat(chunks), 'gb2312')
            let $      = cheerio.load(html)
            let result = []
            $('.co_content2').find('a').each((index, item) => {
              const text = $(item).text()
              const url  = $(item).attr('href')
              if (text) {
                let data = text.split('《')[1]
                if (data) {
                  let name = data.split('》')[0]
                  result.push({
                    name,
                    url
                  })
                }
              }
            })
            resolve(result)
          } catch (e) {
            console.log(e)
          }
        })
      })
        .on('error', err => {
          reject(err)
        })
    })
  }

  static getFtpSrc (url) {
    let targetUrl = 'https://www.ygdy8.com' + url
    return new Promise((resolve, reject) => {
      https.get(targetUrl, res => {
        let chunks = []
        res.on('data', chunk => {
          chunks.push(chunk)
        })

        res.on('end', res => {
          try {
            let html   = iconv.decode(Buffer.concat(chunks), 'gb2312')
            let $      = cheerio.load(html)
            // console.log(html)
            const face = $($('#Zoom').find('img')[0]).attr('src')
            $('table').find('a').each((index, item) => {
              // console.log($(item).text())
              let ftp = $(item).text()
              if (ftp.startsWith('ftp://')) {
                console.log(ftp)
                resolve({
                  ftp, face
                })
              }
            })
            // let result = []
            // resolve(result)
          } catch (e) {
            reject(e)
          }
        })
      })
        .on('error', err => {
          reject(err)
        })
    })
  }
}

module.exports = {
  YangGuang
}
