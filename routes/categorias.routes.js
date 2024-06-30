const express = require("express");
const router = express.Router();
const CategoriasController = require("../controllers/CategoriasController");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", authentication, isAdmin, CategoriasController.create);
router.get("/id/:id", CategoriasController.getById);
router.delete("/id/:id", authentication, isAdmin, CategoriasController.delete);
router.put("/id/:id", authentication, isAdmin, CategoriasController.update);
router.get("/name/:name", CategoriasController.getByName);
router.get("/", CategoriasController.getAll);

module.exports = router;
