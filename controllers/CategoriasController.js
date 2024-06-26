const { Categorias } = require('../models/index')

const CategoriasController = {
 create(req, res) {
   Categorias.create(req.body)
     .then((categorias) => 
       res.status(201).send({message:"categoria creada", categorias})
     )
     .catch((err) => console.error(err))
 }
}

module.exports = CategoriasController