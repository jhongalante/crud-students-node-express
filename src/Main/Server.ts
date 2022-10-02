import { MySQLConnection } from '../Infra/Db/MySQL/MySQLConnection'
import dotenv from 'dotenv'
import express from 'express'
import setupMiddlewares from './Config/Middlewares'
import setupRoutes from './Config/Routes'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from '../../docs/swagger-output.json'

dotenv.config()
const app = express()

MySQLConnection.connect().sync()
  .then(async () => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
    setupMiddlewares(app)
    setupRoutes(app)
    app.listen(process.env.port, () =>
      console.log(`Server running at http://localhost:${process.env.port}`)
    )
    console.log(`Synced db :: ${process.env.DB_NAME}`)
  })
  .catch((error) => {
    console.log(`Failed to sync db: ${error as string}`)
  })
