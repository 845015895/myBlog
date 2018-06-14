let express = require('express');
let async = require('async');
let connection = require('../mysql/mysqlConn');
let router = express.Router();
router.get('/', function (req, res) {
    let queryCount = "select * from blog order by date desc";
    async.series([
        function (callback) {
            connection(queryCount,"", function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                res.json({data: result});
            })
        },
    ], function (err) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.json({code: 0, message: "服务器错误!"});
        }
    })


});
module.exports = router;
