import { DataTypes } from 'sequelize'
import { MySQLConnection } from '../../Infra/Db/MySQL/MySQLConnection'

export const StudentModel = MySQLConnection.connect().define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  academicRecord: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  }
})
