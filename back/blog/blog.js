let express = require('express');
let router = express.Router();

let getInfo = require("./getInfo");
let getList = require("./getList");
let getBlog = require("./getBlog");


router.use("/getInfo",getInfo);
router.use("/getList",getList);
router.use("/getBlog",getBlog);


module.exports = router;
