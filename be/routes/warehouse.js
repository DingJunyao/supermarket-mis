var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var pool = mysql.createPool( dbconfig.mysql );

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM warehouse', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/:hid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM warehouse where hid = ?',req.params.hid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/hname/:hname', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM warehouse where hname = ?',req.params.hname, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/hnote/:hnote', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM warehouse where hnote = ?',req.params.hnote, function (error, results, fields) {
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
    connection.query('INSERT FROM warehouse VALUES(?,?,?)',[param.hid,param.hname,param.hnote], function (error, results, fields) {
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
