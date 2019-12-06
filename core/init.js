const Router = require('koa-router')
const requireDirectory = require('require-directory')
const {saveMovie} = require('../app/crawl/index')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadConfig()
    // saveMovie()
    setInterval(() => {
      let now = new Date()
      if (now.getHours() < 8) {
        saveMovie()
      }
    }, 1000 * 60 *60 * 7)
  }

  static initLoadRouters () {
    const whenLoadModule = (obj) => {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }

    const apiDirectory = `${process.cwd()}/app/router`
    requireDirectory(module, apiDirectory, {visit: whenLoadModule})
  }

  static loadConfig (path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
}
module.exports = InitManager
