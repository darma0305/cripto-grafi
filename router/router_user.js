const express = require("express");
const controllers = require("../modules/user/controllers/index");

const router = express.Router();

router.post("/user/register", controllers.register);

module.exports = router;
