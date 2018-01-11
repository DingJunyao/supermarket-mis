var async = require('async');
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var check = require('../utily/check');
var pool = mysql.createPool( dbconfig.mysql);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'supermarket'
});

connection.connect();

async.series([
        function (callback) {
var code='21801101';
  connection.query('SELECT DISTINCT `ogid` FROM `order` WHERE `ogid` LIKE ? ORDER BY ogid DESC',code+"%",
    function(error, results) {
      if(error) {
        console.log("ClientReady Error: " + error.message);
        connection.end();
        return;
      }
      console.log(results[0]);
      callback(results[0],1);
    }
  );},
        function (callback) {
        callback(null,1);}],
 function (err, results) {
            return results[0];
        });
