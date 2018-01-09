var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var check = require('../utily/check');
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

//TODO: 完成POST、PUT、PATCH、DELETE的接口

router.post('/',function(req,res,next){
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query('INSERT FROM goods VALUES(?,?,?,?,?,?,?,?,?)',[param.gid,param.gname,param.gclass,param.gprice,param.gprice,param.gunit,param.gshelf,param.gplace,param.gnote], function (error, results, fields) {
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
