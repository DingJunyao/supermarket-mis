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



## 数据库设计

### 数据表名规范

| 序号   | 表名          | 前缀   | 说明         | 备注   |
| ---- | ----------- | ---- | ---------- | ---- |
| 1    | `goods`     | `g`  | 商品目录       | 事先建好 |
| 2    | `supplier`  | `s`  | 供应商信息      | 事先建好 |
| 3    | `warehouse` | `h`  | 仓库信息       | 事先建好 |
| 4    | `order`     | `o`  | 订单         | 临时生成 |
| 5    | `wrecord`   | `r`  | 出入库记录      | 临时生成 |
| 6    | `wwarrant`  | `w`  | 库存         | 临时生成 |
| 7    | `import`    | `i`  | 商品在各供应商的进价 | 事先建好 |
| 8    | `user`      | `u`  | 账户         | 事先建好 |

### 字段名规范

以上表的前缀为开头，再加一个规定的英文单词作为字段名。

`id`：编号

`name`：名称

`class`：分类

`type`：类型

`brand`：品牌

`price`：单价

`place`：地区

`note`：备注

`date`：日期

`time`：时间

`number`：数量

`address`：地址

`unit`：单位

`shelf`：保质期

`hash`：散列值

特别地，`order`和`wrecord`表，由于一条记录并非完整的单据，所以，-`id`表示单条的编号，-`gid`表示单据的编号。单条编号格式为单据的编号后接3位从`001`开始的顺序码。

### 数据表结构设计

#### `goods`表

| 序号   | 字段名      | 字段类型      | 长度    | 允许为空 | 约束条件 | 备注     |
| ---- | -------- | --------- | ----- | ---- | ---- | ------ |
| 1    | `gid`    | `VARCHAR` | `13`  | 否    | 主键   | 商品条码   |
| 2    | `gname`  | `VARCHAR` | `30`  | 否    |      | 商品名称   |
| 3    | `gclass` | `VARCHAR` | `20`  | 否    |      | 商品分类   |
| 4    | `gbrand` | `VARCHAR` | `20`  | 是    |      | 品牌     |
| 5    | `gprice` | `DECIMAL` | `6,2` | 否    |      | 单价（售价） |
| 6    | `gunit`  | `VARCHAR` | `8`   | 否    |      | 单位     |
| 7    | `gshelf` | `INT`     | `4`   | 是    |      | 保质期（日） |
| 8    | `gplace` | `VARCHAR` | `30`  | 是    |      | 产地     |
| 9    | `gnote`  | `VARCHAR` | `40`  | 是    |      | 备注信息   |

#### `supplier`表

| 序号   | 字段名        | 字段类型      | 长度   | 允许为空 | 约束条件 | 备注    |
| ---- | ---------- | --------- | ---- | ---- | ---- | ----- |
| 1    | `sid`      | `VARCHAR` | `5`  | 否    | 主键   | 供应商编号 |
| 2    | `sname`    | `VARCHAR` | `20` | 否    |      | 供应商名称 |
| 3    | `sphone`   | `VARCHAR` | `15` | 否    |      | 供应商电话 |
| 4    | `saddress` | `VARCHAR` | `40` | 否    |      | 供应商地址 |
| 5    | `snote`    | `VARCHAR` | `40` | 是    |      | 备注    |

#### `warehouse`表

| 序号   | 字段名     | 字段类型      | 长度   | 允许为空 | 约束条件 | 备注   |
| ---- | ------- | --------- | ---- | ---- | ---- | ---- |
| 1    | `hid`   | `VARCHAR` | `2`  | 否    | 主键   | 仓库编号 |
| 2    | `hname` | `VARCHAR` | `20` | 否    |      | 仓库名称 |
| 3    | `hnote` | `VARCHAR` | `40` | 是    |      | 备注   |

#### `order`表

| 序号   | 字段名       | 字段类型       | 长度   | 允许为空 | 约束条件 | 备注     |
| ---- | --------- | ---------- | ---- | ---- | ---- | ------ |
| 1    | `oid`     | `VARCHAR`  | `12` | 否    | 主键   | 订单单条编号 |
| 2    | `ogid`    | `VARCHAR`  | `9`  | 否    |      | 订单编号   |
| 3    | `otime`   | `DATETIME` |      | 否    |      | 生成订单时间 |
| 4    | `sid`     | `VARCHAR`  | `5`  | 否    | 外键   | 供应商编号  |
| 5    | `gid`     | `VARCHAR`  | `13` | 否    | 外键   | 商品编号   |
| 6    | `onumber` | `INT`      | `4`  | 否    |      | 订商品数量  |
| 7    | `onote`   | `VARCHAR`  | `40` | 是    |      | 备注     |

#### `wrecord`表

