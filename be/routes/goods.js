var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database : 'supermarket'
});

var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') {
          res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
      res.json(ret);
  }};

router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM goods', function (error, results, fields) {
    if (error) throw error;
    responseJSON(res,JSON.stringify(results));
    //return res.send(JSON.stringify(results))
  });
  connection.release();
  //res.render('index', { title: 'Express' });
});
});

module.exports = router;
