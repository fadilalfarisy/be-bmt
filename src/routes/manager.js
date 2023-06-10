import express from "express"
import authentication from "../middlewares/authentication.js"
import { authorizationAdmin } from "../middlewares/authorization.js"
import managerController from "../controllers/managerController.js"

const manager = express.Router()

manager.post('/manager', authentication, authorizationAdmin, managerController.createManager)
manager.get('/manager', authentication, authorizationAdmin, managerController.getAllManager)
manager.get('/manager/:id', authentication, authorizationAdmin, managerController.getManagerById)
manager.put('/manager/:id', authentication, authorizationAdmin, managerController.updateManager)
manager.delete('/manager/:id', authentication, authorizationAdmin, managerController.deleteManager)

export default manager