| 序号   | 字段名     | 字段类型     | 长度   | 允许为空 | 约束条件 | 备注          |
| ---- | ------- | -------- | ---- | ---- | ---- | ----------- |
| 1    | `rid`   | `VARCHAR`  | `12`   | 否    | 主键   | 出入库单单条编号    |
| 2    | `rgid`  | `VARCHAR`  | `9`    | 否    |      | 出入库单编号      |
| 3    | `rtype`   | `INT`      | `1`    | 否    |      | 类型（`1`入`0`出）    |
| 4    | `hid`     | `VARCHAR`  | `2`    | 否    | 外键   | 仓库编号        |
| 5    | `gid`     | `VARCHAR`  | `13`   | 否    | 外键   | 商品编号        |
| 6    | `rtime`   | `DATETIME` |      | 否    |      | 出入库时间       |
| 7    | `rnumber` | `INT`      | `4`    | 否    |      | 出入库数量（正入负出） |
| 8    | `rnote`   | `VARCHAR`  | `40`   | 是    |      | 备注          |

#### `wwarrant`表

| 序号   | 字段名     | 字段类型    | 长度   | 允许为空 | 约束条件  | 备注       |
| ---- | ------- | ------- | ---- | ---- | ----- | -------- |
| 1    | `gid`     | `VARCHAR` | `13`   | 否    | 主键，外键 | 商品条码     |
| 2    | `hid`     | `VARCHAR` | `2`    | 否    | 主键，外键 | 商品所在仓库编号 |
| 3    | `wnumber` | `DECIMAL` | `7,3`  | 否    |       | 商品数量     |
| 4    | `wnote`   | `VARCHAR` | `40`   | 是    |       | 备注       |

#### `import`表

| 序号   | 字段名    | 字段类型    | 长度   | 允许为空 | 约束条件  | 备注    |
| ---- | ------ | ------- | ---- | ---- | ----- | ----- |
| 1    | `gid`    | `VARCHAR` | `13`   | 否    | 主键，外键 | 商品条码  |
| 2    | `sid`    | `VARCHAR` | `5`    | 否    | 主键，外键 | 供应商编号 |
| 3    | `iprice` | `DECIMAL` | `6,2`  | 否    |       | 进价    |
| 4    | `inote`  | `VARCHAR` | `40`   | 是    |       | 备注    |

#### `user`表

| 序号   | 字段名   | 字段类型    | 长度   | 允许为空 | 约束条件 | 备注     |
| ---- | ----- | ------- | ---- | ---- | ---- | ------ |
| 1    | `uid`   | `VARCHAR` | 15   | 否    | 主键   | 工号     |
| 2    | `uhash` | `VARCHAR` | 64   | 否    |      | 密码的加密值 |
| 3    | `uname` | `VARCHAR` | 20   | 否    |      | 姓名     |
| 4    | `utype` | `INT`     | 2    | 否    |      | 用户类型   |



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

安装后端依赖（在`supermarket-mis`目录（以下简称程序目录）下）

```shell
cd be
npm install cors --save
npm install mysql -save
```

配置数据库（新建名为`supermarket`的数据库，创建一系列表）

```shell
mysql -h localhost -u root -p
```

