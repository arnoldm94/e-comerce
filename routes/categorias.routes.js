const express = require('express')
const router = express.Router()
const CategoriasController = require('../controllers/CategoriasController')

router.post('/', CategoriasController.create);

module.exports = router;