import express from "express"
import authentication from "../middlewares/authentication.js"
import { authorizationAdmin } from "../middlewares/authorization.js"
import adminController from "../controllers/adminController.js"

const admin = express.Router()

admin.post('/admin', authentication, authorizationAdmin, adminController.createAdmin)
admin.get('/admin', adminController.getAllAdmin)
admin.get('/admin/:id', adminController.getAdminById)
admin.put('/admin/:id', authentication, authorizationAdmin, adminController.updateAdmin)
admin.delete('/admin/:id', authentication, authorizationAdmin, adminController.deleteAdmin)

export default admin