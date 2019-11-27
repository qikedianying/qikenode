const {Sequelize, Model, Op} = require('sequelize')
const { db } = require('../core/db')

class Performer extends Model{
  static async getPerformer(ids) {
    ids = ids.map(item => +item)
    console.log(ids)
    return await Performer.findAll({
      attributes: ['avatar', 'name', 'id'],
      where: {
        id: {
          [Op.in]: ids
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
