let express = require("express");
let router = express.Router();
let indexController = require("../controllers/index.server.controllers");
router.get("/", indexController.index);
module.exports = router;
