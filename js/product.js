(function (win, $) {
    var dom = {
        "J_imgBackgroud": ".J_imgBackgroud",
        "J_bigImage": ".J_bigImage",
        "J_hoverImage": ".J_hoverImage",
        "J_detailAttr": ".J_detailAttr",
        "J_minNum":".J_minNum",
        "J_addNum":".J_addNum",
        "J_goodNum":".J_goodNum",
        "J_errors":".J_errors",
    }
    var detail = (function () {
        return {
            init: function () {
                var _this_ = this;
                this.doImage();
                this.check();
            },
            openBig: function () {
                $(dom.J_hoverImage).css({
                    "backgroundImage": "url(" + $(dom.J_bigImage).find("img").attr("src").replace("!450450.jpg", "!800800.jpg").replace("!450450.png", "!800800.png") + ")",
                    "backgroundColor": "#fff"
                });
            },
            check: function () {
                $('.J_detailAttr a').click(function () {
                    for (var i = 0; i < $('.J_detailAttr a').length; i++) {
                        $('.J_detailAttr a')[i].setAttribute('class', '');
                    }
                    $(this).attr('class', 'on');
                    console.log(123);
                })
            },
            doImage: function () {
                $(dom.J_minNum).bind("click",function(){
                    $(dom.J_errors).hide().html("");
                    var num=parseInt($(dom.J_goodNum).val()),
                        leastNum=parseInt($(dom.J_goodNum).attr("attr-least")),
                        changeNum=parseInt($(dom.J_goodNum).attr("attr-batch"));
                    num-=changeNum;
                    if(num<leastNum){
                        $(dom.J_errors).show().html("数量不得小于起订量");
                        $(dom.J_goodNum).val(leastNum);
                    }else{
                        $(dom.J_goodNum).val(num);
                    }

                });

                $(dom.J_addNum).bind("click",function(){
                    $(dom.J_errors).hide().html("");
                    var num=parseInt($(dom.J_goodNum).val()),
                        changeNum=parseInt($(dom.J_goodNum).attr("attr-batch"));
                    num+=changeNum;
                    $(dom.J_goodNum).val(num);
                });
                var imageIndex = 0,
                    _this_ = this;
                $(dom.J_smallImage).on("mouseover", "li", function () {
                    var i = $(this).index(),
                        imageUrl = $(this).find("img").attr("attr-bigImageUrl"),
                        allNum = $(dom.J_smallImage).find("li").length;
                    $(this).siblings().removeClass("on");
                    $(this).addClass("on");
                    $(dom.J_bigImage).find("img").attr("src", imageUrl);
                    _this_.openBig();
                    if (i == allNum - 1) {
                        imageIndex = -1;
                    } else {
                        imageIndex = i;
                    }
                });

                $(dom.J_leftImage).bind("click", function () {
                    imageIndex--;
                    var allNum = $(dom.J_smallImage).find("li").length;
                    if (imageIndex < 0) {
                        imageIndex = allNum - 1;
                    }
                    $(dom.J_smallImage).find("li").removeClass("on");
                    $(dom.J_smallImage).find("li").eq(imageIndex).addClass("on");
                    var imageUrl = $(dom.J_smallImage).find("li").eq(imageIndex).find("img").attr("attr-bigImageUrl");
                    $(dom.J_bigImage).find("img").attr("src", imageUrl);
                    if (imageIndex < 4) {
                        $(dom.J_smallImage).css({
                            "left": "0px"
                        });
                    } else {
                        $(dom.J_smallImage).css({
                            "left": "-" + (103 * (imageIndex - 3)) + "px"
                        });
                    }
                });

                $(dom.J_rightImage).bind("click", function () {
                    imageIndex++;
                    var allNum = $(dom.J_smallImage).find("li").length;
                    if (imageIndex < allNum) {
                        $(dom.J_smallImage).find("li").removeClass("on");
                        $(dom.J_smallImage).find("li").eq(imageIndex).addClass("on");
                        var imageUrl = $(dom.J_smallImage).find("li").eq(imageIndex).find("img").attr("attr-bigImageUrl");
                        $(dom.J_bigImage).find("img").attr("src", imageUrl);
                        if (imageIndex >= 3) {
                            $(dom.J_smallImage).css({
                                "left": "-" + (103 * (imageIndex - 3)) + "px"
                            });
                        } else {
                            $(dom.J_smallImage).css({
                                "left": "0px"
                            });
                        }
                        if (imageIndex == allNum - 1) {
                            imageIndex = -1;
                        }
                    }
                });

                $(dom.J_bigImage).bind("mousemove", function (e) {
                    var o_x = $(this).offset().left, /*图片页面的距离*/
                        o_y = $(this).offset().top,
                        e_x = e.pageX, /*鼠标距离页面的距离*/
                        e_y = e.pageY,
                        d_x = e_x - o_x, /*鼠标距离本图的距离*/
                        d_y = e_y - o_y,
                        p_x, /*背景定位距离*/
                        p_y,
                        b_x = d_x - 89,
                        b_y = d_y - 89;
                    if (d_x <= 89) {
                        b_x = 0;
                    } else if (e_x > o_x + 269) {
                        b_x = 179;
                    }
                    if (d_y <= 89) {
                        b_y = 0;
                    } else if (e_y > o_y + 269) {
                        b_y = 179;
                    }
                    $(dom.J_imgBackgroud).show().css({
                        "left": b_x + "px",
                        "top": b_y + "px"
                    });
                    p_x = parseInt(($(dom.J_imgBackgroud).offset().left - o_x) * 800 / 358);
                    p_y = parseInt(($(dom.J_imgBackgroud).offset().top - o_y) * 800 / 358);
                    $(dom.J_hoverImage).show().css({
                        "left": (o_x + 358) + "px",
                        "top": o_y + "px",
                        "backgroundRepeat": "no-repeat",
                        "backgroundPosition": -p_x + "px " + -p_y + "px",
                    });
                });

                $(dom.J_bigImage).bind("mouseleave", function () {
                    $(dom.J_hoverImage).hide();
                    $(dom.J_imgBackgroud).hide();
                });
            }
        }
    })();
    $(function () {
        detail.init();
    });
})(this, jQuery);