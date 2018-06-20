let express = require('express');
let router = express.Router();

let getInfo = require("./getInfo");
let getList = require("./getList");
let getBlog = require("./getBlog");
let upload = require("./upload");


router.use("/getInfo",getInfo);
router.use("/getList",getList);
router.use("/getBlog",getBlog);
router.use("/upload",upload);


module.exports = router;
