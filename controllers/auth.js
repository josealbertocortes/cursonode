const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleverify } = require('../helpers/google-verify');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
      
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}

const googleSignIn = async(req,res=response)=>{

    const {id_token}= req.body;
    try{
    const {correo,nombre,img}= await googleverify(id_token)

        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            //tengo que crear usuario 
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google:true
            }
            usuario = new Usuario(data);
            await usuario.save()
        }
        //si el suuario en DB 
        if(!usuario.estado){
            return res.status(401).json({
                msg:"hable con el administrador usuario sin permisos "
            })
        }
         // Generar el JWT
         const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    }catch(err){
        res.status(400).json({
            msg:'token no es reconociodo'
        })

    }

}



module.exports = {
    login,
    googleSignIn
}
