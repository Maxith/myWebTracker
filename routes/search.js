/**
 * 搜索页面控制器
 */
var express = require('express');
var router = express.Router();

//数据dao
var btInfoDao = require('../dao/btInfo');

router.get('/page.html', function(req, res, next) {
    var param = req.params;
	res.render('search', {vName : param.v});
});

router.post('/pageValue.json',function (req, res, next) {
    var param = req.body,
        page = param.page,
        single=param.singlePageCount;

    var start = (page-1) * single,end = page*single,total = 0;
    btInfoDao.queryByNameTotal(param.vName,function (err,data){
        if(err != null){
            console.log(err);
        }else {
            if(data == null){
                res.json({
                    msg : '未找到结果'
                });
            }else{
                total = data[0].s;
            }
        }
    });
	btInfoDao.queryByNameWithPage(param.vName,start,end,function (err,data) {
		if(err != null){
			console.log(err);
		}else {
            if(data == null){
                res.json({
                    msg : '未找到结果'
                });
            }else{
                res.json({data:data,total:total});
            }
		}
	});
})

module.exports = router;
