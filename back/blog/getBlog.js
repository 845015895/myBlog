let express = require('express');
let async = require('async');
let connection = require('../mysql/mysqlConn');
let router = express.Router();
let urlLib = require('url');
let fs = require("fs");
let path = require("path");
let marked = require("marked");
router.get('/', function (req, res) {
    let obj = urlLib.parse(req.url, true);
    const GET = obj.query;
    let title = GET.title;
    let querySql = "select * from blog where name = ? ";
    let article = {};
    async.series([
        function (callback) {
            connection(querySql,title, function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                article.name = result[0].name;
                article.date = result[0].date;
                callback(null);
            })
        },
        function (callback) {
            // fs.readFile(path.join(__dirname, `../public/md/${title}.md`), function (err, result) {
            //     if (err) {
            //         callback(err);
            //         return;
            //     }
            //     article.content = result;
            //     res.json({data: article});
            // })
            fs.readFile(`./public/md/${title}.md`, 'utf8', function(err, data) {
                if (err) {
                    callback(err);
                    return;
                }
                article.content = data;
                res.json({data: article});
            });
        },
    ], function (err) {
        if (err) {
            console.log(err.message);
            res.json({code: 0, message: "服务器错误!"});
        }
    })


});
module.exports = router;
