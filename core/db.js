const Sequelize = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  loggin: true, // 显示原始sql操作
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createAt: 'create_at',
    updateAt: 'update_at',
    deleteAt: 'delete_at',
    underscored: true
  }
})
sequelize.sync({
  force: false
})

module.exports = {
  db: sequelize
}

