/**
 * 搜索页面控制器
 */
var express = require('express');
var router = express.Router();

//数据dao
var btInfoDao = require('../dao/btInfo');

router.get('/', function(req, res, next) {
	var v = req.query.v;
	btInfoDao.queryByHax(v,function (err,data) {
		if(err != null){
			console.log(err);
		}else {
			res.render('search', { title: 'GO DIE!' , val : data});
		}
	})

});

module.exports = router;
