const express = require("express");
const router = express.Router();
const PedidosController = require("../controllers/PedidosController");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", authentication, PedidosController.create);
router.get("/productos", authentication, isAdmin, PedidosController.getAll);
router.put("/id/:id", authentication, isAdmin, PedidosController.update);

module.exports = router;
