let urlLib = require('url');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let path = require("path");
let blog = require("./blog/blog")
let login = require("./login/login")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//设置跨距
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, POST, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.use("/api/blog",blog);//用户接口
app.use("/api/login",login);//登录接口
// app.use("/api/weibo",weibo);//微博接口


// app.post('/user/log', function (req, res) {
//     // 输出 JSON 格式
//     //  response.end(JSON.stringify(data));
//     // let obj = urlLib.parse(req.url, true);
//     // const POST = obj.query;
//     let querySql = "select userId,password,username from user where userNum = ?";
//     const POST = req.body;
//     let userNum = POST.userNum;
//     let password = POST.password;
//     let queryParams = [userNum];
//     connection.query(querySql, queryParams, function (err, result) {
//         try {
//             if (result[0].password === password) {
//                 res.json({result: true, userId: result[0].userId});
//             } else {
//                 res.json({result: false, userNum: true, password: false});
//             }
//         }
//         catch (err) {
//             console.log('[SELECT ERROR] - ', err.message);
//             res.json({result: false, userNum: false});
//         }
//
//         // if (result.affectedRows) {
//         //     res.json({result: true,username:POST.regUsername,phone:POST.regPhone});
//         // }else{
//         //     res.json({result: false});
//         // }
//
//     });
// });
//
//
// app.get('/weibo/list', function (req, res) {
//     let obj = urlLib.parse(req.url, true);
//     let queryAllSql = "select u.username,w.wContent,w.wDate from user as u,weibo as w where w.uId = u.uId order by w.wId desc";
//     const GET = obj.query;
//     if (GET.isLogin) {
//         connection.query(queryAllSql, function (err, result) {
//             try {
//                 res.json(result);
//             }
//             catch (err) {
//                 console.log('[SELECT ERROR] - ', err.message);
//             }
//         })
//     } else {
//         res.json("未登录");
//     }
//
// });



//配置服务端口
let server = app.listen(8000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});




