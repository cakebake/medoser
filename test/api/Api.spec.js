import request from 'supertest'
import { app } from '@/api'

const id = 'cg0TQyjdHJ0'
const url = `https://www.youtube.com/watch?v=${id}`

describe('Test the root path', () => {
  test('It should response for GET / with message = online', async () => {
    const response = await request(app).get('/')
      .expect('Content-Type', /json/)
      .expect(200, {
        success: true,
        message: 'online'
      })
    expect(response.header).not.toHaveProperty('X-Powered-By')
  })
  test('It should response for POST /info', async () => {
    const { body } = await request(app).post('/info')
      .send({
        url
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(body.success).toBeTruthy()
    expect(body).toHaveProperty('message')
    expect(body).toHaveProperty('data.id', id)
  })
  test('It should response error for failed POST /info', async () => {
    const { body } = await request(app).post('/info')
      .send({
        url: 'somethingwrong'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
    expect(body.success).toBeFalsy()
    expect(body).toHaveProperty('message')
    expect(body.data).toBeNull()
  })
  test('It should response error for missing form params on POST /info', async () => {
    const { body } = await request(app).post('/info')
      .send({
        hello: 'hello'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    expect(body.success).toBeFalsy()
    expect(body).toHaveProperty('message')
    expect(body.data).toBeNull()
  })
  test('It should response for POST /download', () => {
    const data = {
      url
    }
    return request(app).post('/download')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        success: true,
        message: 'success',
        data
      })
  })
})
