---
title: "git 用了代理后还是下载慢"
date: 2023-02-27T07:57:09+08:00
draft: false
tags : [
"git",
]
categories : [
"git",
]
---

### git下载慢解决方法
#### 如下图三步，开放本机的代理端口
![img.png](/img.png)

#### 然后配置git
      git config --global http.proxy 'http://127.0.0.1:9300'
      git config --list # 查看是否成功
