const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/ProductosController");

router.post("/", ProductosController.create);

module.exports = router;