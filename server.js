import bodyParser from 'body-parser'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './src/config/db.js'
import router from './src/routes/index.js'

const app = express()

const { PROD_FRONT_END_ORIGIN, LOCAL_FRONT_END_ORIGIN, PORT } = config

//middleware
app.use(cors({
  credentials: true,
  origin: [PROD_FRONT_END_ORIGIN, LOCAL_FRONT_END_ORIGIN]
}))
app.use(cookieParser()); //allow to access cookie
app.use(bodyParser.urlencoded({ extended: false })) //allow request with format x-www-form-urlencoded
app.use(bodyParser.json()) //allow request with format json

//api
app.use(router)
app.get('/', (req, res) => {
  res.status(200).json({
    code: 200,
    status: 'OK',
    data: {
      message: 'server running'
    }
  })
})
app.get('*', (req, res) => {
  res.status(404).json({
    code: 404,
    status: 'NOT_FOUND',
    errors: [{ path: 'invalid path' }]
  })
})

//error handlers
app.use((err, req, res, next) => {
  console.log(err.message);
  const code = err.code || 500
  const errors = err.errors
  let status = 'INTERNAL_SERVER_ERROR'
  switch (code) {
    case 400:
      status = 'BAD_REQUEST'
      break
    case 401:
      status = 'UNAUTHORIZED'
      break
    case 403:
      status = 'FORBIDDEN'
      break
    case 404:
      status = 'NOT_FOUND'
      break
  }
  res.status(code).json({
    code,
    status,
    errors
  });
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))