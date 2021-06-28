
const {Schema,model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'el nombre es obligatorios']
    },
    correo:{
        type:String,
        required:[true,'el correo es obligatorioa'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'la contraseña  es obligatorioa']
    },
    imagen:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,...usuario} = this.toObject();
    return usuario
}


module.exports = model('Usuario',UsuarioSchema)