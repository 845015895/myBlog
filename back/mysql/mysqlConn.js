let mysql = require('mysql');

let pool = mysql.createPool({
    host: '202.182.110.46',
    user: 'root',
    password: 'yizicheng',
    database: 'myBlog',
    port: 3306
});
let connection=function(sql,sqlParams,callback){
    callback ||	console.error(sql);
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err);
            callback ? callback(err) : console.log(sql);
        }else{
            conn.query(sql,sqlParams,function(qErr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback ? callback(qErr,vals,fields):console.log(sql);
            });
        }
    });
};

module.exports = connection;
