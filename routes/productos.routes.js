const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/ProductosController");

router.post("/", ProductosController.create);
router.put('/id/:id', ProductosController.update);
router.delete('/id/:id', ProductosController.delete);
router.get('/', ProductosController.getAll);

module.exports = router;