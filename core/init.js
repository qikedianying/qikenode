const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore (app) {
    console.log(app)
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadConfig()
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
