const express = require("express");
const router = express.Router();
const PedidosController = require("../controllers/PedidosController");

router.post("/", PedidosController.create);
router.get("/productos", PedidosController.getAll);

module.exports = router;