```sql
SET NAMES utf8;
CREATE DATABASE supermarket;
USE supermarket;

CREATE TABLE `goods`(
    `gid` VARCHAR(13) NOT NULL,
    `gname` VARCHAR(30) NOT NULL,
    `gclass` VARCHAR(20) NOT NULL,
    `gbrand` VARCHAR(20),
    `gprice` DECIMAL(6,2) NOT NULL,
    `gunit` VARCHAR(8) NOT NULL,
    `gshelf` INT(4),
    `gplace` VARCHAR(30),
    `gnote` VARCHAR(40),
    PRIMARY KEY (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `supplier`(
    `sid` VARCHAR(5) NOT NULL,
    `sname` VARCHAR(20) NOT NULL,
    `sphone` VARCHAR(15) NOT NULL,
    `saddress` VARCHAR(40) NOT NULL,
    `snote` VARCHAR(40),
    PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `warehouse`(
    `hid` VARCHAR(2) NOT NULL,
    `hname` VARCHAR(20) NOT NULL,
    `hnote` VARCHAR(40),
    PRIMARY KEY (`hid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `order`(
    `oid` VARCHAR(12) NOT NULL,
    `ogid` VARCHAR(9) NOT NULL,
    `otime` DATETIME NOT NULL,
    `sid` VARCHAR(5) NOT NULL,
    `gid` VARCHAR(13) NOT NULL,
    `onumber` INT(4) NOT NULL,
    `onote` VARCHAR(40),
    PRIMARY KEY (`oid`),
    CONSTRAINT o_gid_fk FOREIGN KEY (`gid`) REFERENCES goods(`gid`),
    CONSTRAINT o_sid_fk FOREIGN KEY (`sid`) REFERENCES supplier(`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `wrecord`(
    `rid` VARCHAR(12) NOT NULL,
    `rgid` VARCHAR(9) NOT NULL,
    `rtype` INT(1) NOT NULL,
    `hid` VARCHAR(2) NOT NULL,
    `gid` VARCHAR(13) NOT NULL,
    `rtime` DATETIME NOT NULL,
    `rnumber` INT(4) NOT NULL,
    `rnote` VARCHAR(40),
    PRIMARY KEY (`rid`),
    constraint r_gid_fk foreign key (`gid`) references goods(`gid`),
    constraint r_hid_fk foreign key (`hid`) references warehouse(`hid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `wwarrant`(
    `gid` VARCHAR(13) NOT NULL,
    `hid` VARCHAR(2) NOT NULL,
    `wnumber` DECIMAL(7,3) NOT NULL,
    `wnote` VARCHAR(40),
    PRIMARY KEY (`gid`,`hid`),
    constraint w_gid_fk foreign key (`gid`) references goods(`gid`),
    constraint w_hid_fk foreign key (`hid`) references warehouse(`hid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `import`(
    `gid` VARCHAR(13) NOT NULL,
    `sid` VARCHAR(5) NOT NULL,
    `iprice` DECIMAL(6,2) NOT NULL,
    `inote` VARCHAR(40),
    PRIMARY KEY (`gid`,`sid`),
    constraint i_gid_fk foreign key (`gid`) references goods(`gid`),
    constraint i_sid_fk foreign key (`sid`) references supplier(`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user`(
    `uid` VARCHAR(15) NOT NULL,
    `uhash` VARCHAR(64) NOT NULL,
    `uname` VARCHAR(20) NOT NULL,
    `utype` INT(2) NOT NULL,
    PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
执行`show tables;`，如果看到8张表，则创建成功。

输入测试数据：

```sql
INSERT INTO `goods` VALUES
  ('6925303730574', '统一阿萨姆原味奶茶', '饮料', '统一', '4.00', '瓶', '270', NULL, '测试数据'),
  ('6921734903525', '得力迷你型订书机套装 No.0352', '文具', '得力', '12.00', '套', NULL, NULL, '测试数据'),
  ('6917878045122', '雀巢特浓咖啡条装', '饮料', '雀巢', '1.50', '条', '720', NULL, '测试数据');
INSERT INTO `supplier` VALUES
  ('00001', '供应商1', '12345678901', '地球', '测试数据'),
  ('00002', '供应商2', '12345678902', '月球', '测试数据'),
  ('00003', '供应商3', '12345678903', '火星', '测试数据');
INSERT INTO `warehouse` VALUES
  ('01', '干仓', '测试数据'),
  ('02', '冷藏库', '测试数据');
INSERT INTO `wwarrant` VALUES
  ('6925303730574', '01', '120','测试数据'),
  ('6921734903525', '01', '20','测试数据'),
  ('6917878045122', '01', '200','测试数据');
INSERT INTO `import` VALUES
  ('6925303730574', '00001', '2.80','测试数据'),
  ('6925303730574', '00002', '2.70','测试数据'),
  ('6925303730574', '00003', '2.90','测试数据'),
  ('6917878045122', '00001', '0.90','测试数据'),
  ('6917878045122', '00002', '0.92','测试数据'),
  ('6921734903525', '00002', '10.00','测试数据');
```

在`be`下新建目录`db`，新建文件`dbconfig.js`如下：

```js
module.exports =
{
   mysql: {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database:'supermarket',
            port: 3306
          }
 };
```

新建并编辑`be/routes/goods.js`：

```js
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var check = require('../utily/check');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbconfig.mysql );

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods', function (error, results, fields) {
    if (error) throw error;
    //res.type('json');
    //res.json(check.checkCode("6901236374382"));
    res.json(results);
    //return res.send(JSON.stringify(results))
  });
  connection.release();
  //res.render('index', { title: 'Express' });
});
});

router.get('/:gid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gid = ?',req.params.gid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gname/:gname', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gname = ?',req.params.gname, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gclass/:gclass', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gclass = ?',req.params.gclass, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gbrand/:gbrand', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gbrand = ?',req.params.gbrand, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gprice/:gprice', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gprice = ?',req.params.gprice, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gunit/:gunit', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gunit = ?',req.params.gunit, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gshelf/:gshelf', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gshelf = ?',req.params.gshelf, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gplace/:gplace', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gplace = ?',req.params.gplace, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gnote/:gnote', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods where gnote = ?',req.params.gnote, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

//待将来添加内容

module.exports = router;
```
在`be`目录下运行`set DEBUG=myapp & npm start`，再打开浏览器，分别测试如下链接：

```
http://localhost:3000/goods
http://localhost:3000/goods/6917878045122
http://localhost:3000/goods/gname/统一阿萨姆原味奶茶
...
```

若访问正常，则goods的GET部分的API已经完成。

参照上面的步骤做出`supplier.js`、`warehouse.js`、`order.js`、`wwarrant.js`、`wrecord.js`、`import.js`。

## 参考文献

1. Ethan Brown. Node与Express开发[M]. 人民邮电出版社, 2015.
2. 薛华成. 管理信息系统.第6版[M]. 清华大学出版社, 2013.

[1]: https://github.com/lin-xin/vue-manage-system.git
