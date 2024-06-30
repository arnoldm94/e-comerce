const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", authentication, isAdmin, ReviewController.create);
router.get("/", ReviewController.getAll);
router.put("/id/:id", authentication, ReviewController.update);
router.delete("/id/:id", authentication, isAdmin, ReviewController.delete);
module.exports = router;
