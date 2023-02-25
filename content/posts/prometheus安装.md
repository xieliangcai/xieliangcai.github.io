---
title: "Prometheus安装"
date: 2023-02-25T07:57:09+08:00
draft: true
tags : [
"监控",
"prometheus",
]
---
## Prometheus安装

### 下载解压

mkdir -p /opt/prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.37.1/prometheus-2.37.1.linux-amd64.tar.gz
tar xf prometheus-2.37.1.linux-amd64.tar.gz
cp -far prometheus-2.37.1.linux-amd64/*  /opt/prometheus/

### 将服务挂使用systemd 托管

    cat <<EOF >/etc/systemd/system/prometheus.service
    [Unit]
    Description="prometheus"
    Documentation=https://prometheus.io/
    After=network.target
    
    [Service]
    Type=simple
    
    ExecStart=/opt/prometheus/prometheus  --config.file=/opt/prometheus/prometheus.yml --storage.tsdb.path=/opt/prometheus/data --web.enable-lifecycle --enable-feature=remote-write-receiver --query.lookback-delta=2m --web.enable-admin-api
    
    Restart=on-failure
    SuccessExitStatus=0
    LimitNOFILE=65536
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=prometheus
    
    [Install]
    WantedBy=multi-user.target
    EOF
    
    systemctl enable prometheus
    systemctl start prometheus
    systemctl status prometheus

### 启动参数
    --config.file=/opt/prometheus/prometheus.yml
    指定 Prometheus 的配置文件路径
    
    --storage.tsdb.path=/opt/prometheus/data
    指定 Prometheus 时序数据的硬盘存储路径
    
    --web.enable-lifecycle
    启用生命周期管理相关的 API，比如调用 /-/reload 接口就需要启用该项
    
    --enable-feature=remote-write-receiver
    启用 remote write 接收数据的接口，启用该项之后，categraf、grafana-agent 等 agent 就可以通过 /api/v1/write 接口推送数据给 Prometheus
    
    --query.lookback-delta=2m
    即时查询在查询当前最新值的时候，只要发现这个参数指定的时间段内有数据，就取最新的那个点返回，这个时间段内没数据，就不返回了
    
    --web.enable-admin-api
    启用管理性 API，比如删除时间序列数据的 /api/v1/admin/tsdb/delete_series 接口

### 安装node-exporter
#### 下载地址
    https://prometheus.io/download/#node_exporter

#### 解压直接运行
    nohup ./node_exporter &> output.log &
#### 编辑prometheus.yml,具体内容如下，targets是个列表， 如果有多个在列表里添加即可
    scrape_configs:
     - job_name: 'prometheus'
        static_configs:
        - targets: ['localhost:9090']
     - job_name: 'node_exporter'
       static_configs:
       - targets: ['localhost:9100']

#### 重新加载Prometheus，让其重新加载配置
    通过 ps -ef | grep prometheus 找到prometheus的pid
    kill -HUP prometheuspid
> 注意: -HUP 是重新加载进程的意思
