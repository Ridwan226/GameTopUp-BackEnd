var express = require("express");
var router = express.Router();

const {viewSignin, acctionSignIn} = require("./controller");

/* GET home page. */
router.get("/", viewSignin);
router.post("/", acctionSignIn);

module.exports = router;
