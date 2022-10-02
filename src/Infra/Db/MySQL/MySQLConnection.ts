import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

export const MySQLConnection = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,

  connect () {
    return new Sequelize(this.dbName, this.dbUser, this.dbPassword, {
      dialect: 'mysql',
      host: this.dbHost
    })
  }

}
