/**
 * Created by Administrator on 2016/12/19.
 */
var url = require("url");
/**
 *  url中文路径解析中间件
 */
function urlEncodeChinese(req,res,next){
    var decodeurlchinese = url.parse(req.url);
    var tmpdecodepath = decodeurlchinese.pathname;
    decodeurlchinese.pathname = decodeURIComponent(decodeurlchinese.pathname);
    decodeurlchinese.path = decodeurlchinese.path.replace(tmpdecodepath,decodeurlchinese.pathname); // 不需要正则全局替换，这样有可能把参数也给替换了
    // decodeurlchinese.href = decodeurlchinese.href.replace(tmpdecodepath,decodeurlchinese.pathname); // 同上(只用转换一个即可)

    // 因为for ...in 虽然可以全部便利object 名称但有时输出一些内容时显不会，所以暂时先替换req里的url、originalUrl(path暂时不替换)，路由能正确识别中文了。
    //暂时先这样，下次把req里面全都遍历完。

    //  console.log(decodeurlchinese.path);
    req.url =  req.originalUrl  = decodeurlchinese.path;
    next();
}

module.exports = urlEncodeChinese;