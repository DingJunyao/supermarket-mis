var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var check = require('../utily/check');
var pool = mysql.createPool( dbconfig.mysql );

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT sname, gname, iprice FROM goods,supplier,import where goods.gid=import.gid AND supplier.sid=import.sid', function (error, results, fields) {
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

module.exports = router;
