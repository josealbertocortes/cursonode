const { Router} = require('express')
const { check } = require('express-validator')
const { usuariosGet,usuarioPost,usuarioPut, usuarioDelete } = require('../controllers/usuarios')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')
const {validarCampos} = require('../middlewares/validar-campos')
const Role = require('../models/role')
const router = Router()

router.get("/",usuariosGet)
router.put("/:id",[
    check('id','no es una id valido ').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuarioPut)
router.post("/",[
    check('correo','el valor ingresado no es correo').isEmail(),
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el passrword debe ser mas de 6 letes ').isLength({min:6}),
    // check('rol','no es un rol valido ').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExiste),
    validarCampos
],usuarioPost)
router.delete("/:id",[
    check('id','no es una id valido ').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
]
,usuarioDelete)

module.exports= router