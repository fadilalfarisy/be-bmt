import jwt from 'jsonwebtoken'
import config from '../config/db.js';

const {
  MAX_AGE_ACCESS_TOKEN,
  MAX_AGE_REFRESH_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN } = config

//generate access JWT token contain id and role 
const createAccessToken = ({ id, role }) => {
  return jwt.sign({ id, role }, ACCESS_TOKEN, { expiresIn: MAX_AGE_ACCESS_TOKEN });
}

//generate refresh JWT token contain id and role
const createRefreshToken = ({ id, role }) => {
  return jwt.sign({ id, role }, REFRESH_TOKEN, { expiresIn: MAX_AGE_REFRESH_TOKEN });
}

//verify access JWT token
const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN, (error, decoded) => {
    if (error) return { error, decoded: null }
    return { error: null, decoded }
  })
}

//verify refresh JWT token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN, (error, decoded) => {
    if (error) return { error, decoded: null }
    return { error: null, decoded }
  })
}

export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
}