import { DataTypes } from 'sequelize'
import { MySQLConnection } from '../../Infra/Db/MySQL/MySQLConnection'

export const UserModel = MySQLConnection.connect().define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})
