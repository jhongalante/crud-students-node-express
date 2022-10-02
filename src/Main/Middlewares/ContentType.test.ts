import request from 'supertest'
import app from '../Config/App'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })

  test('Should return content type as xml when forced', async () => {
    app.get('/test-content-type-xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test-content-type-xml')
      .expect('content-type', /xml/)
  })
})
