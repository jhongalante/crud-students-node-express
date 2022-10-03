import { MySQLConnection } from '../Infra/Db/MySQL/MySQLConnection'
import dotenv from 'dotenv'
import setupMiddlewares from './Config/Middlewares'
import setupRoutes from './Config/Routes'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from '../../docs/swagger-output.json'

dotenv.config()

MySQLConnection.connect().sync()
  .then(async () => {
    const app = (await import('./Config/App')).default
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
