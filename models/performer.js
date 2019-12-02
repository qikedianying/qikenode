const {Sequelize, Model, Op} = require('sequelize')
const { db } = require('../core/db')

class Performer extends Model{
  static async getPerformer(ids) {
    ids = ids.map(item => +item)
    return await Performer.findAll({
      attributes: ['avatar', 'name', 'id'],
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  }
  static async addperformer(data) {
    return await Performer.create({
      name: data.name,
      avatar: data.face[0]
    })
  }

  static async searchByName(key) {
    return await Performer.findAll({
      where: {
        name: {
          [Op.like]: `%${key}%`
        }
      }
    })
  }
}

Performer.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  avatar: Sequelize.STRING,
  name:   Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'performer'
})



module.exports= {
  Performer
}
