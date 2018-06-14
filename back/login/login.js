let express = require('express');
let connection = require('../mysql/mysqlConn');
let router = express.Router();
router.post('/', function (req, res) {
    // 输出 JSON 格式
    //  response.end(JSON.stringify(data));
    // let obj = urlLib.parse(req.url, true);
    // const POST = obj.query;
    let querySql = "select password from blogInfo where username = ?";
    const POST = req.body;
    let username = POST.username;
    let password = POST.password;
    console.log(username);
    connection(querySql, username, function (err, result) {
        try {
            if (result[0].password === password) {
                res.json({code: 1 ,data: "success"});
            } else {
                res.json({code: 0 ,data: "defeat"});
            }
        }
        catch (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.json({result: false, userNum: false});
        }

    });
});
module.exports = router;