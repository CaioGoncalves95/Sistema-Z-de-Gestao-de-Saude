const controller = require("../controllers/user-controller");

const express = require("express");
const router = express.Router();

router.get("/", controller.get);
router.post("/", controller.createUser);
router.post("/login", controller.login);
router.get("/checkProntuary/:prontuary", controller.checkProntuary);

module.exports = router;
