var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var check = require('../utily/check');
var pool = mysql.createPool( dbconfig.mysql );

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/:rid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord where rid = ?',req.params.rid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/rgid/:rgid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord where rgid = ?',req.params.rgid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/rtype/:rtype', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord where rtype = ?',req.params.rtype, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/hid/:hid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord where hid = ?',req.params.hid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/gid/:gid', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord where gid = ?',req.params.gid, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/rtime/:rtime', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord where rtime = ?',req.params.rtime, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/rnumber/:rnumber', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord where rnumber = ?',req.params.rnumber, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.release();
});
});

router.get('/rnote/:rnote', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM wrecord where rnote = ?',req.params.rnote, function (error, results, fields) {
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
    connection.query('INSERT FROM wrecord VALUES(?,?,?,?,?,?,?,?)',[param.rid,param.rgid,param.rtype,param.hid,param.gid,param.rtime,param.rnumber,param.rnote], function (error, results, fields) {
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
