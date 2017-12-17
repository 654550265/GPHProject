/*
* top
* @date: 2015-12-24
* @author: SunXiaowen
*/
;(function(win,$,pubFuc){
    var url=pubFuc.url(),
	    urls=pubFuc.urls();
	
	var api={
		"getHotSearch":url+"/index/mall/hotSearch",
		"categoriesUrl":url+"/category/selectCategory/",		
		"loginOut":url+"/user/mallLoginOut/",
		"searchUrl":urls+"/search/",
		"shopUrl":urls+"/shop/",
		"loginUrl":urls+"/login/",
		"loginOutBeore":urls+"/loginOut",
        "recordClickUrl":url+"/adver/adverImgClicNumStatis",
        "suggest":url+"/goods/mall/suggest"
	};
	
	var dom={
		"J_nav":".J_nav",
	    "J_banner":".J_banner",
		"J_categories":".J_categories",
		"J_cate_left":".J_cate_left",
        "J_cateBox":".J_cateBox",
        "J_cate_right":".J_cate_right",
        "J_loginout":".J_loginout",
        "J_t_showCart":".J_t_showCart",
        "J_t_pay":".J_t_pay",
        "J_t_num":".J_t_num",
        "J_search":".J_search",
        "J_t_searchOne":".J_t_searchOne",
        "J_t_search":".J_t_search",
        "J_loginTargetUrl":".J_loginTargetUrl",
        "J_hot_search":".J_hot_search",
        "J_info":".J_info",
        "J_openLink":".J_openLink",
        "J_productShop":".J_productShop",
        "J_selProductShop":".J_selProductShop",
        "J_addFav":".J_addFav",
        "J_ritZx":".J_ritZx",
        "J_showZx":".J_showZx",
        "J_shopSearch":".J_shopSearch",
        "J_searchAll":".J_searchAll",
        "J_leaveZx":".J_leaveZx",
        "J_ritBtoomOp":".J_ritBtoomOp",
        "J_smShow":".J_smShow",
        "J_qq_click":".J_qq_click",
        "J_suggest":".J_suggest",
        "J_searchWrapper":".J_searchWrapper"
	};
	
    var top=(function(){    	
    	return{
    		init:function(){ 
    			var _this_=this; 
    			pubFuc.setUrlCookie(dom.J_nav,dom.J_cate_right+" a");/*记录每次进入搜索页的url*/
    			pubFuc.getCarNum($(dom.J_t_num));
    			this.getHotSearch();/*获取热门搜索*/
    			this.addFavorite();
    			this.selProShop();
    			this.search();
    			this.searchGoods();
    			this.setDefault();
        		this.getCategories();/*取分类*/
        		this.leftMenuOver();/*mouseover显8大类小分类*/
        		if(!menuShow){
        		    this.showCate();
        		}    			
    			$(dom.J_categories).bind("mouseleave",function(){
    				_this_.leftMenuLeave();
    			});
    			
    			this.loginout();
    			this.qqClick();
        	},
        	
        	suggest:function() {
        		var data={},
        			  keyword = $(dom.J_t_searchOne).val();
        		if (keyword) {
        			data.keyword = encodeURI(encodeURI(keyword));
            		pubFuc.load(api.suggest,data,"get",function(s){
    					if (s.code==0) {
    						var suggestHtml='';
    						$.each(s.data,function(i,v) {
    							var urlsSuggest = encodeURI(encodeURI(v.name));
    							suggestHtml+=
    								'<a href="'+api.searchUrl+'?keyword='+urlsSuggest+'"><span>'+v.name+'</span><font>约'+v.num+'个商品</font></a>';
    						});
    						$(dom.J_suggest).html(suggestHtml).show();
    					}
    				},function(e){
    				});
        		}        		
        	},
        	
        	qqClick:function(){
        		$(dom.J_qq_click).on("click",function(){
        			var type=$(this).attr("attr-type"),
        				qq=$(this).attr("attr-qq"),
        				d=JSON.stringify({
						 "type":type,
						 "qq":qq
					});
        			var data=JSON.parse(d);
	    			pubFuc.load(api.recordClickUrl,data,"POST",function(s){
						
					},function(e){
						console.log(e);
					});
        		});
        	},
        	
        	getHotSearch:function(){
    			pubFuc.load(api.getHotSearch,null,"GET",function(s){
    				if(s.code==0){
    					var hHtml="";
    					$.each(s.data,function(i,v){
    						hHtml+=
    							'<a href="'+v.targetUrl+'" attr-code="0" attr-id="'+v.id+'" class="J_clickNum" target="_blank">'+v.word+'</a>';
    					});
    					$(dom.J_hot_search).append(hHtml);
    				}
    			},function(e){
    				console.log(e);
    			});
    		},
        	
        	addFavorite:function(){
        		$(dom.J_addFav).on("click",function(){
        			$(this).addFavorite('收藏本站',location.href);
        		});        		
        	},
        	
        	setDefault:function(){        		
        		$(dom.J_openLink).bind("click",function(){
        			var id=$(this).attr("attr-id");
        			if(id==0){
        				$(this).prev().css({
            				"height":"auto"
            			});
        				$(this).attr("attr-id",1).html("收起");
        			}else{
        				$(this).prev().css({
            				"height":"20px"
            			});
        				$(this).attr("attr-id",0).html("展开");
        			}        			
        		});
        		
        		$(dom.J_leaveZx).on("mouseover",'.mj',function(){
        			var type=$(this).attr('attr-type');
        			$(this).addClass('active').siblings().removeClass('active');
        			if(type){
        				$(dom.J_showZx).show();
        			}else{
        				$(dom.J_showZx).hide();
        			}			
        		});
        		
        		$(dom.J_leaveZx).on("mouseleave",function(){
        			$(dom.J_showZx).hide();
        			$(dom.J_leaveZx).find('a').removeClass('active')
        		});
        		
        		$(dom.J_ritBtoomOp).on('mouseover','a',function(){
        			var type=$(this).attr('attr-type');
        			$(this).addClass('active').siblings().removeClass('active');
        			if(type){
        				$(dom.J_smShow).show();
        			}else{
        				$(dom.J_smShow).hide();
        			}   			
        		});
        		
        		$(dom.J_ritBtoomOp).on("mouseleave",function(){
        			$(dom.J_smShow).hide();
        			$(dom.J_ritBtoomOp).find('a').removeClass('active')
        		});
        		
        	},
        	
        	selProShop:function(){
        		$(dom.J_productShop).on("mouseover",function(){
        			$(dom.J_selProductShop).show();
        		});
        		
        		$(dom.J_productShop).on("mouseleave",function(){
        			$(dom.J_selProductShop).hide();
        		});
        		
        		$(dom.J_selProductShop).on("click","a",function(){
        			var htmls=$(this).html(),
        			      val=$(this).attr("attr-value");
        			$(dom.J_productShop).find("font").html(htmls).attr("attr-value",val);
        			$(dom.J_selProductShop).hide();
        		});
        	},
        	
        	search:function(){
        		var times,
                _this_=this;
        		$(dom.J_searchWrapper).on("mouseleave",function(){
        			$(dom.J_suggest).hide();
        		});
        		
        		$(dom.J_search).bind("click",function(){
        			var k=$(dom.J_t_searchOne).val();
        			      k=encodeURI(encodeURI(k)),
        			      val=$(dom.J_productShop).find("font").attr("attr-value");
        			if(k!==""){
        				//if(val==1){
        					location.href=api.searchUrl+"?keyword="+k;
        				//}
//        				if(val==2){
//        					location.href=api.shopUrl+"?keyword="+k;
//        				}
        			};        			
        		});
        		  var lengthSug;
        		$(dom.J_t_searchOne).bind("keyup",function(event){
        			var k=$(dom.J_t_searchOne).val(),
		                  k=encodeURI(encodeURI(k)),
		                  val=$(dom.J_productShop).find("font").attr("attr-value");		            
		            if(k.indexOf("&")>=0){
		            	$(dom.J_t_searchOne).val("");
		            }		         
        			if(event.keyCode==13){        				
      			        if(k!==""){
      			        	location.href=api.searchUrl+"?keyword="+k;
      			        };
        			}else if(event.keyCode==38) {        				
        				var sygLen =$(dom.J_suggest).children().length-1;
        				if (lengthSug > sygLen) {
        					lengthSug = 0;
        				}
        				sygLen = sygLen - lengthSug;
		            	$(dom.J_suggest).children().eq(sygLen).addClass('on').siblings().removeClass('on');
		            	var htmls = $(dom.J_suggest).children().eq(sygLen).find('span').text();
		            	$(dom.J_t_searchOne).val(htmls);
		            	lengthSug++;
		            }else if(event.keyCode==40){
		            	lengthSug--;
		            	if (lengthSug <= 0) {
		            		lengthSug = $(dom.J_suggest).children().length;
		            	}
		            	var sygLen =$(dom.J_suggest).children().length-1;
		            	var pos = sygLen - lengthSug + 1;
		            	$(dom.J_suggest).children().eq(pos).addClass('on').siblings().removeClass('on');	
		            	var htmls = $(dom.J_suggest).children().eq(pos).find('span').text();
		            	$(dom.J_t_searchOne).val(htmls);
		            }else {
		            	if(times){
							clearTimeout(times);
						}
						times=setTimeout(function(){
							_this_.suggest();
						},500);
						lengthSug=0;
		            }
        		});
        	},
        	
//        	showCart:function(){
//        		$(dom.J_t_showCart).bind("mouseover",function(){
//        			$(dom.J_t_pay).show();
//        		});
//        	},
        	
//        	hideCart:function(){
//        		$(dom.J_t_showCart).bind("mouseleave",function(){
//        			$(dom.J_t_pay).hide();
//        		});
//        	},
        	
        	showCate:function(){
        		$(dom.J_nav).bind("mouseover",function(){
        			$(dom.J_categories).show();
        		});
        		
        		$(dom.J_nav).bind("mouseleave",function(){
        			$(dom.J_categories).hide();
        		});
        	},
			
        	getCategories:function(){
        		var data={};
        		data.goodsInitial=3;
        		pubFuc.load(api.categoriesUrl,data,"GET",function(s){
        			if(s.code==0){
        				var htmls=
        					    '<div class="nav-main-left J_cate_left">'+
                                '<ul>',
                            htmlm='<div class="nav-main-right hide J_cate_right">'+
                            '<div class="get-height">';
        				$.each(s.data,function(i,v){
        					htmlm+=
								'<div class="hide J_cateBox_'+v.cateNo+'">';
        					if(v.hasMallGoods==0){
        						htmls+=
            						'<li class="b'+v.cateNo+'" attr-type="1">'+
                                         '<a href="javascript:;" attr-id='+v.cateNo+'>'+
                                    	 '<img src="'+urls+'/image/index/ic_'+v.cateNo+'.png">'+
										 v.name+'</a>'+
                                         '<span>产品上架中，敬请期待</span>'+
                                     '</li>';
        					}else{
        						htmls+=
            						'<li class="b'+v.cateNo+'" attr-type="2" attr-url="'+urls+'/image/index/ic_'+v.cateNo+'.png"'+'>'+
                                         '<a href="javascript:;" attr-id='+v.cateNo+'>'+
                                         '<img src="'+urls+'/image/index/ic_'+v.cateNo+'.png">'+
                                         v.name+'</a>'+
                                     '</li>';
        						htmlm+='<div class="category-wrapper">';
            					$.each(v.childrens,function(b,x){
            						htmlm+=
            							'<div class="nav-main-type">'+
                                        '<span><a href="'+urls+'/search?categoryId='+x.cateNo+'">'+x.name+'</a></span>'+
                                        '<ul>';
                                    $.each(x.childrens,function(d,y){
//                                    	if(y.hasGoods==0){
//                                    		htmlm+=
//                                        		'<li>|<label>'+y.name+'</label></li>';
//                                    	}
                                    	htmlm+=
                                            '<li>|<a href="'+urls+'/search?categoryId='+y.cateNo+'">'+y.name+'</a></li>';
                                    });   
                                    htmlm+=    
                                        '</ul>'+
                                        '</div>';                                  
            					});
        					}
        					htmlm+=
        						 '</div>';
        					htmlm+='<div class="category-brands">';
        					$.each(v.brand,function(b,x){
        						htmlm+=
        							'<a href="'+urls+'/search?brandId='+x.brandId+'">'+
        							'<img src="'+x.logo+'">'+
        							'</a>';
        					});
        					htmlm+=        						
        						'</div>'+
        						 '</div>';
        				});        				
        				htmls+=
        					'</ul>'+
                            '</div>';
        				htmlm+=
        					'</div>'+
      						 '</div>';
        				$(dom.J_categories).html(htmls+htmlm);        				     				
        			}else{
        				$(dom.J_categories).html("程序错误，请联系客服！");
        			}
        		},function(e){
        			console.log(e);
        		});
        	},
        	
        	leftMenuOver:function(vod){
        		$(dom.J_categories).on("mouseover",dom.J_cate_left+" li",function(){
        		    var id=$(this).find("a").attr("attr-id"),
        		        attrType=$(this).attr("attr-type");
        		    $(this).parent().parent().find("span").hide();
        		    if(attrType==2){
        		    	$(dom.J_cate_left).find("li").removeClass("ov");
        		    	$.each($(dom.J_cate_left).find("li"),function(){
                			var imgUrl=$(this).attr("attr-url");
                			$(this).find("img").attr("src",imgUrl);
                		});
            		    $(this).addClass("ov").find("img").attr("src",urls+'/image/index/ic_on_'+id+'.png');
            		    $(dom.J_cate_right).show();
            		    $(dom.J_cate_right).children().children().hide();
            		    $(dom.J_cateBox+"_"+id).show();
            		    $(dom.J_categories).css({
            			    width:"1200px"
            		    });
            		    var caHeight=$(dom.J_cate_right).children().height();   
            		    if(caHeight<=448){
            		    	$(dom.J_cate_right).css({
            		    		'height':'448px',
            		    		'overflow-y':'hidden'
            		    	});
            		    }else{
            		    	$(dom.J_cate_right).css({
            		    		'height':'448px',
            		    		'overflow-y':'scroll'
            		    	});
            		    }
        		    }
        		    if(attrType==1){        		    	
        		    	$(this).find("span").show(); 
        		    	$(dom.J_cate_left).find("li").removeClass("ov");
        		    	$(dom.J_cate_right).hide();
        		    	$(dom.J_cate_right).children().children().hide();
        		    	$(dom.J_categories).css({
            			    width:"220px"
            		    });
        		    }
        		});
        	},
        	
        	leftMenuLeave:function(){
        		$.each($(dom.J_cate_left).find("li"),function(){
        			var imgUrl=$(this).attr("attr-url");
        			$(this).find("img").attr("src",imgUrl);
        		});
        		$(dom.J_cate_left).find("li").removeClass("ov");
        		$(dom.J_cate_right).hide();
        		$(dom.J_cate_right).children().children().hide();
        		$(dom.J_categories).css({
        			width:"220px"
        		});
        	},        	
        	
        	loginout:function(){
        		var data={};
        		data._cache=Math.random(15);
        		$(dom.J_info).on("click",dom.J_loginout,function(){
        			pubFuc.loadNoSign(api.loginOutBeore,data,"GET",function(d){
        				if(d==0){
	        				pubFuc.load(api.loginOut,null,"POST",function(s){
	        					if(s.code==0){
	        						location.href=urls;
	        					}else{
	        						pubFuc.openWindow("退出失败",300,120);
	        					}
	        				},function(e){
	        					console.log(e);
	        				});	  
        				}    			
        			},function(e){
    					console.log(e);
    				});
        		});
        	},
        	
        	searchGoods:function(){
        		$(dom.J_searchAll).bind("click",function(){
        			var k=$(dom.J_t_search).val();
        			      k=encodeURI(encodeURI(k)),
        			      val=$(dom.J_productShop).find("font").attr("attr-value");
        			if(k!==""){
        				if(val==1){
        					location.href=api.searchUrl+"?keyword="+k;
        				}
        			};        			
        		});
        		
        		$(dom.J_shopSearch).on("click",function(){
        			var key,
      		              vals=$(this).attr("attr-value"),
      		              shopName=$(dom.J_shopSearch).attr("attr-shopname"),
      		              data={};        			
        			if(vals==1){
        				key=$(dom.J_t_search).val();
        				if(key){
          			        data.goodsName=encodeURI(key);
           		        	location.href=urls+'/shopinfo/'+shopName+'?'+$.param(data);
           		        }else{
           		        	location.href=urls+'/shopinfo/'+shopName;
           		        }   
        			}	      
        		});
        		
        		$(dom.J_t_search).bind("keyup",function(event){
        			var key=$(dom.J_t_search).val(),
        			      key=encodeURI(key),
        			      shopName=$(dom.J_shopSearch).attr("attr-shopname"),
        			      data={};
        			if(event.keyCode==13){     
        				if(key){
    		            	data.goodsName=encodeURI(key);
    	           		    location.href=urls+'/shopinfo/'+shopName+'?'+$.param(data);
    	           		}else{
    	           		    location.href=urls+'/shopinfo/'+shopName;
    	           		} 
        			}		             
        		});
        	}
    	};
    })();
    $(function(){
    	top.init();
    });
})(this,jQuery,pubFuc||{});

