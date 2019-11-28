import request from 'supertest'
import { app } from '@/api'

const url = 'http://test.tld/'

describe('Test the root path', () => {
  test('It should response for GET / with message = online', async () => {
    const response = await request(app).get('/')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'online'
      })
    expect(response.header).not.toHaveProperty('X-Powered-By')
  })
  test('It should response for POST /info', () => {
    const data = {
      url
    }
    return request(app).post('/info')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'success',
        data
      })
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
