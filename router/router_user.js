const express = require("express");
const controllers = require("../modules/user/controllers/index");

const router = express.Router();

router.post("/user/register", controllers.register);
router.post("/user/login", controllers.login);

module.exports = router;
