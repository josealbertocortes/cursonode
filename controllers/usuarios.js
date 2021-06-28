const {response} = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');


const usuariosGet = async (req,res=response)=>{
    //const {q,nombre,apikey}= req.query;
    const {limite=5,desde=0} = req.query
    const [total,usuarios] = await  Promise.all([Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({    
    total,
    usuarios
    })
}

const usuarioPut = async (req,res=response)=>{
    const id = req.params.id;
    const {_id,password,google,...resto} = req.body;

    //validar contra base de datos 
    if(password){

    //encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password,salt)
    
    }


    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.json({id,
    usuario})
}

const usuarioPost = async(req,res=response)=>{

 

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    //verificar si el correo existe


    //encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt)

    //guardar en base de datos 
    await usuario.save();



    res.status(201).json({mes:"ok",
    usuario
})
}

const usuarioDelete = async (req,res=response)=>{
    const {id}= req.params;
    //fiscamente se borra
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

    res.json({
        usuario
    })
}
module.exports={
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete

}