const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/", UserController.create);
router.put("/id/:id", UserController.update);
router.delete("/id/:id", UserController.delete);
router.get("/", UserController.getAll);
router.get("/id/:id", UserController.getById);
router.get("/name/:name", UserController.getOneByName);

module.exports = router;
