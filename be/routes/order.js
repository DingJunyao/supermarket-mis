var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var check = require('../utily/check');
var pool = mysql.createPool( dbconfig.mysql );

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM order', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/:oid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM order where oid = ?',req.params.oid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/ogid/:ogid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM order where ogid = ?',req.params.ogid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/otime/:otime', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM order where otime = ?',req.params.otime, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/sid/:sid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM order where sid = ?',req.params.sid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gid/:gid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM order where gid = ?',req.params.gid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/onumber/:onumber', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM order where onumber = ?',req.params.onumber, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/onote/:onote', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM order where onote = ?',req.params.onote, function (error, results, fields) {
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
    connection.query('INSERT FROM order VALUES(?,?,?,?,?,?,?)',[param.oid,param.ogid,param.otime,param.sid,param.gid,param.onumber,param.onote], function (error, results, fields) {
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
