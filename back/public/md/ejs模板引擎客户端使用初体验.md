### 什么是ejs

> ejs全称Embedded Javascript(嵌入式javascript),用来从JSON数据中生成HTML字符串,可以同时运行在客户端和服务器端.

### ejs引用

首先新建一个Index.html文件

然后导入ejs压缩静态js文件

``` javascript
<script src="ejs.min.js"></script>
```

[ejs.min.js下载](https://github.com/845015895/ejs)


### 特性

- `<% %>` 用于控制流

- `<%= %>` 用于转义的输出

- `<%- %>` 用于非转义的输出

- `-%>` 结束标签用于换行移除模式

- 带有`<%_ _%>`的控制流使用空白字符移除模式

- 自定义分隔符 (例如，使用 '`<? ?>`' 代替 '`<% %>`')

- 包含

- 客户端支持

- 中介JavaScript的静态缓存

- 模板的静态缓存

- 与 Express 视图系统兼容

### 使用

在body内写一个js模板,type属性为 `text/x-handlebars-template`,并设置一个id属性

``` javascript

<body>
    <script type="text/x-handlebars-template" id="listTemplate">


    </script>
</body>
```

js模板中可以写入html代码，例如写一个循环列表

``` javascript

<body>
    <script type="text/x-handlebars-template" id="listTemplate">
        <ul>
            <% for(let i=0;i < 10;i++){%>
         <li>i</li>
         <% }%>
        </ul>

    </script>
</body>
```

然后还需要把这个模板渲染为html字符串传递给html元素

例如：
1. 先新建一个div，并设置一个id属性

` <div id="content> </div>`

2. 接下来是在js代码中编写渲染代码
> 引入的ejs.js一定要在js模板渲染之前，否则将会报错ejs未定义

```
<script src="./js/ejs.min.js"></script>
<script>
    let tempText =document.querySelector("#main").innerHTML;
    document.querySelector("#content").innerHTML = ejs.render(tempText);
</script>
```

### 运行页面

![image][img1]


[img1]:data:image/png;base64,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






