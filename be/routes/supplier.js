var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var pool = mysql.createPool( dbconfig.mysql );

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM supplier', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/:sid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM supplier where sid = ?',req.params.sid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/sname/:sname', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM supplier where sname = ?',req.params.sname, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/sphone/:sphone', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM supplier where sphone = ?',req.params.sphone, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/saddress/:saddress', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM supplier where saddress = ?',req.params.saddress, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/snote/:snote', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM supplier where snote = ?',req.params.snote, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

//TODO: 完成POST、PUT、PATCH、DELETE的接口

router.post('/',function(req,res,next){
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query('INSERT FROM supplier VALUES(?,?,?,?,?)',[param.sid,param.sname,param.sphone,param.saddress,param.snote], function (error, results, fields) {
    if (error) throw error;
    if(result) {
         result = {
                  code: 201,
                 msg:'添加商品成功'
         };
         res.status(201).json(res, result);
    }else {
      result = {
               code: 500,
              msg:'添加商品失败'
      };
      res.status(500).json(res, result);
    }
  });
  connection.release();
});
});
module.exports = router;
