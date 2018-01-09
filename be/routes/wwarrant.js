var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var pool = mysql.createPool( dbconfig.mysql );

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wwarrant', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gid/:gid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wwarrant where gid = ?',req.params.gid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/hid/:hid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wwarrant where hid = ?',req.params.hid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/wnumber/:wnumber', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wwarrant where wnumber = ?',req.params.wnumber, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/wnote/:wnote', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wwarrant where wnote = ?',req.params.wnote, function (error, results, fields) {
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
    connection.query('INSERT FROM wwarrant VALUES(?,?,?,?)',[param.gid,param.hid,param.wnumber,param.wnote], function (error, results, fields) {
    if (error) throw error;
    if(result) {
         result = {
                  code: 201,
                  msg:'添加成功'
         };
         res.status(201).json(res, result);
    }else {
      result = {
               code: 500,
               msg:'添加失败'
      };
      res.status(500).json(res, result);
    }
  });
  connection.release();
});
});
module.exports = router;
