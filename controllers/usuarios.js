const {response} = require('express')

const usuariosGet = (req,res=response)=>{
    const {q,nombre,apikey}= req.query;

    res.json({
        msg:'get api -controlador',
        q,
        apikey,
        nombre
    })
}

const usuarioPut = (req,res=response)=>{
    const id = req.params.id;

    res.json({id})
}

const usuarioPost = (req,res=response)=>{
    const {nombre,edad} = req.body;

    res.status(201).json({mes:"ok",nombre,edad})
}

const usuarioDelete = (req,res=response)=>{
    res.json('delete world')
}
module.exports={
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete

}