const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/ProductosController");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", authentication, isAdmin, ProductosController.create);
router.put("/id/:id", authentication, isAdmin, ProductosController.update);
router.delete("/id/:id", authentication, isAdmin, ProductosController.delete);
router.get("/", ProductosController.getAll);
router.get("/id/:id", ProductosController.getById);
router.get("/name/:name", ProductosController.getOneByName);
router.get("/price/:price", ProductosController.getOneByPrice);
router.get("/pedidos", authentication, isAdmin, ProductosController.getAllOrders);
router.get("/byprice", ProductosController.getdescendent);

module.exports = router;
