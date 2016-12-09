/**
 * Created by maxith on 2016/12/9.
 */
'use strict';
//CRUD SQL语句
var btInfoSQLMapping = {
    queryByHax : 'SELECT * FROM BT_INFO WHERE NAME LIKE ? OR ID = ? '
};

var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

var P2PSpider = require('../lib');


var p2p = P2PSpider({
    nodesMaxSize: 200,
    maxConnections: 400,
    timeout: 5000
});

p2p.ignore(function (infohash, rinfo, callback) {
    db.get(infohash, function (err, value) {
        callback(!!err);
    });
});

p2p.on('metadata', function (metadata) {
    var data = {};
    data.magnet = metadata.magnet;
    data.name = metadata.info.name ? metadata.info.name.toString() : '';
    data.fetchedAt = new Date().getTime();
    // db.put(metadata.infohash, JSON.stringify(data), function (err) {
    //     if(!err) {
    //         console.log(data.name);
    //     }
    // });
});

process.on('SIGINT', function() {
    db.close(function(err) {
        console.log("DB closed!");
        process.exit();
    });
});

p2p.listen(6881, '0.0.0.0');