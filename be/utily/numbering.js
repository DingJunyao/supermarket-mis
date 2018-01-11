var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../db/dbconfig');
var check = require('../utily/check');
var pool = mysql.createPool( dbconfig.mysql );

module.exports = {
  numbering: function(type){
    var code = '';
    var d = new Date();
    var d_code = d.getFullYear().toString().substr(2,2) + (Array(2).join('0') + (d.getMonth()+1)).slice(-2) + d.getDate().toString();
    switch (type) {
      case "order":
        code += ("2" + d_code);
        pool.getConnection(function(err, connection,callback) {
        connection.query('SELECT DISTINCT `ogid` FROM `order` WHERE `ogid` LIKE ? ORDER BY ogid DESC',code+"%", function (error, results, fields) {
          if (error) throw error;
          if(results[0]){
            last = results[0].ogid.charAt(7);
            code += (Number(last)+1).toString();
          }else {
            code += "1";
          }
          cc = check.getCheckCode(code);
          console.log(cc);
          code += cc;
          console.log(code);
          callback(code);
        });
        connection.release();
        return
        });
        break;
      case "out":
        code += ("0" + d_code);
        pool.getConnection(function(err, connection) {
        connection.query('SELECT DISTINCT `rgid` FROM `wrecord` WHERE `rgid` LIKE ? ORDER BY `rgid` DESC',code+"%", function (error, results, fields) {
          if (error) throw error;
          if(results[0]){
            last = results[0].rgid.charAt(7);
            code += (Number(last)+1).toString();
          }else {
            code += "1";
          }
          cc = check.getCheckCode(code)
          code += cc;
          return code;
        });
        connection.release();
        });
        break;
      case "in":
        code += ("1" + d_code);
        pool.getConnection(function(err, connection) {
        connection.query('SELECT DISTINCT `rgid` FROM `wrecord` WHERE `rgid` LIKE ? ORDER BY `rgid` DESC',code+"%", function (error, results, fields) {
            if (error) throw error;
            if(results[0]){
              last = results[0].rgid.charAt(7);
              code += (Number(last)+1).toString();
            }else {
              code += "1";
            }
            cc = check.getCheckCode(code)
            code += cc;
            return code;
          });
          connection.release();
        });
        break;
      default:
        return -1;
    }
  }
}

/*
order - 订单
in - 入库
out - 出库
*/
