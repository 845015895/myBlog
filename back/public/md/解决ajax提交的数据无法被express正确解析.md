刚接触nodejs小段时间，最近开始用nodejs写接口，前端调用完成一个小小的登录注册，但是在开中发现在ajax提交的数据无法被express正确解析

前端post代码：



``` javascript

//post请求

$.ajax({
    type: "post",
    url:"http://localhost:30000/user/reg",
     data:{
        "user" : `${username}`,
        "pass" : `${password}`
    },
    dataType: "json",
    success: function (result) {
         alert(result.msg);
    }
})

//后台获取数据
let express = require('express');
let app = express();

app.post('/user/reg', function (req, res) {

    let obj = urlLib.parse(req.url, true);
    
    const POST = req.body;
    )

```
这里获取到的req.post是一个空对象

### bodyParser中间件
bodyParser中间件用来解析http请求体，是express默认使用的中间件之一。

使用express应用生成器生成一个网站，它默认已经使用了  bodyParser.json  与  bodyParser.urlencoded  的解析功能，除了这两个，bodyParser还支持对text、raw的解析。

```javascript
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

bodyParser.json是用来解析json数据格式的。

bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： 
```
Content-Type: application/x-www-form-urlencoded 

```

#### 常见的四种Content-Type类型：

- `application/x-www-form-urlencoded`常见的form提交
- `multipart/form-data`文件提交
- `application/json`提交json格式的数据
- `text/xml`提交xml格式的数据


### 详细解读 urlencoded

`bodyParser.urlencoded ` 模块用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}。该模块有一个属性extended，官方介绍如下：

> The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). Defaults to true, but using the default has been deprecated.

大致的意思就是：extended选项允许配置使用querystring(false)或qs(true)来解析数据，默认值是true，但这已经是不被赞成的了。
