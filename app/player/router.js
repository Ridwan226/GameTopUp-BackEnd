var express = require("express");
var router = express.Router();

const {landingPage, detailPage, category} = require("./controller");

/* GET home page. */
router.get("/landingpage", landingPage);
router.get("/category", category);
router.get("/:id/detail", detailPage);

module.exports = router;
