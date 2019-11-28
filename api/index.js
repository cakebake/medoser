import express from 'express'
import info from '@/lib/youtube-dl/info'
// import validator from 'validator'
// import xssFilters from 'xss-filters'

export const app = express()

app.use(express.json())

app.use((request, response, next) => {
  response.removeHeader('X-Powered-By')
  next()
})

app.get('/', (request, response) => {
  response.json({
    'message': 'online'
  })
})

app.post('/info', async (request, response) => {
  try {
    const data = await info(request.body.url)
    response.json({
      message: 'success',
      data,
      error: null
    })
  } catch (error) {
    response.json({
      message: error.message,
      data: null,
      error
    })
  }
})

app.post('/download', (request, response) => {
  response.json({
    'message': 'success',
    'data': request.body
  })
})

export default {
  path: '/api',
  handler: app
}
