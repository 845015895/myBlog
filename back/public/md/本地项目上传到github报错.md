#### 本地项目上传到github 报错“master -> master (non-fast-forward)”


1. 第一步：建立git仓库

> cd到你的本地项目根目录下，执行git命令，此命令会在当前目录下创建一个.git文件夹。

```
git init

```

2. 第二步：将项目的所有文件添加到仓库中

```
git add .
```

> 这个命令会把当前路径下的所有文件，添加到待上传的文件列表中。

> 如果想添加某个特定的文件，只需把.换成特定的文件名即可

3. 第三步：将add的文件commit到仓库

```
git commit -m "注释语句"
```

4. 第四步去创建自己的远程仓库 例如github

5.拿到创建的仓库地址，将本地仓库与之关联

```
git remote add origin https://yizicheng.cn/自己的仓库url地址
```
6. 上传代码到github远程仓库

```
git push -u origin master
```

执行完后，如果没有异常，等待执行完就上传成功了

第一次上传有可能会遇到push失败的情况，那是因为跟SVN一样，github上有一个README.md 文件没有下载下来 。

我们得先

```
git pull --rebase origin master 
```

然后再执行

```
git push -u origin master
```
就成功啦