/*
* list
* @date: 2015-12-29
* @author: SunXiaowen
*/
;(function(win,$,pubFuc){
	/*var url=pubFuc.url(),
	    urls=pubFuc.urls();*/
	
	/*var api={
		consignaddressUrl:url+"/consignaddress/mallAddress",
		delAddressUrl:url+"/consignaddress/delAddress/",
		addAddressUrl:url+"/consignaddress/addAddress",
		editAddressUrl:url+"/consignaddress/editAddress",
		setdefaultUrl:url+"/consignaddress/setdefault/"
	};*/
	
	var dom={
			"addressList":".addressList",
			"addAddress":".addAddress",
			"sureAddress":".sureAddress",
			"address_close":".address_close",
			
			
			"Mask_moudel":".Mask_moudel",
			"ejectinfo":".ejectinfo",
			"sureinfo":".sureinfo",
			"remarkInfo":".remarkInfo",
			"are":".are",
			"ares":".ares",
			"buttinSures":".buttinSures",
			"J_orderSoure":".J_orderSoure",
			"sureOK":".sureOK",
			"ejectClose":".ejectClose",
	};
	
    var list=(function(){    	
    	return{
    		init:function(){ 
    			var _this_=this;
    			this.jdis=0;
    			this.addressData={};
    			$("#order_l4").addClass("ons");
    			
    			
    			this.operaLeftOn();
    			this.operaMyInfo();

    			_this_.operaInitialization();
    			_this_.operaDeleter();
    			_this_.operaSureAddress();
				_this_.operaPca();
				_this_.operaIsdefault();
        	},
        	operaIsdefault:function(){
        		var _this_=this;
        		var setdefaultUrl="";
        		$(dom.addressList).on("click",".editemoren",function(){
        			setdefaultUrl=$(this).parents(".address_info_l").attr("id");
        			pubFuc.load(api.setdefaultUrl+setdefaultUrl,null,"post",function(s){
        				if(s.code=="0"){
        					$(dom.Mask_moudel).fadeIn(300,function(){
        						$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text("修改默认收货地址成功！");	
            						_this_.operaInitialization();
            						$(dom.sureOK).addClass("setdefaultUrl");
            						$(dom.sureAddress).attr("disabled",false);
            					});
        					});
        					
        				}else{
        					$(dom.Mask_moudel).fadeIn(300,function(){
        					$(dom.sureinfo).fadeIn(300,function(){
        						$(dom.ares).text(s.msg);
        						$(dom.sureOK).addClass("setdefaultUrl");
        						$(dom.sureAddress).attr("disabled",false);
        					});
        					});
        				}
        			},function(e){
            			console.log(e);
            		});
        		});
        		$(dom.sureinfo).bind("click",".setdefaultUrl",function(){
        			$(this).removeClass("setdefaultUrl");
        			$(dom.sureinfo).fadeOut(300,function(){
        				$(dom.Mask_moudel).hide();
						$(dom.ares).text("");	
					});
        		});
        	},
        	operaSureAddress:function(){
        		var _this_=this;
        		var addressID="";
        		$(dom.addressList).on("click",".editeAddress",function(){
        			addressID=$(this).parents(".address_info_l").attr("id");
        			$.each(_this_.addressData,function(i,s){
        				if(s.id==addressID){
        					$(".consignee").val(s.consignee);
        					$(".address").val(s.address);
        					$(".mobile").val(s.mobile);
        					$(".postCode").val(s.postCode);
        					if(s.isDefault=="0"){
        						$(".cbox").prop("checked",false);
        					}else{
        						$(".cbox").prop("checked",true);
        					}
        					_this_.jdis=s.isJd;
        					
        						_this_.operaProvinceId(s.isJd);
            					$(".provinceId").val(s.provinceId);
            					_this_.operaCityId(s.provinceId,s.isJd);
            					$(".cityId").val(s.cityId);
            					_this_.operaAreaId(s.cityId,s.isJd);
            					$(".areaId").val(s.areaId);            					
            					_this_.operaTownId(s.areaId,s.isJd);
            					if(s.isJd=="1"){
            						$(".townId").val(s.townId).show();
            					}else{
            						$(".townId").val(s.townId).hide();
            					}
            					 
        					
        					$(".address_top font").text("编辑收货地址");
        				}
        			});
        			$(dom.Mask_moudel).show(10,function(){
        				$(dom.addAddress).fadeIn(300);
        			});	
        			
        		});
        		
        		
        		
        		$(".newAddress").bind("click",function(){
        			addressID="";
        			$(dom.Mask_moudel).show(10,function(){
        				$(dom.addAddress).fadeIn(300);
        				$(".consignee").val("");
    					$(".address").val("");
    					$(".mobile").val("");
    					$(".postCode").val("");
    					$(".erro_Address").hide();
    					$(".cbox").prop("checked",false);
    					$(".address_top font").text("新增收货地址");
    					$(".townId").css("display","none");
    					_this_.jdis="";
        				_this_.operaProvinceId();
        				_this_.operaCityId();
        				_this_.operaAreaId();
        				_this_.operaTownId();
        			});
        		});
        		$(dom.sureAddress).bind("click",function(){
        			var num_count = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3578]\d{9})$)/;
					var xingh=/(^(\d|\*){4}(\-|\*){1}(\d|\*){7,8}$)|(^(\d|\*){11}$)/;
        			if($(".consignee").val()==""){
        				$(".consignee_n").show();
        				return false;
        			}else{
        				$(".consignee_n").hide();
        			}
        			if($(".provinceId").val()=="" || $(".cityId").val()=="" || $(".areaId").val()==""){
        				$(".pca_n").show();
        				return false;
        			}else{
        				$(".pca_n").hide();
        			}
        			if($(".address").val()==""){
        				$(".address_n").show();
        				return false;
        			}else{
        				$(".address_n").hide();
        			}
        			if($(".mobile").val()==""){
        				$(".mobile_n").show();
        				return false;
        			}else{
        				$(".mobile_n").hide();
        			}
        			if(!num_count.test($(".mobile").val()) && !xingh.test($(".mobile").val())){
        				$(".mobile_n").show();
						return false;
					}else{
        				$(".mobile_n").hide();
        			}
        			var data={};
        			data.countryId="100";
        			data.provinceId=$(".provinceId").val();
        			data.cityId=$(".cityId").val();
        			data.areaId=$(".areaId").val();
        			data.townId=$(".townId").val(); 
        			data.address=$(".address").val();
        			data.consignee=$(".consignee").val();
        			data.mobile=$(".mobile").val();
        			if($("input[name='cbox']").prop("checked")==true){
        				var isDefaults="1";
        			}else{
        				var isDefaults="0";
        			}
        			data.isDefault=isDefaults;
        			data.postCode=$(".postCode").val();
        			if(addressID!=""){
        				data.id=addressID;
            			$(dom.sureAddress).attr("disabled",true);
        				pubFuc.load(api.editAddressUrl,data,"post",function(s){
            				if(s.code=="0"){
            					$(dom.addAddress).fadeOut(300,function(){
            						$(dom.sureinfo).fadeIn(300,function(){
                						$(dom.ares).text("修改收货地址成功！");	
                						_this_.operaInitialization();
                						$(dom.sureOK).addClass("sureOK_address");
                						$(dom.sureAddress).attr("disabled",false);
                					});
            					});
            					
            				}else{
            					$(dom.addAddress).fadeOut(300,function(){
            					$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text(s.msg);
            						$(dom.sureOK).addClass("sureOK_address");
            						$(dom.sureAddress).attr("disabled",false);
            					});
            					});
            				}
            			},function(e){
                			console.log(e);
                			$(dom.sureAddress).attr("disabled",false);
                		});
        			}else{
            			$(dom.sureAddress).attr("disabled",true);
        				pubFuc.load(api.addAddressUrl,data,"post",function(s){
            				if(s.code=="0"){
            					$(dom.addAddress).fadeOut(300,function(){
            						$(dom.sureinfo).fadeIn(300,function(){
                						$(dom.ares).text("新增收货地址成功！");	
                						_this_.operaInitialization();
                						$(dom.sureOK).addClass("sureOK_address");
                						$(dom.sureAddress).attr("disabled",false);
                					});
            					});
            					
            				}else{
            					$(dom.addAddress).fadeOut(300,function(){
            					$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text(s.msg);
            						$(dom.sureOK).addClass("sureOK_address");
            						$(dom.sureAddress).attr("disabled",false);
            					});
            					});
            				}
            			},function(e){
                			console.log(e);
                			$(dom.sureAddress).attr("disabled",false);
                		});
        			}
        			
        		});
        		$(dom.sureinfo).bind("click",".sureOK_address",function(){
        			$(this).removeClass("sureOK_address");
        			$(dom.sureinfo).fadeOut(300,function(){
        				$(dom.Mask_moudel).hide();
						$(dom.ares).text("");	
					});
        		});
        		$(dom.address_close).bind("click",function(){
        				$(dom.addAddress).fadeOut(300,function(){
        					$(dom.Mask_moudel).hide();
        				});
        		});
        	},
        	operaDeleter:function(){
        		var _this_=this;
        		var addressID="";
        		$(dom.addressList).on("click",".closedAddress",function(){
        			addressID=$(this).parents(".address_info_l").attr("id");
        			$(dom.Mask_moudel).show(10,function(){
						$(dom.ejectinfo).fadeIn(300);
						$(dom.are).text("您确定要删除选中的地址吗？");
					});
        		});
        		$(dom.buttinSures).bind("click",function(){
        			$(dom.ejectinfo).fadeOut(300,function(){
        				pubFuc.load(api.delAddressUrl+addressID,null,"post",function(s){
            				if(s.code=="0"){
            					$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text("删除选中地址成功！");	
            						_this_.operaInitialization();
            						$(dom.sureOK).addClass("sureOK_cancel");
            					});
            				}else{
            					$(dom.sureinfo).fadeIn(300,function(){
            						$(dom.ares).text(s.msg);	
            						_this_.operaInitialization();
            						$(dom.sureOK).addClass("sureOK_cancel");
            					});
            				}
            			},function(e){
                			console.log(e);
                		});
        			});    		
        		});
        		$(dom.sureinfo).bind("click",".sureOK_cancel",function(){
        			$(this).removeClass("sureOK_cancel");
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
        	operaList:function(){
        		var _this_=this;
        		pubFuc.load(api.consignaddressUrl,null,"GET",function(data){
        			_this_.addressData=data.data;
        			var addressHtml="";
        			var addressNum=0;
        			$.each(data.data,function(i,s){
        				addressNum=addressNum*1+1;
        				var datas={};
        				if(s.isJd=="1"){
        					datas.provinceId=s.provinceId;
            				datas.cityId=s.cityId;
            				datas.areaId=s.areaId;
            				datas.townId=s.townId;
            				datas.area=JdAreas;
            				var province=pubFuc.getDetailAdd(datas);
        				}else{
        					datas.provinceId=s.provinceId;
            				datas.cityId=s.cityId;
            				datas.areaId=s.areaId;
            				datas.area=areas;
            				var province=pubFuc.getDetailAdd(datas);
        				}
        				
        				addressHtml+='<div class="address_info_l fl" id="'+s.id+'">'+
    						'<ul>'+
						'<li><span>收货人：</span><font>'+s.consignee+'</font><a href="javascript:;" class="'+(s.isDefault==0?"hide":"")+'">默认地址</a></li>'+
						'<li><span>所在地区：</span><font>'+province+'</font></li>'+
						'<li><span>详细地址：</span><font>'+s.address+'</font></li>'+
						'<li><span>手机：</span><font>'+s.mobile+'</font></li>'+
						'<li><span>邮编：</span><font>'+s.postCode+'</font></li>'+
					'</ul>'+
					'<a href="javascript:;" class="closedAddress">×</a>'+
					'<a href="javascript:;" class="editeAddress">编辑</a>'+
					'<a href="javascript:;" class="editemoren '+(s.isDefault==0?"":"hide")+'">设为默认</a>'+
				'</div>';
        			});
        			$(dom.addressList).html(addressHtml);
        			$(".numst").text(addressNum);
        			_this_.operaMyInfo();
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
        	operaMyInfo:function(){
        		var securityCenterLeft=$(".personal_left").outerHeight();
        		var securityCenterRight=$(".right_border").outerHeight();
        		if(securityCenterLeft>securityCenterRight){
        			$(".right_border").css("height",securityCenterLeft-2);
        		}else{
        			$(".personal_left").css("height",securityCenterRight-2);
        		}
        		
        	},
        	operaInitialization:function(){
        		var _this_=this;
    			$(".right_border").css("height","");
    			$(".personal_left").css("height","");
    			_this_.operaList();
        	},
        	operaProvinceId:function(jd_p){
        		var provinceId="<option value=''>请选择地区</option>";
        		if(jd_p=="1"){
        			$.each(JdAreas,function(i,s){
            			if(s.pId=="0"){
            				provinceId+="<option value='"+s.id+"'>"+s.name+"</option>";
            			}
            		});
            		$(".provinceId").html(provinceId);
        		}else{
        			$.each(areas,function(i,s){
            			if(s.pId=="0"){
            				provinceId+="<option value='"+s.id+"'>"+s.name+"</option>";
            			}
            		});
            		$(".provinceId").html(provinceId);
        		}
        		
        	},
        	operaCityId:function(citryID,jd_p){
        		var provinceId="<option value=''>请选择市区</option>";
        		if(jd_p=="1"){
        			$.each(JdAreas,function(i,s){
            			if(s.pId==citryID){
            				provinceId+="<option value='"+s.id+"'>"+s.name+"</option>";
            			}
            		});
            		$(".cityId").html(provinceId);
        		}else{
        			$.each(areas,function(i,s){
            			if(s.pId==citryID){
            				provinceId+="<option value='"+s.id+"'>"+s.name+"</option>";
            			}
            		});
            		$(".cityId").html(provinceId);
        		}
        		
        	},
        	operaAreaId:function(whereID,jd_p){
        		var provinceId="<option value=''>请选择地区</option>";
        		
        		if(jd_p=="1"){
        			$.each(JdAreas,function(i,s){
            			if(s.pId==whereID){
            				provinceId+="<option value='"+s.id+"'>"+s.name+"</option>";
            			}
            		});
            		$(".areaId").html(provinceId);
        		}else{
        			$.each(areas,function(i,s){
            			if(s.pId==whereID){
            				provinceId+="<option value='"+s.id+"'>"+s.name+"</option>";
            			}
            		});
            		$(".areaId").html(provinceId);
        		}
        	},
        	operaTownId:function(tId,jd_p){
        		var townId="<option value=''>请选择城镇</option>";
        		
        		if(jd_p=="1"){
        			$.each(JdAreas,function(i,s){
            			if(s.pId==tId){
            				townId+="<option value='"+s.id+"'>"+s.name+"</option>";
            			}
            		});
            		$(".townId").html(townId).show();
        		}else{
        			$.each(JdAreas,function(i,s){
            			if(s.pId==tId){
            				townId+="<option value='"+s.id+"'>"+s.name+"</option>";
            			}
            		});
            		$(".townId").html(townId);
        		}
        	},
        	operaPca:function(){
        		var _this_=this;
        		$(".provinceId").bind("change",function(){
        			_this_.operaCityId($(this).val(),_this_.jdis);
        		});
        		$(".cityId").bind("change",function(){
        			_this_.operaAreaId($(this).val(),_this_.jdis);
        		});
        		$(".areaId").bind("change",function(){
        			_this_.operaTownId($(this).val(),_this_.jdis);
        		});
        	}
    	};
    })();
    $(function(){
    	list.init();
    });
})(this,jQuery,pubFuc||{});

