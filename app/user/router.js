var express = require("express");
var router = express.Router();

const {viewSignin, acctionSignIn, acctionLogout} = require("./controller");

/* GET home page. */
router.get("/", viewSignin);
router.post("/", acctionSignIn);
router.get("/logout", acctionLogout);

module.exports = router;
