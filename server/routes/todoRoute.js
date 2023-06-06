const express = require("express");
const router = express.Router();
const cors = require("cors");

const controller = require("../controllers/todoController");

router.get("/", cors(), controller.get);

router.post("/new", cors(), controller.post);

router.delete("/delete/:id", cors(), controller.delete);

router.post("/complete/:id", cors(), controller.post);

module.exports = router;
