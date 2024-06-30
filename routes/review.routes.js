const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");

router.post("/", ReviewController.create);
router.get("/", ReviewController.getAll);
router.put("/id/:id", ReviewController.update);
router.delete("/id/:id", ReviewController.delete);
module.exports = router;
