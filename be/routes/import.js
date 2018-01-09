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

router.get('/sid/:sid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wwarrant where sid = ?',req.params.sid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/iprice/:iprice', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wwarrant where iprice = ?',req.params.iprice, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/inote/:inote', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wwarrant where inote = ?',req.params.inote, function (error, results, fields) {
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
    connection.query('INSERT FROM wwarrant VALUES(?,?,?,?)',[param.gid,param.sid,param.iprice,param.inote], function (error, results, fields) {
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
