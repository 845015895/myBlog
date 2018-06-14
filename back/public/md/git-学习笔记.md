
###	1.认识git

-	在学校的时候听说过git，和SVN的大致类型是一样的，都是版本管理系统，以前使用过SVN，SVN是一种集中式的版本管理系统，但是在了解了git之后，就觉得，git真的是一个很洋气的分布式版本控制系统。

-	在看了大致的讲解后，让我想到了一个平时一个有点让人头疼的事：在前一天自己写好的一个版本的网站，然后到第二天的时候，突然有个灵感，觉得某个地方可以进行修改，但是这时候并不能保证这个修改是否可以正常运行。所以这时候我的做法是把原来的版本先拷贝出来，以时间命名备份。然后再进行修改。

-	以前的做法肯定是可行的，但是如果修改的次数多了，就会发现自己已经默默地备份了很多的版本，这种做法难免觉得有些呆笨，就象这样


	![img](../images/img1.png)

-	而在了解后，发现git完美的解决了这个问题，不仅能够很好的控制版本，而且还能很好地记录某一个版本的修改记录和时间

| 版本        | 修改者    |  说明  |  时间  |
    | --------   | -----:   | :----: |
    | 1.0        | 易子程   |  修改了信息１ |　2017-7-17 10:00|
    | 2.0        | 张三      |   修改了信息２    |　2017-7-17 11:00|
    | 3.0        | 李四      |   修改了信息３    |　2017-7-18 10:00|

###	2.安装git（略过）
###	3.创建版本库

 我创建版本库的步骤

	cd e:
	mikdir learngit
	cd learngit
	git init


> Initialized empty Git repository in E:/learngit/.git/


我发现多了一个.git目录，百度后才知道是git用来跟踪管理版本库的

### 4.添加文件
	
	vim test.txt
	
	gittest
	test
 保存好文件并退出vi

	esc + : + wq

 查看文件状态
	
	git status


 将文件添加进索引库

	git add test.txt

 出现了个 warning

> warning: LF will be replaced by CRLF in test.txt.

 原来在windows中的换行符是CRLF,在linux中是LF,windows开发者还是执行一句命令比较好,这样没有进行过行尾结束的转换，那么文本文件就会按照原样存储

> git config --gobal core.autocrlf false 

 再查看文件状态 

	git status


> changes to be committed
> 文件已准备提交

 把文件提交到本地版本库分支

	git commit test.txt -m "feat(all):新加了一个test文本"


 查看commit日志
	
	git log


### 5.关于工作区和暂缓区

- 工作区：保存目前正在处理档案的目录，Git相关的操作都会在这个目录下完成。

- 索引：位于工作目录和数据库之间，是为了向数据库提交作准备的暂存区域

>在我的理解，之前创建的learngit本地仓库就属于一个工作区，而在使用git add 添加文件后，文件就到了一个暂缓区，在使用git commit后就只是把存在暂缓区的文件提交到本地仓库的当前分支上

### 6.撤销修改

	git checkout -- 文件名

> 可以还原到上一次的操作

### 7.版本回退（慎用）

	git reset -- hard HEAD^

>回退到上一个版本，^^就是回退到上上个版本，以此类推

在每一次提交后会有一个版本号

	git reset --hard 版本号

如果不记得版本号，可以查看每一次命令的记录来找回版本号

	git reflog

### 8.分支管理

>分支就像是一个平行的世界，主分支是一个版本，在另一个子分支就可以根据主分支的版本进行修改，这个修改在回到主分支后是完全不影响的，在子分支修改后的东西如果可用，就可以将子分支和主分支的内容进行合并，如果子分支不可用，则可以删掉子分支

**新建分支**
	
	git checkout -b dev

这个命令是以下两个命令的合并

	git branch dev
	git checkout dev


**查看分支**

	git branch

	* dev
	 master
这样就可以看到分支目录，前面有*号的就是当前分支

**回到主分支**

	git checkout master
**合并分支**

	git merge dev
合并指定的dev分支到当前分支

**删掉分支**

	git branch -d dev

> 使用分支来进行开发，代码可行后合并分支再删除分支，是非常方便和安全的


