const express = require("express");
const router = express.Router();
const CategoriasController = require("../controllers/CategoriasController");

router.post("/", CategoriasController.create);
router.get("/id/:id", CategoriasController.getById);
router.delete("/id/:id", CategoriasController.delete);
router.put("/id/:id", CategoriasController.update);
router.get("/name/:name", CategoriasController.getByName);
router.get("/", CategoriasController.getAll);

module.exports = router;
