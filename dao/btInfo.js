/**
 * Created by Administrator on 2016/12/8.
 */
//CRUD SQL语句
var btInfoSQLMapping = {
    queryByNameTotal : 'SELECT count(*) as s FROM BT_INFO WHERE NAME LIKE ?',
    queryByNameWithPage : 'SELECT * FROM BT_INFO WHERE NAME LIKE ? order by name desc LIMIT ?,?'
};

var  mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));


module.exports = {
    queryByNameTotal : function (val,callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询
            connection.query(btInfoSQLMapping.queryByNameTotal, ['%' + val + '%'], function(err, result) {
                if(err != null)
                    callback(err,null);
                else
                    callback(null,result);
                // 释放连接
                connection.release();
            });
        });
    },
    queryByNameWithPage : function (val,start,end,callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询
            connection.query(btInfoSQLMapping.queryByNameWithPage, ['%' + val + '%',start,end], function(err, result) {
                if(err != null)
                    callback(err,null);
                else
                    callback(null,result);
                // 释放连接
                connection.release();
            });
        });
    }
};