创建和合并分支代码总结：

- 查看分支：git branch

- 创建分支：git branch <name>
	
- 切换分支：git checkout <name>

- 创建+切换分支：git checkout -b <name>

- 合并某分支到当前分支：git merge <name>

- 删除分支：git branch -d <name>


**合并冲突**
当在主分支和子分支各自都分别有新的提交，git是无法进行快速合并的，只能把各自的修改合并起来，然后等待去解决

例如在两个分支上都修改了brach.txt文件
合并后查看文件
cat brach.txt

	这里是dev分支
	<<<<<<< HEAD

	这里是master分支
	=======
	这里新加了一个feature1分支
	>>>>>>> feature1

>标记除了不同分支的内容

手动修改内容
然后再提交

**修改bug**
在正在主分支开发式，收到一个bug需要修改，此时可以储藏主分支，然后在子分支上进行修改bug,修改后合并，删除分支，恢复储藏。

	git stash

恢复现场,并删除stash内容，两种方法

	git stash apply + git stash drop

	git stash pop

*强行删除分支*
	
	git branch -D xxx
	

**分支总结：**
master分支和dev分支是两个指针，HEAD指向哪个指针，当前代码就在哪个分支。创建新的分支dev时，只是新增加一个dev指针，然后HEAD指向dev。此后，所做的更改就是针对dev这条线移动指针；如果把HEAD切换回master会发现代码还是以前的样子。如果想把dev的覆盖上来，就使用git merge dev。合并完成后，再删除dev分支，就只剩下master了。Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在master分支上工作效果是一样的，但过程更安全


### 9.标签
1.打标签

	git tag -a 0.1.3 -m "Release version 0.1.3"

git tag 是命令

-a 0.1.3是增加 名为0.1.3的标签

-m 后面跟着的是标签的注释

打标签的操作发生在我们commit修改到本地仓库之后。

	git add .
	git commit -m "fixed some bugs"
	git tag -a 0.1.3 -m "Release version 0.1.3"
2.打特定版本

默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？方法是找到历史提交的commit id，然后打上就可以了：

	git tag v0.9 6224937//对add merge这次提交打标签，它对应的commit id是6224937

3.查看标签

git tag//注意，标签不是按时间顺序列出，而是按字母排序的

	>git tag
	Alpha8.5
	Alpha8.6
	Alpha8.7
	Alpha8.76

可以用git show <tagname>查看标签信息：

	2>git show Alpha8.76
	tag Alpha8.76
	Tagger: Orange Yi <yizicheng@utimes.cc>
	Date:   Fri Jul 21 14:40:48 2017 +0800


	Alpha8.76

	commit f3697fefbc2498dc92b5ed9e9d65af67e913393f
	Merge: ca355a4 3abbfe9
	Author: Orange Yi <yizicheng@utimes.cc>
	Date:   Fri Jul 21 14:40:02 2017 +0800

    Merge branch 'hotfix/Alpha8.76'
4.推送标签到远程服务器上

	git push origin 标签名
	git push origin --tags
--tags参数表示提交所有tag至服务器端

5.获取打好标签的版本

先 git clone 整个仓库，然后 git checkout tag_name 就可以取得 tag 对应的代码了。

但是这时候 git 可能会提示你当前处于一个“detached HEAD" 状态，因为 tag 相当于是一个快照，是不能更改它的代码的，如果要在 tag 代码的基础上做修改，你需要一个分支：

	git checkout -b branch_name tag_name 或者git fetch origin tag V1.2
这样会从 tag 创建一个分支，然后就和普通的 git 操作一样了。

6.删除标签的命令

	git tag -d V1.2




### 命令总结
配置

	git config --global user.name Orange-Yi
	git config --global user.email yizicheng@utimes.cc
 
	git config --list #查看配置的信息
 
	git help config #获取帮助信息

新建仓库

	git init #初始化
	git status #获取状态
	git add file #.或*代表全部添加
	git commit -m "xxx"; #此处注意乱码
	git remote add origin git@github.com:yanhaijing/test.git #添加源
	git push -u origin master #push同时设置默认跟踪分支



