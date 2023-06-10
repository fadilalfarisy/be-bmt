import express from "express"
import authentication from '../middlewares/authentication.js'
import { authorizationAnggota } from "../middlewares/authorization.js"
import anggotaController from "../controllers/anggotaController.js"

const anggota = express.Router()

anggota.post('/anggota', authentication, authorizationAnggota, anggotaController.createAnggota)
anggota.get('/anggota', anggotaController.getAllAnggota)
anggota.get('/anggota/:id', anggotaController.getAnggotaById)
anggota.put('/anggota/:id', authentication, authorizationAnggota, anggotaController.updateAnggota)
anggota.delete('/anggota/:id', authentication, authorizationAnggota, anggotaController.deleteAnggota)

export default anggota