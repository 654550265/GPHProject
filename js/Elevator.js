(function (win, $) {
    var dom={
        "J_banner":".J_banner",
        "J_floorGoods":".J_floorGoods",
        "J_small":".J_small",
        "J_floorLi":".J_floorLi",
        "J_dailyRec":".J_dailyRec",
        "J_floor":".J_floor",
        "J_notice":".J_notice",
//		  "J_active":".J_active",
        "J_hotBrand":".J_hotBrand",
        "J_newOrderInfo":".J_newOrderInfo",
        "J_floorCate":".J_floorCate_",
        "J_adverBanner":".J_adverBanner_",
        "J_floorProImg":".J_floorProImg_",
        "J_t_num":".J_t_num",
        "J_clickNum":".J_clickNum",
        "J_b":".J_b",
        "J_showLeft":".J_showLeft",
        "J_showRight":".J_showRight",
        "J_menuLeft":".J_menuLeft",
        "J_recImges":".J_recImges",
        "J_topBanner":".J_topBanner",
        "J_recImg":".J_recImg"
    };
    var index=(function(){
        return {
            init:function(){
                this.menuLeft();
                this.getHotBrand();
            },
            menuLeft:function(){
                var topHeight=$(dom.J_floorGoods).offset().top,
                    windowHeight=$(window).height(),
                    windowWidth=$(window).width(),
//		    	      recHot = $('.J_rechot').offset().top-350,
//		    	      groupBrand = $('.J_groupBrand').offset().top-350,
                    topArray=[];
//		    	topArray.push(groupBrand);
                $.each($(dom.J_floorGoods).children(),function(){
                    topArray.push($(this).offset().top-350);
                });
                //topArray.push(recHot);
                if(windowWidth<=1366){
                    $(dom.J_menuLeft).css({
                        "left":"0"
                    });
                }else{
                    $(dom.J_menuLeft).css({
                        "marginLeft":"-700"+"px",
                        "left":"50%"
                    });
                }
                $(dom.J_menuLeft).css({
                    "position":"fixed",
                    "top":"50%",
                    "marginTop":"-"+($(dom.J_menuLeft).height()/2)+"px"
                });

                $(dom.J_menuLeft).on("click","a",function(){
                    $(this).addClass("on").siblings().removeClass("on");
                });

                $(window).on("scroll",function(){
                    var scrollHeight=$(document).scrollTop(),
                        topArrayNum=topArray.length-1;
                    $.each(topArray,function(i,v){
                        if(i!=topArrayNum){
                            if(v<=scrollHeight&&scrollHeight<topArray[i+1]){
                                $(dom.J_menuLeft).find("a").eq(i).addClass("on").siblings().removeClass("on");
                            }
                        }else{
                            if(v<=scrollHeight){
                                $(dom.J_menuLeft).find("a").eq(i).addClass("on").siblings().removeClass("on");
                            }
                        }
                    });
                    if(scrollHeight>=(topHeight+40-(windowHeight/2))){
                        $(dom.J_menuLeft).slideDown(500);
                    }else{
                        $(dom.J_menuLeft).slideUp(500);
                    }
                });
            },
            getHotBrand:function(){
                $(dom.J_hotBrand).showBrand({
                    "num":80,
                    "everNum":20,
                    "leftButton":$(dom.J_showLeft),
                    "rightButton":$(dom.J_showRight),
                    "box":$(dom.J_b)
                });
            }
        }
    })();
    $(function () {
        index.init();
    })
})(this, jQuery);