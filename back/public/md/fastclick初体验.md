
####  why延迟？


> 从点击屏幕上的元素到触发元素的 click 事件，移动浏览器会有大约 300 毫秒的等待时间。为什么这么设计呢？ 因为它想看看你是不是要进行双击（double tap）操作。


####  how？

> 因为js的表现遵循Common.js规范，可以使用包管理工具安装fastclick模块包

	npm install fastclick

> 使用Common.js的requre方法引入模块

	var attachFastClick = require('fastclick');

> 在实例化fastclick


	attachFastClick.attach(document.body);

[fastclick的github地址](https://github.com/ftlabs/fastclick)


	
