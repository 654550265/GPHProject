(function(win,$){
    var dom={
        "J_list":".J_list",
        "J_searchMain":".J_searchMain",
        "J_combinationBtn":".J_combinationBtn",
        "J_searchList":".J_searchList",
        "J_combination":".J_combination",
        "J_nums":".J_nums",
        "J_addNum":".J_addNum",
        "J_minNum":".J_minNum",
        "J_leastNum":".J_leastNum",
    };
    var list=(function(){
        return{
            init:function(){
                var _this_=this;
                this.showBg();/*鼠标经过列表的效果*/
                this.keyup();
                this.add();
                this.min();
                this.checkNum();
            },
            showBg:function(){
                $(dom.J_list).on("mouseover","li",function(){
                    $(this).addClass("on");
                    $(this).find('.pmodel').show();
                    $(this).siblings().removeClass("on").find('.pmodel').hide();
                });
                $(dom.J_searchList).on("click",dom.J_combinationBtn,function(){
                    // var id=$(this).attr("attr-id");
                    if($(this).attr("class").indexOf("open")>-1){
                        $(dom.J_combinationBtn).removeClass("open");
                        $(dom.J_searchList+" ul").removeClass("active");
                        $(dom.J_combination).remove();
                    }else{
                        $(dom.J_combinationBtn).removeClass("open");
                        $(dom.J_searchList+" ul").removeClass("active");
                        $(dom.J_combination).remove();
                        $(this).addClass("open");
                        $(this).parent().parent().addClass("active");
                        //这个是请求后台接口更新组合购的方法，自己写，不提供方法
                        // _this_.GoodsCombination(id,0,0);
                    }
                });
            },
            checkNum:function(){
                $(dom.J_searchMain).on("keyup",dom.J_leastNum,function(){
                    var nowNum=$(this).val(),
                        beachNum=parseInt($(this).attr("attr-beach")),
                        quantityNum=parseInt($(this).attr("attr-quantity"));
                    $(this).parent().find(dom.J_productError).hide();
                    if(isNaN(nowNum)){
                        nowNum=quantityNum;
                        $(this).val(nowNum);
                    }
                });
            },
            keyup:function(){
                $(dom.J_searchList).on("keyup",dom.J_nums,function(){
                    var v=$(this).val(),
                        order=$(this).next().attr("attr-order");
                    $(dom.J_buy).next().empty();
                    if(isNaN(v)){
                        $(this).val(order);
                    }
                });
            },
            add:function(){
                $(dom.J_searchMain).on("click",dom.J_addNum,function(){
                    var  num=parseInt($(this).prev().val());
                    beachNum=parseInt($(this).prev().attr("attr-beach"));
                    $(this).parent().find(dom.J_productError).hide();
                    num+=beachNum;
                    $(this).prev().val(num);
                });
            },
            min:function(){
                $(dom.J_searchMain).on("click",dom.J_minNum,function(){
                    var  num=parseInt($(this).next().val());
                    beachNum=parseInt($(this).next().attr("attr-beach")),
                        quantityNum=parseInt($(this).next().attr("attr-quantity"));
                    $(this).parent().find(dom.J_productError).hide();
                    num-=beachNum;
                    if(num<quantityNum){
                        num=quantityNum;
                    }
                    $(this).next().val(num);
                });
            },
        }
    })();
    $(function(){
        list.init();
    })
})(this,jQuery);