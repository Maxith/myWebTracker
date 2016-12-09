/**
 * Created by Administrator on 2016/12/8.
 */
//CRUD SQL语句
var btInfoSQLMapping = {
    queryByHax : 'SELECT * FROM BT_INFO WHERE NAME LIKE ? OR ID = ? '
};

var  mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));


module.exports = {
    queryByHax : function (val,callback) {
        pool.getConnection(function(err, connection) {
            // 建立连接，查询
            connection.query(btInfoSQLMapping.queryByHax, [val,val], function(err, result) {
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