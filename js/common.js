//2015-4-2

$(document).ready(function(){
	
	/*****首页搜索条*/
	//点击输入框
    $(".search-box .input-box .input-in input.inp").click(function(){
		$(".input-box .index-search-result").slideDown(100);
		$(this).addClass("C000");
	});
	//点击搜索结果
    $(".input-box .index-search-result a").click(function(){
		var v = $(this).attr("title");
		$(".search-box .input-box .input-in input.inp").val(v)
		$(".input-box .index-search-result").slideUp(50);
	});
	//关闭搜索结果
	$(".search-box .input-box").mouseleave(function() {
		$(".input-box .index-search-result").slideUp(50);
	});
	
	
	/*****顶部搜索条*/
    //触发输入框
    $("input.top-search-input").focus(function(e){
	    $(this).addClass("in-after");
		$(".search-bnt").css("background","url(public/images/search02.png) 12px center no-repeat #ff6600");
		//e.stopPropagation();
	});
	$("input.top-search-input").blur(function(e){
	    $(this).removeClass("in-after");
		$(".search-bnt").css("background","url(public/img/icon.png) -116px -69px transparent");
		//e.stopPropagation();
	});
	//点击输入框
    $("input.top-search-input").click(function(){
		$(this).val("");
		$(this).addClass("C000");
		$(".search-result-box").slideDown(100);
	});
	//点击搜索结果
    $(".search-result-box a").click(function(){
		var v = $(this).attr("title");
		$("input.top-search-input").val(v)
		$(".search-result-box").slideUp(50);
	});
	//关闭搜索结果
	$(".search-top-box").mouseleave(function() {
		$(".search-result-box").slideUp(50);
	});
	
	
	
	
	//*****二手房列表 区域、地铁切换 (出租房公交)*/
	$("ul.title-tab li.d").click(function(){
		$("ul.title-tab li").removeClass("ol");
		$(this).addClass("ol");
		$(".s-tiaojian .ditu-box").show();
		$(".s-tiaojian .quyun-box").hide();
		$(".s-tiaojian .gongj-box").hide();
	});
	$("ul.title-tab li.q").click(function(){
		$("ul.title-tab li").removeClass("ol");
		$(this).addClass("ol");
		$(".s-tiaojian .quyun-box").show();
		$(".s-tiaojian .ditu-box").hide();
		$(".s-tiaojian .gongj-box").hide();
	});
	$("ul.title-tab li.g").click(function(){
		$("ul.title-tab li").removeClass("ol");
		$(this).addClass("ol");
		$(".s-tiaojian .gongj-box").show();
		$(".s-tiaojian .ditu-box").hide();
		$(".s-tiaojian .quyun-box").hide();
	});
	//
	$("dl.quyun-box-t dd a").click(function(){
		$("dl.quyun-box-more").show();
	});
	$("dl.ditu-box-t dd a").click(function(){
		$("dl.ditu-box-more").show();
	});
	
	
	
	//*****小区专家推荐切换*/
	$("ul.jjr_photo li.z").hover(function(){
		$("ul.jjr_photo li a").removeClass("ol");
		$(this).find("a").addClass("ol");
		$("#tuijianfy_con01").show();
		$("#tuijianfy_con02").hide();
	});
	$("ul.jjr_photo li.y").hover(function(){
		$("ul.jjr_photo li a").removeClass("ol");
		$(this).find("a").addClass("ol");
		$("#tuijianfy_con01").hide();
		$("#tuijianfy_con02").show();
	});
	
	
		
	
	
	//*****二手房、出租房列表 鼠标触发 变化背景*/
	$("ul.fang-list li,ul.gr-fang-list li").mouseenter(function() {
		$(this).css("background-color","#eeeeee");
		$(this).find(".duibi-f").slideDown(50);
		$(this).css("z-index","9999")
	});
	$("ul.fang-list li,ul.gr-fang-list li").mouseleave(function() {
		$(this).css("background-color","#ffffff");
		$(".duibi-f").slideUp(0);
		$(this).css("z-index","1")
	});
	
	
	
	//*****二手房、出租房详情页面 显示二维码*/
	$(".sc-ewm a.ewm").mouseenter(function() {
		//alert("00");
		$(".fang-ewm-show").slideDown(0);
	});
	$(".sc-ewm a.ewm").mouseleave(function() {
		$(".fang-ewm-show").slideUp(0);
	});
	
	
	
	/*地理地图 公交查询 弹层结果*/
	$(".map-bus input.input_sub").click(function(){
		$(".map-bus-result").show();
	});
	$(".map-bus-result dt a.close-min").click(function(){
		$(".map-bus-result").hide();
	});
	/*结果查看*/
	$(".map-bus-result dd").click(function(){
		$(".result-com").hide();
		$(this).find(".result-com").show();
	});
    /*更多配套*/
	$("a.pentao-more-bnt").click(function(){
		$(".more-pentao").toggle();
	});
	
	
	/*出租房列表 公交查询*/
    $("dd.gongjiao-box input.input").click(function(){
		$(".gongjiao-result").slideDown(100);
	});
	$(".gongjiao-result a").click(function(){
		$("dd.gongjiao-box input.input").val($(this).attr("title"))
		$(".gongjiao-result").slideUp(0);
		$("dl.gongj-box-more").show();
	});
	//周边公交
	$(".fang-tag a.busNum").mouseover(function(){
	    $(this).find(".bus-list").show();
	});
	$(".fang-tag a.busNum").mouseout(function(){
	    $(this).find(".bus-list").hide();
	});
	
	
	
	/***查房价 区域选择***/
	$(".chaqy .chaqy-a a").mouseenter(function(){
		var H=$(this).offset().top<150?28:61;
		$(".chaqyList").css({"left":$(this).offset().left-$(".chaqy").offset().left-$(".chaqyList").eq($(this).index()-1).width()/2,top:H});
		$(".chaqyList").slideUp(50);
		var t = $(this).attr("name");
	    $(".qylist-"+t).slideDown(100);
		
	});
	$(".chaqy").mouseleave(function(){
	    $(".chaqyList").slideUp(50);
		
	});

	
	
	//弹层登录二维码
	$(".loginRwmtj a").mouseover(function(){
		$(".loginRwmtj .caoyicaorwm").show();
	});
	$(".loginRwmtj a").mouseout(function(){
		$(".loginRwmtj .caoyicaorwm").hide();
	});
	
	
    //登录页面
	$("dl.login-in dd input.name").click(function(){
		if($(this).val()=="用户名/手机号"){
			$(this).val("");
		}
	});
	$("dl.login-in dd input.name,dl.login-in dd input.pass").mouseover(function(){
		$(this).css("border-color","#ff6600");
		$(this).addClass("C000");
	});
	$("dl.login-in dd input.name,dl.login-in dd input.pass").mouseout(function(){
		$(this).css("border-color","#cccccc");
		$(this).removeClass("C000");
	});


	
		
	!function openYzm(){
		var bOpen=false;
		$(".open_yzm").click(function(e){
			e.stopPropagation();
			$(".yzm-box").css("display","block");
			$(".yzm-box").css({"left":$(this).offset().left,"top":$(this).offset().top-80});
			bOpen=true;
			
		});
		
		$(".yzm-box").mouseenter(function(){
			$(document).unbind();
		});
		$(".yzm-box").mouseleave(function(){
			$(document).click(function(){
				$(".yzm-box").css("display","none");
				bOpen=false;
			});
		});
		
	}();
	


});
//jQuery end






