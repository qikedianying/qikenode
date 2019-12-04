const cheerio = require('cheerio')
const iconv   = require('iconv-lite')
const https   = require('https')
const axios   = require('axios')

// const targetUrl = 'https://www.imooc.com/'
const targetUrl = 'https://www.dytt8.net/index0.html'
const target = ['中国机长', '杀手']

const main = async () => {
  https.get(targetUrl, (res) => {
    let chunks = []

    res.on('data', function(chunk) {
      chunks.push(chunk)
    })

    res.on('end', function(res) {
      let html = iconv.decode(Buffer.concat(chunks),'gb2312')
      let $ = cheerio.load(html)
      let result = []
      $('.co_content2').find('a').each((index, item) => {
        const text = $(item).text()
        console.log(text)
        target.forEach(t => {
          if (text.indexOf(t) !== -1) {

            // result.push($(item).attr('href'))
            result.push(text)
          }
        })

      })
      console.log(result)
    })

  }).on('error', function(err) {
    console.log(err)
  })
}

const mao = async () => {
  const html = await axios.get('https://maoyan.com/query?kw=%E4%B8%AD%E5%9B%BD%E6%9C%BA%E9%95%BF')
  console.log(html)
}

main()


mao()










// 确定目标 要爬取哪个网站
// 分析目标 url格式 数据格式 网页编码
// 编写代码
// 执行爬虫
