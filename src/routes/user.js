import express from "express"
import userController from "../controllers/userController.js"

const user = express.Router()

user.post('/login', userController.login)

user.get('/logout', userController.logout)

user.get('/refresh', userController.checkRefreshToken)

export default user