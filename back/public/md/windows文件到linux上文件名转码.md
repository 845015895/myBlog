>   文件是在Windows下创建的，而Windows的文件名中文编码默认GBK，Linux中默认文件名编码为UTF-8，编码不一致导致了文件名乱码的问题，解决这个问题需要对文件名进行转码，这个工具就是convmv。



- 首先安装convmv
    
        npm install convmv
        
- 然后进行转码

        convmv -f GBK -t zh_CN.UTF-8 -r --notest [文件名或文件夹名]
