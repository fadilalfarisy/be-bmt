import express from "express"
import authentication from "../middlewares/authentication.js"
import { authorizationAdmin } from "../middlewares/authorization.js"
import accountOfficerController from "../controllers/accountOfficerController.js"

const accountOfficer = express.Router()

accountOfficer.post('/account-officer', authentication, authorizationAdmin, accountOfficerController.createAccountOfficer)
accountOfficer.get('/account-officer', accountOfficerController.getAllAccountOfficer)
accountOfficer.get('/account-officer/:id', accountOfficerController.getAccountOfficerById)
accountOfficer.put('/account-officer/:id', authentication, authorizationAdmin, accountOfficerController.updateAccountOfficer)
accountOfficer.delete('/account-officer/:id', authentication, authorizationAdmin, accountOfficerController.deleteAccountOfficer)

export default accountOfficer