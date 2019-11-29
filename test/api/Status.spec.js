import request from 'supertest'
import { app } from '@/api'

describe('Test the / API path', () => {
  test('It should response Status OK', async () => {
    const response = await request(app).get('/')
      .expect('Content-Type', /json/)
      .expect(200, {
        success: true,
        message: 'online'
      })
    expect(response.header).not.toHaveProperty('X-Powered-By')
  })
  test('It should response correct headers', async () => {
    const response = await request(app).get('/')
      .expect('Content-Type', /json/)
    expect(response.header).not.toHaveProperty('X-Powered-By')
  })
})
