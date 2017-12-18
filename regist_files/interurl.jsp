
















	      window.onload = function() {
		     setTimeout(function() {
				showOrHide();
			}, 1000);			
			
			 setTimeout(function() {
			   codefans();
			}, 300000);			
	      } 
	          
	     function codefans(){
	       	document.getElementById("nocxw_gxtb").style.display='none';
	        document.getElementById('nocxw_close').style.display='none';
	     } 
	      function addtype(){
	        document.getElementById("nocxw_gxtb").style.display='none';
	        document.getElementById('nocxw_close').style.display='none';
	      
	        var ctype= document.getElementsByName("ctype");
	        var ctype_value="";        
			  if(ctype[0].checked)
			      {ctype_value = ctype[0].value;}
			  if(ctype[1].checked)
			      {ctype_value = ctype[1].value;}			      
	        var urltst= 'http://202.102.41.15:8081/abc/ajaxget.jsp?at=0be4dbfaccfaJXv8t_RnpIuoMfRK0fuhwfre6GVGjfrgJqvoT6AAUmiBhfDgJim_K7&ctpye='+ctype_value;   
	        btnclick(urltst); 	        	        	        
	     } 
	     
	       function btnclick(urltst) {
	                var xmlHttp;
					if(window.ActiveXObject){					
					    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");					
					}				
					else if(window.XMLHttpRequest){					
				    	xmlHttp = new XMLHttpRequest();					
					} 
　　　　　　　　　　  if (!xmlHttp) {
　　　　　　　　　　　     return false;
　　　　　　　　　      }
                             　    xmlHttp.open("post", urltst, false);  　　　　　　　　　　
　　　   　　　　         xmlHttp.send();
　　　　 　　 }
	     	     
         function showOrHide(){                    
	        var h = Math.ceil(window.innerWidth * 0.12);
			var ht = Math.ceil(window.innerHeight * 0.55);
			var ht = Math.ceil(window.innerHeight * 0.25);
			var w = Math.ceil(h * 0.4);
			var t = Math.ceil(h * 0.04);
			var body = document.getElementsByTagName("body")[0];
			
			
			var div_close = document.createElement("div");
			div_close.id = 'nocxw_close';
			div_close.style.width = '275px';
			div_close.style.height = 28 +'px';
			div_close.style.margin = '0 auto';
			div_close.style.backgroundColor = '#E8E8E8';
			div_close.style.position = 'fixed';
			div_close.style.bottom= 85 +'px';	
			div_close.style.display= 'none';
			div_close.style.left =((window.innerWidth+340)/2)+'px';		
			
			div_close.innerHTML='&nbsp;&nbsp;<input type="radio" id="ctype" name="ctype" checked value="1"/><span style="font-size: 14px; font-family:微软雅黑;color:#3A5FCD;">本次关闭</span> <input type="radio" id="ctype" name="ctype"   value="2"/><span style="font-size: 14px; font-family:微软雅黑;color:#3A5FCD;">本月关闭</span> &nbsp;&nbsp;<input type="button" id="buttons" name="buttons" style="border:0;color:#3A5FCD;font-size: 14px; background-color: #D1D1D1;font-family:微软雅黑; height: 28px; width: 43px" value="确定" onclick = "addtype();"/>'; 
			
			
			var div_box = document.createElement("div");
			div_box.id = 'nocxw_gxtb';
		    div_box.style.width = '950px';
			div_box.style.height = 85 +'px';
			div_box.style.margin = '0 auto';
			div_box.style.color = '#FFF';
			div_box.style.position = 'fixed';
			div_box.style.bottom= 0 +'px';	
			div_box.style.left =((window.innerWidth-970)/2)+'px';	
			
		    w = w * 0.5;
			var iframe = document.createElement("iframe");
			iframe.id = 'nocxw_ifr';					
			iframe.width = '100%';
			iframe.height = 85 + 'px';					
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('scrolling', 'no');
			iframe.src = 'http://221.228.17.93/broadbandTenSeconds/additv170320.jsp?a=0be4dbfaccfaJXv8t_RnpIuoMfRK0fuhwfre6GVGjfrgJqvoT6AAUmiBhfDgJim_K7';
			div_box.appendChild(iframe);
			
/*			
			var iframe_w = document.createElement("iframe");
			iframe_w.id = 'nocxw_ifr_w';	
			iframe_w.width =  0 +'px';
			iframe_w.height = 0 + 'px';	
			iframe_w.setAttribute('frameborder', '0');
			iframe_w.setAttribute('scrolling', 'no');
			//iframe_w.src = 'http://jp.union.g1d.net/jumpservice/redirect?rcc_id=Campus_koyu.com';	
                        iframe_w.src = 'http://jp.as.pptv.com/webcollect/click?pos=200129&tid=TA201611291632243513&vchid=0&ln=http%3A%2F%2Fmovie.pptv.com%2F%3Frcc_id%3D2345daohangcl';

			div_box.appendChild(iframe_w);	
*/		
			var gx_b = document.createElement("a");
			gx_b.id = 'nocxw_cls';
			gx_b.href = 'javascript:void(0);';
			gx_b.setAttribute("onclick","document.getElementById('nocxw_gxtb').style.display='none';document.getElementById('nocxw_close').style.display='none';");			
			gx_b.innerHTML="<b>✕</b>"; 	
			gx_b.style.color = '#000000';
			gx_b.style.backgroundColor = '#D1D1D1';
			gx_b.id = 'nocxw_clsimg';
			gx_b.style.float = 'right';
			gx_b.style.position = 'absolute';
			gx_b.style.top = 0 + 'px';
			gx_b.style.right = 0 + 'px';
			gx_b.style.width = 15 + 'px';
			gx_b.style.height= 20 + 'px';
			gx_b.style.textDecoration='none';
			div_box.appendChild(gx_b);				
			
		    var gx_ab = document.createElement("a");
			gx_ab.id = 'nocxw_cls';
			gx_ab.href = 'javascript:void(0);';
			gx_ab.setAttribute("onclick","document.getElementById('nocxw_close').style.display='block';");			
			gx_ab.innerHTML="☰"; 	
			gx_ab.style.color = '#000000';
			gx_ab.style.backgroundColor = '#D1D1D1';
			gx_ab.id = 'nocxw_clsimgsz';
			gx_ab.style.float = 'right';
			gx_ab.style.position = 'absolute';
			gx_ab.style.top = 0 + 'px';
			gx_ab.style.right = 15 + 'px';
			gx_ab.style.width = 23 + 'px';
			gx_ab.style.height= 20 + 'px';
			
			gx_ab.style.textDecoration='none';	
			div_box.appendChild(gx_ab);	
				
			body.insertBefore(div_box, body.firstChild);	
			body.insertBefore(div_close, body.firstChild);
			
			window.addEventListener("resize", function() {
				var gx = document.getElementById("nocxw_gxtb");
				var close = document.getElementById("nocxw_close");
				var ifrs = document.getElementById("nocxw_ifr");
				ifrs.style.height = Math.ceil(window.innerWidth * 0.12);				
				gx.style.height = Math.ceil(window.innerWidth * 0.12);				
				gx.style.left =((window.innerWidth-970)/2)+'px';	
				div_close.style.left =((window.innerWidth+320)/2)+'px';	
			}, false);
	         
	       }
	      
