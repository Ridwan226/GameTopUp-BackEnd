var express = require("express");
var router = express.Router();
const {isLoginPlayer} = require("../middleware/auth");

const {landingPage, detailPage, category, checkout} = require("./controller");

/* GET home page. */
router.get("/landingpage", landingPage);
router.get("/category", category);
router.get("/:id/detail", detailPage);
router.post("/checkout", isLoginPlayer, checkout);

module.exports = router;
