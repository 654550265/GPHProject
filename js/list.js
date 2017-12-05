(function(win,$){
    var dom={
        "J_list":".J_list",
    };
    var list=(function(){
        return{
            init:function(){
                var _this_=this;
                this.showBg();/*鼠标经过列表的效果*/
            },
            showBg:function(){
                $(dom.J_list).on("mouseover","li",function(){
                    $(this).addClass("on");
                    $(this).find('.pmodel').show();
                    $(this).siblings().removeClass("on").find('.pmodel').hide();
                });
            },
        }
    })();
    $(function(){
        list.init();
    })
})(this,jQuery);