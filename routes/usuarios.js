const { Router} = require('express')
const { usuariosGet,usuarioPost,usuarioPut, usuarioDelete } = require('../controllers/usuarios')
const router = Router()

router.get("/",usuariosGet)
router.put("/:id",usuarioPut)
router.post("/",usuarioPost)
router.delete("/",usuarioDelete)

module.exports= router