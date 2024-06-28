const express = require("express");
const router = express.Router();
const PedidosController = require("../controllers/PedidosController");

router.post("/", PedidosController.insert);
router.get("/", PedidosController.getAll);

module.exports = router;
