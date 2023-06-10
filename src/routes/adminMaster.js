import express from "express"
import authentication from "../middlewares/authentication.js"
import { authorizationAdmin } from "../middlewares/authorization.js"
import adminMasterController from "../controllers/adminMasterController.js"

const adminMaster = express.Router()

adminMaster.post('/admin-master', authentication, authorizationAdmin, adminMasterController.createAdminMaster)
adminMaster.get('/admin-master', adminMasterController.getAllAdminMaster)
adminMaster.get('/admin-master/:id', adminMasterController.getAdminMasterById)
adminMaster.put('/admin-master/:id', authentication, authorizationAdmin, adminMasterController.updateAdminMaster)
adminMaster.delete('/admin-master/:id', authentication, authorizationAdmin, adminMasterController.deleteAdminMaster)

export default adminMaster