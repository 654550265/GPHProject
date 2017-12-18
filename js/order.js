/*
* list
* @date: 2015-12-29
* @author: SunXiaowen
*/
;(function(win,$,pubFuc){
	var url=pubFuc.url(),
	    urls=pubFuc.urls();
	
	var api={
		myInfoUrl:url+"/myinfo",
		getOrderNumUrl:url+"/order/getOrderCountByDealerId",
		getOrderInfoFirstUrl:url+"/order/getOrderInfoFirst",
		cancelOrderUrl:url+"/order/cancel/",
		remarkUrl:url+"/order",
		orderReceipturL:url+"/order/receipt/"
	};
	
	var dom={
		"per_int_order":".per_int_order",
		"Mask_moudel":".Mask_moudel",
		"ejectinfo":".ejectinfo",
		"sureinfo":".sureinfo",
		"remarkInfo":".remarkInfo",
		"are":".are",
		"ares":".ares",
		"buttinSures":".buttinSures",
		"sureOK":".sureOK",
		"ejectClose":".ejectClose",
		"remarkArea":".remarkArea",
		"sureRemaker":".sureRemaker",
		"sureinfonyt":".sureinfonyt",
		"sureReject":".sureReject"
	};
	
    var list=(function(){    	
    	return{
    		init:function(){ 
    			var _this_=this;
    			this.operaMyInfo();
    			this.operaInfoFirst("1");
    			this.operaInfoFirst("2");
    			this.operaInfoFirst("3");
    			this.operaPayImmediately();
    			this.operaClickCancel();
    			this.operaRemaker();
    			this.operaLeftOn();
    			this.operaSeeEmali();
    			this.operaGoodsReceipt();
        	},
        	operaSeeEmali:function(){
        		$(dom.per_int_order).on("click",".seeEmali",function(){
        			if($(".logisticsUrl").text()==""){
        				$(".Mask_moudel").show(10,function(){
            				$(".logisticsInfo").fadeIn(300);
            				$(".iframe p").show();
            			});
        			}else{
        				$(".Mask_moudel").show(10,function(){
            				$(".logisticsInfo").fadeIn(300);
            				$(".J_Track_Iframe").show();
        					$(".J_Track_Iframe").attr("src",$(".logisticsUrl").text());
            			});
        				
        			}
        			
        			
        		});
        		$(".address_close").bind("click",function(){
        			$(".logisticsInfo").fadeOut(300,function(){
        				$(".Mask_moudel").hide();
        				$(".iframe p").hide();
        			});
        		});
        	},
        	operaRemaker:function(){
        		var _this_=this;
        		var orderIDs="";
        		$(dom.per_int_order).on("click",".remarker",function(){
        			orderIDs=$(this).parents(".orderLi_l").find(".orderID").text();
        			$(dom.Mask_moudel).show(10,function(){
						$(dom.remarkInfo).fadeIn(300);
						$(dom.remarkArea).val("");
					});
        		});
        		$(dom.sureRemaker).bind("click",function(){
        			if($(".remarkArea").val()==""){
        				
						return false;
					}
        			var data={};
        			data._method="put";
        			data.buyerRemark=$(dom.remarkArea).val();
        			data.id=orderIDs;
        			pubFuc.load(api.remarkUrl,data,"post",function(s){
        				if(s.code=="0"){
        					$(dom.remarkInfo).fadeOut(300,function(){
        						$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text("添加备注成功！");	
            						$(dom.sureOK).addClass("sureOK_Remaker");
            					});
        					});
        					
        				}else{
        					$(dom.remarkInfo).fadeOut(300,function(){
        						$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text(s.msg);
            						$(dom.sureOK).addClass("sureOK_Remaker");
            					});
        					});
        					
        				}
            		},function(e){
            			console.log(e);
            		});
        		});
        		$(".remarkClose").bind("click",function(){
        			$(dom.remarkInfo).fadeOut(300,function(){
        				$(dom.Mask_moudel).hide();
					});
        		});
        		$(dom.sureinfo).on("click",".sureOK_Remaker",function(){
        			$(this).removeClass("sureOK_cancel");
        			$(dom.sureinfo).fadeOut(300,function(){
        				$(dom.Mask_moudel).hide();
						$(dom.ares).text("");	
					});
        		});
        		$(".remarkClose").bind("click",function(){
        			$(dom.remarkInfo).fadeOut(300,function(){
        				$(dom.Mask_moudel).hide();
        			});
        		});
        	},
        	operaClickCancel:function(){
        		var _this_=this;
        		var orderIDs="";
        		$(dom.per_int_order).on("click",".onClose",function(){
        			orderIDs=$(this).parents(".orderLi_l").find(".orderID").text();
        			$(dom.Mask_moudel).show(10,function(){
						$(dom.ejectinfo).fadeIn(300);
						$(dom.are).text("您确定要取消该订单吗？");
						$(dom.buttinSures).addClass("buttinRejct");
					});
        		});
        		$(dom.sureReject).on("click",".buttinRejct",function(){
        			$(".buttinRejct").removeClass("buttinRejct");
        			$(dom.ejectinfo).fadeOut(300,function(){
        				pubFuc.load(api.cancelOrderUrl+orderIDs,null,"post",function(s){
            				if(s.code=="0"){
            					$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text("取消订单成功！");	
            		    			_this_.operaInfoFirst("1");
            						$(dom.sureOK).addClass("sureOK_cancels");
            						location.reload();
            					});
            				}else{
            					$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text(s.msg);
            						$(dom.sureOK).addClass("sureOK_cancels");
            					});
            				}
            			},function(e){
                			console.log(e);
                		});
        			});    				
        		});
        		$(dom.sureinfonyt).on("click",".sureOK_cancels",function(){
        			$(this).removeClass("sureOK_cancels");
        			$(dom.sureinfo).fadeOut(300,function(){
        				$(dom.Mask_moudel).hide();
						$(dom.ares).text("");	
					});
        		});
        		$(dom.ejectClose).bind("click",function(){
        			$(dom.ejectinfo).fadeOut(300,function(){
						$(dom.Mask_moudel).hide();
						$(dom.are).text("");
					});
        		});
        	},
        	operaGoodsReceipt:function(){
        		var _this_=this;
        		var goodsSureID="";
        		$(dom.per_int_order).on("click",".goodsReceipt",function(){
        			goodsSureID=$(this).parents(".orderLi_l").find(".orderID").text();
        			$(dom.Mask_moudel).show(10,function(){
            			$(dom.are).text("是否确认收货？");
        				$(dom.ejectinfo).fadeIn(300);
        				$(dom.buttinSures).addClass("orderSure");
        			});
        		});
        		$(dom.sureReject).on("click",".orderSure",function(){
    				$(".buttinRejct").removeClass("buttinRejct");
        			$(dom.ejectinfo).fadeOut(300,function(){
        				pubFuc.load(api.orderReceipturL+goodsSureID,null,"get",function(s){
            				if(s.code=="0"){
            					$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text("确认收货成功！");	
            						_this_.operaInfoFirst("3");
            						$(dom.sureOK).addClass("sureOK_recei");
            						location.reload();
            					});
            				}else{
            					$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text(s.msg);
            						$(dom.sureOK).addClass("sureOK_recei");
            					});
            				}
            			},function(e){
                			console.log(e);
                		});
        			});    				
        		});
        		$(dom.sureinfonyt).on("click",".sureOK_recei",function(){
        			$(this).removeClass("sureOK_recei");
        			$(dom.sureinfo).fadeOut(300,function(){
        				$(dom.Mask_moudel).hide();
						$(dom.ares).text("");	
					});
        		});
        	},
        	
        	operaLeftOn:function(){
        		$(".personal_left dd").bind("mouseover",function(){
        			$(this).addClass("on");
        		});
        		$(".personal_left dd").bind("mouseleave",function(){
        			$(this).removeClass("on");
        		});
        	},
        	operaPayImmediately:function(){
        		$(dom.per_int_order).on("click",".payImmediately",function(){
        			var orderID=$(this).parents(".per_int_order").find(".orderID").text();
					var totalAmout=$(this).parents(".per_int_order").find(".amountMonet").text().split("￥")[1];
        			window.location.href=urls+"/payment/submit?parentOrderId="+orderID+"&totalAmount="+totalAmout;
        		});
        	},
        	operaMyInfo:function(){
        		
        		pubFuc.load(api.myInfoUrl,null,"GET",function(s){
        			$(".myName").text(s.data.dealerName);
        			$(".myPhoneInfo").text(s.data.mobile);
        			$(".phoneInfo").text(s.data.mobile);
        		},function(e){
        			console.log(e);
        		});
        		pubFuc.load(api.getOrderNumUrl,null,"GET",function(s){
        			$.each(s.data,function(i,s){
        				$(".Count"+s.os).text(s.count);
        			});
        		},function(e){
        			console.log(e);
        		});
        		$.each($(".order_info_table font"),function(){
        			if($(this).text()==null || $(this).text()=="" || $(this).text()=="null"){
        				$(this).text("-");
        			}
        		});
        		
        		
        	},
        	operaInfoFirst:function(stutasty){
        		pubFuc.load(api.getOrderInfoFirstUrl+"/"+stutasty,null,"GET",function(s){
        			var orderinfo='<div class="orderSoure_head fl margin-left-9 margin-top-9">'+
						'<li class="commodity">商品信息</li>'+
						'<li class="unitPrice">单价</li>'+
						'<li class="goodsNumber">数量</li>'+
						'<li class="aoumtMoney">金额</li>'+
						'<li class="stateType">状态</li>'+
						'<li class="operation">操作</li>'+
					'</div>';
        			$.each(s.data.rows,function(i,s){
        				var data_status=pubFuc.operaOrderStatus(s.status);
        				var orderTime=pubFuc.operaWu_Time(s.orderTime);
            			var payTime=pubFuc.operaWu_Time(s.payTime);
            			
            			var nums=0;
            			orderinfo+='<div class="orderLi fl margin-left-9">'+
            				'<div class="orderLi_l fl">'+
						   '<div class="orderLi_l_s fl">'+
						   '<span>订单编号：<font class="orderID">'+s.orderId+'</font></span>'+
							'<span>下单时间：'+orderTime+'</span>'+
							'<span class="'+(payTime==""?"hide":"")+'">付款时间：'+payTime+'</span>'+
						   '</div>'+
						   '<div class="orderLi_l_b fl">'+
						   '<div class="orderLi_l_b_l fl">';
            			$.each(s.orderGoods,function(n,v){
            				if(v.image.indexOf("/0.jpg")<0){
								v.image=v.image.replace(".jpg","!240240.jpg").replace(".png","!240240.png");
							}
        					nums=nums*1+1;
        					orderinfo+= '<div class="orderLi_l_b_ls fl">'+
        						'<div class="orderLi_l_d fl">'+
						   '<dl>'+
						   '<a href="'+urls+'/product/'+v.id+'"><img src="'+v.image+'" /></a>'+
							'<dt><a href="'+urls+'/product/'+v.id+'">'+v.title+'</a></dt>'+
//							'<dd><a href="'+urls+'/shopinfo/'+v.alias+'">'+v.shopName+'</a></dd>'+
						   '</dl>'+
						   '</div>	'+
						   '   <div class="order_num_price fl center">'+
							'<font>￥'+v.saleUnitPrice.toFixed(2)+'</font>'+
							   '</div>	'+
							   '<div class="order_num_price fl center">'+v.num+'</div>		'+
							   '</div>';
        				});		
            			if(nums==1){
							var border_l=130+"px";
						}else{
							var border_l=(nums)*91-1+"px";
						}
							
						orderinfo+='</div>'+
				   '<div class="monet_aount center border-l fl" style="height:'+border_l+'">'+
				   '<dl>'+
				   '	<dt class="amountMonet">￥'+s.amount.toFixed(2)+'</dt>'+
					'	<dd>(含运费：￥'+s.freightAmount+')</dd>'+
						   '</dl>'+
					   '</div>'+
				   '<div class="typeStay center border-l fl" style="height:'+border_l+'">'+
				   '<font class="statust">'+data_status+'</font>'+
					'<font class="statust"><a href="'+urls+'/buyer/order-info?orderId='+s.orderId+'">订单详情</a></font>'+
					'<font class="statust"><a href="'+urls+'/buyer/order/mall/selectContract/'+s.orderId+'">查看合同</a></font>'+
					'<font>'+(s.isNeedInvoice=="0"?"不需要发票":"需要发票")+'</font>'+
					'<font>快递：'+(s.logisticsName==null?"-":s.logisticsName)+'</font>'+
					   '</div>'+
				   '<div class="operations center border-l fl" style="height:'+border_l+'">'+
				   '<input type="button" value="立即支付" class="fl '+(s.status=="1"?"payImmediately":"hide")+'" />'+
					'<font><a href="javascript:;" class="'+(s.status=="3"?"seeEmali":"hide")+'">查看物流</a></font>'+
					'<font><a href="javascript:;" class="'+(s.status=="1"?"onClose":"hide")+'">取消订单</a></font>'+
					'<font><a href="javascript:;" class="remarker">备注</a></font>'+
					'<font><a href="javascript:;" class="'+(s.status=="3"?"goodsReceipt":"hide")+'">确认收货</a></font>'+
					'<a class="logisticsUrl hide">'+s.logisticsUrl+'</a>'+
					   '</div>'+
				   '</div>'+
				   '</div>'+
			   '</div>';

	        			$(".per_"+s.status).html(orderinfo);
        			});
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


