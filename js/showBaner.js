/*
 * showBrand
 * sunxiaowen
 * 9-23
 * 按钮区分样式请用 last
 * num 总条数
 * everNum 显示多少条
 * leftButton 左侧按钮
 * rightButton 右侧按钮
 * startNum 开始页数
 * box 每个小块
 * */
;(function($){
    $.fn.showBrand=function(poster){
        var defaults={
                "num":100,
                "everNum":10,
                "box":"",
                "leftButton":"",
                "rightButton":"",
                "startNum":0
            },
            param={};
        $.extend(param,defaults,poster || {});
        param.dom=$(this);
        var showBrandIng=(function(){
            return{
                init:function(){
                    var self = this;
                    this.setDefault();
                    this.leftSlide();
                    if(param.everNum<param.num){
                        this.autoSlise();
                        this.clearAuto();
                    }
                    param.rightButton.on("click",function(){
                        self.rightSlide();
                    });
                },

                setDefault:function(){
                    if(param.everNum<param.num){
                        param.rightButton.removeClass("last");
                    }
                },

                leftSlide:function(){
                    param.leftButton.on("click",function(){
                        var num=Math.ceil(param.num/param.everNum);
                        param.startNum--;
                        if(param.startNum<=0){
                            param.leftButton.addClass("last");
                            if(num!=1){
                                param.rightButton.removeClass("last");
                            }
                            param.startNum=0;
                        }else{
                            param.rightButton.removeClass("last");
                        }
                        $.each(param.box,function(){
                            $(this).children().eq(param.startNum).show(500).next().hide(500);
                        });
                    });
                },


                rightSlide:function(){
                    var num=Math.ceil(param.num/param.everNum);
                    param.startNum++;
                    if((param.startNum+1)>=num){
                        param.rightButton.addClass("last");
                    }else {
                        param.rightButton.removeClass("last");
                    }
                    if(param.startNum>=num){
                        param.startNum=num-1;
                        return;
                    }
                    $.each(param.box,function(){
                        if (param.startNum==0) {
                            $(this).children().eq(0).show(500);
                            $(this).children().eq(num-1).hide(500);
                        }else{
                            $(this).children().eq(param.startNum-1).hide(500).next().show(500);
                        }
                    });
                    param.leftButton.removeClass("last");
                },

                autoSlise: function() {
                    var self = this;
                    var num=Math.ceil(param.num/param.everNum);
                    this.auto = setInterval( function() {
                        if(param.startNum+1==num){
                            param.startNum=-1;
                        }
                        self.rightSlide();
                    },8000);
                },

                clearAuto:function() {
                    var self = this;
                    param.rightButton.parent().parent().on('mouseover', function() {
                        clearInterval(self.auto);
                    });
                    param.rightButton.parent().parent().on('mouseleave', function() {
                        self.autoSlise();
                    });
                }
            };
        })();

        showBrandIng.init();
    };
})(jQuery);