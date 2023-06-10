import express from "express"
import user from "./user.js"
import anggota from "./anggota.js"
import admin from "./admin.js"
import adminMaster from "./adminMaster.js"
import manager from "./manager.js"
import accountOfficer from "./accountOfficer.js"

const router = express.Router()

router.use('/', user)
router.use('/', anggota)
router.use('/', admin)
router.use('/', adminMaster)
router.use('/', manager)
router.use('/', accountOfficer)

export default router