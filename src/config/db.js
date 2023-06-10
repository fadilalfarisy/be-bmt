import dotenv from "dotenv"
dotenv.config()

const config = {
  USER: process.env.USER || 'root',
  DB: process.env.DB || 'bmt',
  PASSWORD: process.env.PASSWORD || '',
  HOST: process.env.HOST || '127.0.0.1',
  DIALECT: process.env.DIALECT || 'mysql',
  PORT: process.env.PORT || 3000,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'qwibu87ewbot4t8oebgw4',
  REFRESH_TOKEN: process.env.REFRESH_TOKEN || '3g8ip32t794tbgou4gt80',
  MAX_AGE_ACCESS_TOKEN: process.env.MAX_AGE_ACCESS_TOKEN || '1m',
  MAX_AGE_REFRESH_TOKEN: process.env.MAX_AGE_REFRESH_TOKEN || '10m',
  LOCAL_FRONT_END_ORIGIN: process.env.FRONT_END_ORIGIN || 'http://localhost:5173',
  PROD_FRONT_END_ORIGIN: process.env.FRONT_END_ORIGIN || 'https://bmt-web.netlify.app',
}

export default config