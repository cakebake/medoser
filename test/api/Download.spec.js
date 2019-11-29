import request from 'supertest'
import { app } from '@/api'

const id = 'cg0TQyjdHJ0'
const url = `https://www.youtube.com/watch?v=${id}`

describe('Test the /download API path', () => {
  test('It should response for POST', () => {
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
