import request from 'supertest'
import { app } from '@/api'

const id = 'cg0TQyjdHJ0'
const url = `https://www.youtube.com/watch?v=${id}`

describe('Test the /info API path', () => {
  test('It should response OK', async () => {
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
  test('It should response error for wrong url', async () => {
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
  test('It should response error for missing required form params', async () => {
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
})
