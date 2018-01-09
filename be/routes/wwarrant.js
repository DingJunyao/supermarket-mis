var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'supermarket'
});

router.get('/', function(req, res, next) {
  connection.connect();
  connection.query('SELECT * FROM goods', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.parse(JSON.stringify(results)));
    return res.send(JSON.stringify(results))
  });
  connection.end();
  //res.render('index', { title: 'Express' });
});

module.exports = router;
