const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/ProductosController");

router.post("/", ProductosController.create);
router.put("/id/:id", ProductosController.update);
router.delete("/id/:id", ProductosController.delete);
router.get("/", ProductosController.getAll);
router.get("/id/:id", ProductosController.getById);
router.get("/name/:name", ProductosController.getOneByName);
router.get("/price/:price", ProductosController.getOneByPrice);
router.get("/pedidos", ProductosController.getAllOrders);

module.exports = router;
