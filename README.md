# 小型超市管理信息系统

本仓库为我们团队的课设的代码存放处。

本人才疏学浅，水平有限，请勿模仿 O(∩\_∩)O哈哈~

## 引用

前端框架采用 [lin-xin/vue-manage-system][1]

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
|- README.md				  //自述文件
```

---------

## 思路

遵循MVC、MVVM和REST原则。

对于后端来说：

`GET`用来获取信息，`POST`用来添加数据，`PATCH`用来修改部分信息，`PUT`用来修改全部信息，`DELETE`用来删除信息。

同路径的请求方式不同可以导致功能的不同。

eg.

```
GET localhost:8081/goods  //获取商品目录
GET localhost:8081/goods/1111 //获取id为1111的商品的详细信息
GET localhost:8081/goods/gname/rest //获取名称为rest的商品的详细信息
POST localhost:8081/goods //添加商品
PATCH localhost:8081/goods/gname/rest //修改名称为rest的商品的部分信息
DELETE localhost:8081/goods/1111 //删除id为1111的产品信息
```

其中，`POST`、`PATCH`、`PUT`同时传入JSON数据。

返回值为JSON，同时输出状态码。

eg.

```json
//GET localhost:8081/goods
{"goods":[
  {"goodsid":"1111","gname":"rest","class":"1","brand":"r","price":"100.00","place":"earth","note":"11111111111111111"},
  {"goodsid":"1112","gname":"resu","class":"2","brand":"e","price":"30.00","place":"earth1","note":"11111112222222211"}
]}
200

//GET localhost:8081/goods/1111
{"goodsid":"1111","gname":"rest","class":"1","brand":"r","price":"100.00","place":"earth","note":"11111111111111111"}
200

//GET localhost:8081/goods/gname/resu
{"goodsid":"1112","gname":"resu","class":"2","brand":"e","price":"30.00","place":"earth1","note":"11111112222222211"}
200

//GET localhost:8081/goods/xxxxxx(不存在)
{"error":"No goods which goodsid = 'xxxxxx'"}
404
```

`200`用于`GET`方法的成功状态。

`201`用于`POST`方法的成功状态。

`401`用于未登录状态下执行以上操作的客户端错误。

`403`用于登录状态下执行以上操作，由于权限不足引发的的客户端错误。

`404`用于不存在请求数据的客户端错误。

`409`用于冲突的客户端错误。

`415`用于文件格式错误导致的客户端错误。



---------

## 过程

安装node.js MySQL

```shell
sudo apt-get install nodejs mysql-server
```
在安装MySQL中设置root的密码`root`

检查MySQL是否安装成功

```shell
sudo netstat -tap | grep mysql
```
如果有关于`mysql`的返回值则表明安装成功。

配置工作目录（包括clone前端框架、安装前端框架依赖、安装Express）

```shell
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

安装后端依赖（在`supermarket-mis`目录下）

```shell
cd be
npm install cors --save
```

配置数据库（新建名为`supermarket`的数据库，创建一系列表）

```shell
mysql -h localhost -u root -p
```

```sql
SET NAMES utf8;
CREATE DATABASE supermarket;
USE supermarket;
```

## 参考文献

1. Ethan Brown. Node与Express开发[M]. 人民邮电出版社, 2015.
2. 薛华成. 管理信息系统.第6版[M]. 清华大学出版社, 2013.

[1]: https://github.com/lin-xin/vue-manage-system.git
