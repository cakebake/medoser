import express from 'express'
import { get, isEmpty } from 'lodash'
import { info } from '../lib/youtube-dl/info'
// import validator from 'validator'
// import xssFilters from 'xss-filters'

export const app = express()

app.use(express.json())

app.use((request, response, next) => {
  response
    .removeHeader('X-Powered-By')
  next()
})

app.get('/', (request, response) => {
  response
    .status(200)
    .json({
      success: true,
      message: 'online'
    })
})

app.post('/info', async (request, response) => {
  let status = 200
  try {
    const url = get(request, 'body.url', null)
    if (isEmpty(url)) {
      status = 400
      throw new Error('Parameter "url" is required')
    }
    const data = await info(url)
    response
      .status(status)
      .json({
        success: true,
        message: `Information for ${url} has been determined`,
        data
      })
  } catch (error) {
    if (status !== 400) {
      status = 500
    }
    response
      .status(status)
      .json({
        success: false,
        message: get(error, 'stderr', error.message),
        data: null
      })
  }
})

app.post('/download', (request, response) => {
  response
    .status(200)
    .json({
      success: true,
      message: 'success',
      data: request.body
    })
})

export default {
  path: '/api',
  handler: app
}
