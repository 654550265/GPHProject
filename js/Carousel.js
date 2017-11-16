;(function(win,$,undefined){
    var falseScreen=function(dom,liWidth,is_num,leftBut,rightBut){
        var _this_=this;
        this.dom=dom;
        this.is_num=is_num;
        this.liWidth=liWidth;
        this.screenWidth=this.dom.outerWidth(true);
        this.distance=0;
        this.nowPos=0;
        this.bigBannerBox=this.dom.find("ul").first();
        this.bigBannerBoxLi=this.bigBannerBox.find("li");
        this.num=this.bigBannerBoxLi.length;
        this.totleNum=Math.ceil((this.liWidth*this.num)/this.screenWidth);
        if(this.is_num){
            this.smallBannerBox=this.dom.find("ul").last();
            this.smallBannerLi=this.dom.find("ul").last().find("li");
            this.smallBannerLiFirst=this.smallBannerLi.first();
            this.clickSwitch();
        }
        this.setCss();
        this.autoSwitch();
        $(this.dom).bind("mouseover",function(){
            _this_.stopFlash();
        });

        $(this.dom).bind("mouseleave",function(){
            _this_.autoSwitch();
        });

        if(leftBut){
            leftBut.bind("click",function(){
                _this_.leftSwitch();
            });
            leftBut.bind("mouseover",function(){
                _this_.stopFlash();
            });
        }

        if(rightBut){
            rightBut.bind("click",function(){
                _this_.rightSwitch();
            });
            rightBut.bind("mouseover",function(){
                _this_.stopFlash();
            });
        }
    };

    falseScreen.prototype={
        setCss:function(){
            this.bigBannerBox.css({
                width:this.liWidth*this.num+"px",
                position:"absolute",
                left:"0px",
                top:"0px"
            });
            this.bigBannerBoxLi.css({
                width:this.liWidth+"px",
                float:"left",
                height:this.dom.height()+"px"
            });
            if(this.is_num){
                this.smallBannerBox.css({
                    width:this.num*this.smallBannerLiFirst.outerWidth(true)+"px",
                    left:"50%",
                    marginLeft:(-(this.num*this.smallBannerLiFirst.outerWidth(true))/2)+"px"
                });
            }
        },

        autoSwitch:function(){
            var _this_=this;
            this.autoBoll=setInterval(function(){
                _this_.leftSwitch();
            },5000);
        },

        leftSwitch:function(){
            this.nowPos++;
            if(this.nowPos>=this.totleNum){
                this.nowPos=0;
            }
            this.distance=-this.screenWidth*this.nowPos;
            this.bigBannerBox.animate({
                left:this.distance+"px"
            });
            if(this.is_num){
                this.smallBannerLi.removeClass("on");
                this.smallBannerLi.eq(this.nowPos).addClass("on");
            }
        },

        rightSwitch:function(){
            this.nowPos--;
            if(this.nowPos<0){
                this.nowPos=this.totleNum-1;
            }
            this.distance=-this.screenWidth*this.nowPos;
            this.bigBannerBox.animate({
                left:this.distance+"px"
            });
            if(this.is_num){
                this.smallBannerLi.removeClass("on");
                this.smallBannerLi.eq(this.nowPos).addClass("on");
            }
        },

        clickSwitch:function(){
            var _this_=this;
            this.smallBannerBox.find("li").bind("click",function(){
                _this_.nowPos=$(this).index()-1;
                _this_.leftSwitch();
            });
        },

        stopFlash:function(){
            clearInterval(this.autoBoll);
        }
    };

    falseScreen.init=function(dom,liWidth,is_num,leftBut,rightBut){
        var _this_=this;
        new _this_(dom,liWidth,is_num,leftBut,rightBut);
    };

    window["falseScreen"]=falseScreen;
})(this,jQuery,{});

    
