
const express = require('express')
const cors = require('cors')
const {dbConection} = require('../database/config')
class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath='/api/usuarios'

        //conectar a base de datos
        this.conectarDB()

        //midedlewares
        this.middlewares()


        //rutas de aplicacion
        this.routes()
    }

    async conectarDB(){
        await dbConection();

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