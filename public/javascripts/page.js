/**
 * Created by Administrator on 2016/12/12.
 */
//设置每页显示的数量
var pager = null;
function initPager(vName,currentPage,singlePage,total){
    //配置翻页工具
    pager = $('.pagination').jqPagination({
        current_page: currentPage,
        max_page: Math.ceil(total/singlePage),
        paged: function(page) {
            showData(vName,page,singlePage);
        }
    });
}
//更新页面内容
function showData(vName,page,singlePage) {
    $.ajax({
        type: "POST",
        url: "/search/pageValue.json",
        data: {
            vName : vName,
            page:page,
            singlePageCount:singlePage
        },
        success: function(data){
            var dom = $('#dataTable'),str = '';
            if(data != null){
                dom.empty();
                if(data.msg != null){
                    dom.html(data.msg);
                }else{
                    if(pager == null){
                        initPager(vName,1,singlePage,data.total);
                    }
                    for(var i=0;i<data.data.length;i++){
                        str = str + '<li>' + (i+1) + '..<a href="/info.html?v="' + data.data[i].id + '>' + data.data[i].name + '</a></li>';
                    };
                    dom.append(str);
                }
            };
        }
    });
}