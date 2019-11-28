import request from 'supertest'
import { app } from '@/api'

const id = 'cg0TQyjdHJ0'
const url = `https://www.youtube.com/watch?v=${id}`

describe('Test the root path', () => {
  test('It should response for GET / with message = online', async () => {
    const response = await request(app).get('/')
      .expect('Content-Type', /json/)
      .expect(200, {
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
    expect(body.message).toBe('success')
    expect(body.data.id).toBe(id)
    expect(body.error).toBe(null)
  })
  test('It should response error for failed POST /info', async () => {
    const { body } = await request(app).post('/info')
      .send({
        url: 'somethingwrong'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(body.message).not.toBe('success')
    expect(body.data).toBe(null)
    expect(body.error).not.toBe(null)
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
        message: 'success',
        data
      })
  })
})
