const controller = require("../controllers/cep-controller");

const express = require("express");
const router = express.Router();

router.get("/:cep", controller.getByCEP);

module.exports = router;
