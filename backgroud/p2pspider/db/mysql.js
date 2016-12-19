/**
 * Created by maxith on 2016/12/9.
 */
'use strict';
//CRUD SQL语句
var sqlMapping = {
    queryByHax : 'select * from BT_INFO where hax = ?',
    insertInfo : 'insert into BT_INFO(id,hax,name,json_string) values (?,?,?,?)'
};

var uuid = require('node-uuid');
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

var P2PSpider = require('../lib');


var p2p = P2PSpider({
    nodesMaxSize: 200,
    maxConnections: 100,
    timeout: 5000
});


p2p.on('metadata', function (metadata) {
    var data = {};
    data.magnet = metadata.magnet;
    data.name = metadata.info.name ? metadata.info.name.toString() : '';
    data.fetchedAt = new Date().getTime();

    pool.getConnection(function(err, connection) {
        var flag = true;
        // 建立连接，查询
        connection.query(sqlMapping.queryByHax,[metadata.infohash],function (err, result) {
            if(err != null){
                console.log(err);
            }else if(result != null){
                flag = false;
            }
        });
        if(flag){
            connection.query(sqlMapping.insertInfo, [uuid.v4(),metadata.infohash,data.name,JSON.stringify(data)], function(err, result) {
                if(err != null)
                    console.log(err);
            });
        }
        // 释放连接
        connection.release();
    });
});

process.on('SIGINT', function() {
    pool.end(function(err) {
        console.log("DB closed!");
        process.exit();
    });
});

p2p.listen(6881, '0.0.0.0');