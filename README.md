# 小型超市管理信息系统

本仓库为我们团队的课设的代码存放处。

本人才疏学浅，水平有限，请勿模仿 O(∩\_∩)O哈哈~

## 环境

### 硬件环境

CPU：AMD A10-7400P Radeon R6, 10 Compute Cores 4C+6G @ 4x 2.5GHz

GPU: AMD/ATI Kaveri [Radeon R6 Graphics]

RAM: 2890MiB / 6915MiB

### 软件环境

系统：Deepin 15.5 unstable

内核：x86_64 Linux 4.9.0-deepin13-amd64

node.js（将要安装）版本：v6.3.1

MySQL（将要安装）版本：5.7.18-1

Express（将要安装）版本：

## 结构

```
|- fe                         //前端
|- be                         //后端
|- etc                        //存放其他文件，如SQL语句
```

---------

## 过程

安装node.js MySQL
```
sudo apt-get install nodejs mysql-server
```
在安装MySQL中设置root的密码`root`

检查MySQL是否安装成功
```
sudo netstat -tap | grep mysql
```
如果有返回值则表明安装成功。

配置工作目录（包括clone前端框架、安装Express）

```
mkdir supermarket-mis
cd supermarket-mis
mkdir fe
mkdir etc
cd fe
git clone https://github.com/lin-xin/vue-manage-system.git
cd vue-manage-system
npm install
cd ../..
npm install express-generator -g
express be
```

安装依赖（在`supermarket-mis`目录下）

```
cd
```
