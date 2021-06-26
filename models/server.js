
const express = require('express')
const cors = require('cors')
class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath='/api/usuarios'
        //midedlewares
        this.middlewares()


        //rutas de aplicacion
        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        //parseo y lectura de body
        this.app.use(express.json())
        //rendirizar publicos 
        this.app.use(express.static('public'))

    }

    routes(){
      this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port)
    }
}

module.exports = Server