import express from 'express'
// import validator from 'validator'
// import xssFilters from 'xss-filters'

const app = express()

app.use(express.json())

app.use((request, response, next) => {
  response.removeHeader('X-Powered-By')
  next()
})

app.get('/', (request, response) => {
  response.status(200).json({
    'message': 'online'
  })
})

app.post('/', (request, response) => {
  response.status(200).json({
    'message': 'success',
    'data': request.body
  })
})

export default {
  path: '/api',
  handler: app
}
