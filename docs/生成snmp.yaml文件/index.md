# Prometheus snmp采集生成 snmp.yaml文件

### 背景
    Prometheus 通过snmp-exporter采集网络设备， 但snmp-exporter是依赖snmp.yaml
    件取采集对应应的oid，本此记录snmp.yaml 生成的过程
### 做法
#### 安装generator 
    # Debian 系统.
    sudo apt-get install unzip build-essential libsnmp-dev # Debian-based distros
    # Redhat 系统
    sudo yum install gcc gcc-g++ make net-snmp net-snmp-utils net-snmp-libs net-snmp-devel # RHEL-based distros
    
    go get github.com/prometheus/snmp_exporter/generator
    cd ${GOPATH-$HOME/go}/src/github.com/prometheus/snmp_exporter/generator
    go build
    make mibs

#### 写generator.yml 文件
    modules:
        module_name: # 模块名
            walk:  # 下面是需要采集指标的oid
              - 1.3.6.1.2.1.2              # Same as "interfaces"
              - sysUpTime                  # Same as "1.3.6.1.2.1.1.3"
              - 1.3.6.1.2.1.31.1.1.1.6.40  # Instance of "ifHCInOctets" with index "40"


---

> 作者: xieliangcai  
> URL: https://github.xieliangcai.io/%E7%94%9F%E6%88%90snmp.yaml%E6%96%87%E4%BB%B6/  

