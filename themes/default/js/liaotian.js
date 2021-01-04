$(function(){
	try{
		$(".talk-btn").click(function(){
			$(".talk-box").removeClass("btn-state").addClass("contact-state");
		});
		$(".talk-contact .talk-contact-list dd").click(function(){
			$(".talk-box").removeClass("contact-state").addClass("chat-state");
		});
		$(".talk-minimize").click(function(){
			$(".talk-box").removeClass("contact-state chat-state").addClass("btn-state");
		});
		$(".talk-chat-title .close-icon").click(function(){
			$(".talk-box").removeClass("chat-state").addClass("contact-state");
		});
		$(".talk-contact .talk-contact-list dl dd").click(function(){
			$(".talk-contact .talk-contact-list dl dd").removeClass("on");
			$(this).addClass("on");
		})
		$(".talk-contact .talk-contact-list dl dt").click(function(){
			if($(this).parent().find("dd").css("display")=="block"){
				$(this).parent().find("dd").css("display","none");
				$(this).find("span").css({"font-weight":"100","color":"#666"});
			}else{
				$(this).parent().find("dd").css("display","block");
				$(this).find("span").css({"font-weight":"bold","color":"#000"});
			}
		})
		
		function newMessage(n){
			if(n>0){
				$(".talk-btn").addClass("on");
				$(".talk-btn span").html(n+"条新消息");
				$(".talk-contact-title em").html(n).css("display","inline-block");
			}else{
				$(".talk-btn").removeClass("on");
				$(".talk-btn span").html("联系人");
				$(".talk-contact-title em").html(n).css("display","none");
			}
		}
		newMessage(15)
		
		
		
		
		$(".talk-btn").hover(function(){
				$(".talk-btn .icon-down-01").css("background-position","-19px 0")
			},function(){
				$(".talk-btn .icon-down-01").css("background-position","0 0")
			}
		);
		$(".talk-minimize").hover(function(){
				$(".min-icon").css("background-position","0 -48px");
			},function(){
				$(".min-icon").css("background-position","-10px -48px");
			}
		);
		$(".talk-img-upload").hover(function(){
				$(".talk-submit-tab i").css("background-position","0 -63px");
			},function(){
				$(".talk-submit-tab i").css("background-position","0 -50px");
			}
		);
		
		
		var oDiv=document.getElementById("div1");
	
	
		function formatData(d){
			var m=d.getMonth()+1;
			var da=d.getDate();
			var h=d.getHours();
			var ms=d.getMinutes();
			var a="";
			m<10?m="0"+m:m;
			da<10?da="0"+da:da;
			ms<10?ms="0"+ms:ms;
			a=(m+"-"+da+" "+h+":"+ms)
			return a
		};	
		
		function showMessage(data,time){
			
			if(data){
				if(typeof data=="string"){
					data="<div class='mb15 clearfix'><div><p><span class='Cblue mr10'>"+$(".talk-chat-title span").html()+"</span><span class='Cblue'>"+time+"</span>"+"</p><p>"+data+"</p></div></div>"
					$(".talk-window").append(data);
					$(".talk-window").scrollTop($(".talk-window")[0].scrollHeight)
				}else{
					data="<div class='mb15 clearfix'><div><p class='mb5'><span class='Cblue mr10'>"+$(".talk-chat-title span").html()+"</span><span class='Cblue'>"+time+"</span>"+"</p><p>"+"<span class='voice'><i class='voice-icon'></i>语音模式，无法播放！请用APP交流</span>"+"</p></div></div>"
					$(".talk-window").append(data);
					$(".talk-window").scrollTop($(".talk-window")[0].scrollHeight)
				}
			}else{
				time=formatData(new Date())
				data="<div class='mb15 clearfix'><div class='y'><p class='clearfix'><span class='C666 y'>"+time+"</span></p><p class='text-y'>"+$(".talk-chat textarea").val()+"</p></div></div>"
				$(".talk-window").append(data);
				$(".talk-chat textarea").val('');
				$(".talk-window").scrollTop($(".talk-window")[0].scrollHeight)
			}
		};
		showMessage("你好","11-09 15:06");
		showMessage(1,"11-09 15:06")
		
		
		$(".talk-chat .talk-submit").click(function(e){
			e.stopPropagation();
			if($(".talk-chat textarea").val()){
				showMessage();
			}
		});
		
		$(".jjr-zxs-offline").click(function(){
			$(".talk-box").removeClass("contact-state").addClass("chat-state");
		})
		$(".jjr-zxs-inline").click(function(){
			$(".talk-box").removeClass("contact-state").addClass("chat-state");
		})
	
	}
	catch(e){
	}
	
})
