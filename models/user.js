const {Sequelize, Model} = require('sequelize')
const { db } = require('../core/db')

class User extends Model{
  static async createUser (data) {
    return await User.create(data)
  }

  static async getUser (openid) {
    return await User.findOne({
      where: {
        openid
      }
    })
  }
}

User.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  openid: Sequelize.STRING,
  unionid: Sequelize.STRING,
  phone: Sequelize.STRING,
  nike_name: Sequelize.STRING,
  face: Sequelize.STRING,
  province: Sequelize.STRING,
  city: Sequelize.STRING,
  gender: Sequelize.INTEGER // 1 男 2 女
}, {
  sequelize: db,
  modelName: 'user'
})



module.exports= {
  User
}
