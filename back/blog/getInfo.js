let express = require('express');
let async = require('async');
let connection = require('../mysql/mysqlConn');
let router = express.Router();
router.get('/', function (req, res) {
    let queryAllSql = "select * from blogInfo";
    let queryCount = "select count(*) as count from blog";
    let temp = {};
    async.series([
        function (callback) {
            connection(queryAllSql,"", function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                temp = result[0];
                callback(null);
            })
        },
        function (callback) {
            connection(queryCount,"", function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                temp.count = result[0].count;
                res.json({data: temp});
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