/*显示/关闭提示box*/
var timeTime; //声明消除(setTimeout)
function closebox(){
	clearTimeout(timeTime);
	$(".append_box").hide();
}

/*房源对比*/
function duibifang(){
	$(".duibifang").show();
}

/*短信问房*/
function smsAdvisory(){
	$(".smsAdvisory").show();
}

/*房源信息举报*/
function infoReport(){
	$(".infoReport").show();
}

/*房源对比*/
function loginLayer(){
	$(".loginLayer").show();
}

// 通用操作提示弹层 ()
function tishiBox(text, type) {
	$(".append_box").show();
	if (!type) {
		type = 'okok';
	}
	$(".append_box")
			.html(
					"<div class='box-box' style='width:350px;'>"
							+ "<h3><span class='t fontS16'>提示</span><a class='close' onclick='closebox()'></a></h3>"
							+ "<div class='com' style='padding:30px;'>"
							+ "<i class='" + type
							+ "'></i><span class='warntext fontS18'>" + text
							+ "</span>" + "</div>" + "</div>");
	timeTime = setTimeout("closebox()", 3000);// 自动关闭提示层
}




//页面侧边 回到顶部 <a class="gotop" onClick="GoTop()"></a>
var TopNum,GoTopTimeOut;
$(document).ready(function(e){
	$(window).scroll(function(){
		TopNum = $(this).scrollTop(); //返回滚动条的垂直位置
		if (TopNum > 300){ //距离顶部300的地方显示
			$('.gotop').show(200);
		}else{
			$('.gotop').hide(200);
		}
	});
});
function GoTop(){
	$(window).scrollTop(TopNum-=100); //滚动速度
	GoTopTimeOut = setTimeout('GoTop()', 5); //滚动频率
	if (TopNum <= 0){ //回到顶部位置
		clearTimeout(GoTopTimeOut);
	}
}


//百度分享 （用于详情页面）
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":["qzone","tsina","weixin","renren","tqq","kaixin001","tqf","tieba","douban","sqq","youdao","people","mail","ty","copy"],"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];







