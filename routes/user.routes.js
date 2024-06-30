const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");

router.post("/", UserController.create);
router.put("/id/:id", authentication, UserController.update);
router.delete("/id/:id", authentication, UserController.delete);
router.get("/", authentication, UserController.getAll);
router.get("/id/:id", UserController.getById);
router.get("/name/:name", UserController.getOneByName);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
