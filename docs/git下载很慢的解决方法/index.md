# git 用了代理后还是下载慢


### git下载慢解决方法
#### 如下图三步，开放本机的代理端口
![img.png](/img.png)

#### 然后配置git
      git config --global http.proxy 'http://127.0.0.1:9300'
      git config --list # 查看是否成功


---

> 作者: xieliangcai  
> URL: https://github.xieliangcai.io/git%E4%B8%8B%E8%BD%BD%E5%BE%88%E6%85%A2%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95/  

