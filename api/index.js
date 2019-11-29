import express from 'express'
import { get, isEmpty } from 'lodash'
import info from '../lib/youtube-dl/info'
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
    const url = get(request, 'body.url', null)
    if (isEmpty(url)) {
      throw new Error('Parameter "url" is required')
    }
    const data = await info(url)
    response.json({
      message: 'success',
      data,
      error: null
    })
  } catch (error) {
    response.json({
      message: get(error, 'stderr', error.message),
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
