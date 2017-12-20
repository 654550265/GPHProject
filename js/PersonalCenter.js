/*
* list
* @date: 2015-12-29
* @author: SunXiaowen
*/
;(function(win,$,pubFuc){
	var url=pubFuc.url(),
	    urls=pubFuc.urls();
	
	var api={
		loginOut:url+"/user/mallLoginOut/",
		OrderInfoUrl:url+"/myinfo"
	};
	
    var list=(function(){    	
    	return{
    		init:function(){ 
    			var _this_=this;  
    			this.operaHref();
    			this.loginout();
        	}, 
        	loginout:function(){
        		$(".J_loginout").bind("click",function(){
        				pubFuc.load(api.loginOut,null,"POST",function(s){
            				if(s.code==0){
            				    location.href=urls+"/index/";
            				}else{
            					alert("退出失败！");
            				}
            			},function(e){
            				console.log(e);
            			});	      			
        		});
        	},
        	operaHref:function(){
        		pubFuc.load(api.OrderInfoUrl,null,"get",function(s){
        			var data=s.data;
    				$(".integral").text(data.score);
    				$(".casht").text(data.cash+"元");
    				$(".shopping").text(data.cartNum);
    				$(".userName").text(data.dealerName);
    				if(data.logo==null){
    					$(".UserImage").attr("src",urls+"/image/avatar!100100.jpg");
    				}else{
    					$(".UserImage").attr("src",data.logo);
    				}
        		},function(e){
    				console.log(e);
    			});	
        	}
    	};
    })();
    $(function(){
    	list.init();
    	
    });
})(this,jQuery,pubFuc||{});

