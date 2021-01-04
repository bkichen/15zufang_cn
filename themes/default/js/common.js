
$(document)
		.ready(
				function() {

					$(".search-box .input-box").mouseleave(function() {
						$(".input-box .index-search-result").slideUp(50);
					});

					$("input.top-search-input")
							.focus(
									function(e) {
										$(this).addClass("in-after");
										$(".search-bnt")
												.css("background",
														"url(/themes/default/images/search02.png) 12px center no-repeat #ff6600");
									});
					$("input.top-search-input")
							.blur(
									function(e) {
										$(this).removeClass("in-after");
										$(".search-bnt")
												.css("background",
														"url(/themes/default/images/icon-2.png) -116px -69px transparent");
									});
					$("input.top-search-input").click(function() {
						var searchVal = $(this).val();
						if ($.trim(searchVal) == "") {
							return;
						}
						$(this).addClass("C000");
						$(".search-result-box").slideDown(100);
					});
					$(".search-top-box").mouseleave(function() {
						$(".search-result-box").slideUp(50);
					});

					$("ul.title-tab li.d").click(function() {
						$("ul.title-tab li").removeClass("ol");
						$(this).addClass("ol");
						$(".s-tiaojian .ditu-box").show();
						$(".s-tiaojian .quyun-box").hide();
						$(".s-tiaojian .gongj-box").hide();
					});
					$("ul.title-tab li.q").click(function() {
						$("ul.title-tab li").removeClass("ol");
						$(this).addClass("ol");
						$(".s-tiaojian .quyun-box").show();
						$(".s-tiaojian .ditu-box").hide();
						$(".s-tiaojian .gongj-box").hide();
					});
					$("ul.title-tab li.g").click(function() {
						$("ul.title-tab li").removeClass("ol");
						$(this).addClass("ol");
						$(".s-tiaojian .gongj-box").show();
						$(".s-tiaojian .ditu-box").hide();
						$(".s-tiaojian .quyun-box").hide();
					});
					$("dl.quyun-box-t dd a").click(function() {
						$("dl.quyun-box-more").show();
					});
					$("dl.ditu-box-t dd a").click(function() {
						$("dl.ditu-box-more").show();
					});

					$("ul.jjr_photo li.z").hover(function() {
						$("ul.jjr_photo li a").removeClass("ol");
						$(this).find("a").addClass("ol");
						$("#tuijianfy_con01").show();
						$("#tuijianfy_con02").hide();
					});
					$("ul.jjr_photo li.y").hover(function() {
						$("ul.jjr_photo li a").removeClass("ol");
						$(this).find("a").addClass("ol");
						$("#tuijianfy_con01").hide();
						$("#tuijianfy_con02").show();
					});

					$("ul.fang-list li,ul.gr-fang-list li").mouseenter(
							function() {
								$(this).css("background-color", "#eeeeee");
								$(this).find(".duibi-f").slideDown(50);
								$(this).css("z-index", "9999")
							});
					$("ul.fang-list li,ul.gr-fang-list li").mouseleave(
							function() {
								$(this).css("background-color", "#ffffff");
								$(".duibi-f").slideUp(0);
								$(this).css("z-index", "1")
							});

					$(".sc-ewm a.ewm").mouseenter(function() {
						$(".fang-ewm-show").slideDown(0);
					});
					$(".sc-ewm a.ewm").mouseleave(function() {
						$(".fang-ewm-show").slideUp(0);
					});

					$("a.pentao-more-bnt").click(function() {
						$(".more-pentao").toggle();
					});

					$("dd.gongjiao-box input.input").click(function() {
						$(".gongjiao-result").slideDown(100);
					});
					$(".gongjiao-result a").click(
							function() {
								$("dd.gongjiao-box input.input").val(
										$(this).attr("title"))
								$(".gongjiao-result").slideUp(0);
								$("dl.gongj-box-more").show();
							});
					$(".fang-tag a.busNum").mouseover(function() {
						$(this).find(".bus-list").show();
					});
					$(".fang-tag a.busNum").mouseout(function() {
						$(this).find(".bus-list").hide();
					});

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

					$(".loginRwmtj a").mouseover(function() {
						$(".loginRwmtj .caoyicaorwm").show();
					});
					$(".loginRwmtj a").mouseout(function() {
						$(".loginRwmtj .caoyicaorwm").hide();
					});

					$("dl.login-in dd input.name").click(function() {
						if ($(this).val() == "用户名/手机号") {
							$(this).val("");
						}
					});
					$("dl.login-in dd input.name,dl.login-in dd input.pass")
							.mouseover(function() {
								$(this).css("border-color", "#ff6600");
								$(this).addClass("C000");
							});
					$("dl.login-in dd input.name,dl.login-in dd input.pass")
							.mouseout(function() {
								$(this).css("border-color", "#cccccc");
								$(this).removeClass("C000");
							});
					
					!function openYzm(){
						$(".yzm-box").mouseenter(function(){
							$(document).unbind();
						});
						$(".yzm-box").mouseleave(function(){
							$(document).click(function(){
								$(".yzm-box").css("display","none");
							});
						});
							
					}();
				});

var timeTime;
function closebox() {
	clearTimeout(timeTime);
	$(".append_box").hide();
}


function duibifang() {
	$(".duibifang").show();
}

function smsAdvisory() {
	$(".smsAdvisory").show();
}

function infoReport() {
	$(".infoReport").show();
}

function loginLayer() {
	$(".loginLayer").show();
}

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
	timeTime = setTimeout("closebox()", 3000);
}

var TopNum, GoTopTimeOut;
$(document).ready(function(e) {
	$(window).scroll(function() {
		TopNum = $(this).scrollTop(); 
		if (TopNum > 300) { 
			$('.gotop').show(200);
		} else {
			$('.gotop').hide(200);
		}
	});
});
function GoTop() {
	$(window).scrollTop(TopNum -= 100); 
	GoTopTimeOut = setTimeout('GoTop()', 5); 
	if (TopNum <= 0) { 
		clearTimeout(GoTopTimeOut);
	}
}

String.prototype.trim = function() {
	return this.replace(/[ \r\n]*/g, "");
}

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

var can = true;
function yzmClick(mobileId,ths) {
	if (!can) {
		return;
	}
	var mobile = $('#' + mobileId).val();
	if (mobile == null || mobile == '') {
		$('#' + mobileId + 'Error').text('请输入手机号码');
		$('#' + mobileId).focus();
		can = true;
		return;
	}
	$('#' + mobileId + 'Error').text('');
	
	var reg=/^0?(13|15|18|14|17)[0-9]{9}$/;
	if(!reg.test(mobile)){
		$('#' + mobileId + 'Error').text('请输入正确的手机号码');
		$('#' + mobileId).focus();
		can = true;
		return;
	}else{
		$('#' + mobileId + 'Error').text('');
	}
	
	var theEvent = window.event || arguments.callee.caller.arguments[0];
	theEvent.cancelBubble = true; 
	$('#imgyzm').click();
	$('#yzmcode').val('');
	$(".yzm-box").css("display","block");
	$(".yzm-box").css({"left":$(ths).offset().left,"top":$(ths).offset().top-80});
}

function getCode(ths, mobileId, tipsId, codeId) {
	if (!can) {
		return;
	}
	can = false;
	var mobile = $('#' + mobileId).val();
	if (mobile == null || mobile == '') {
		$('#' + mobileId + 'Error').text('请输入手机号码');
		$('#' + mobileId).focus();
		can = true;
		return;
	}
	$('#' + mobileId + 'Error').text('');
	var yzmcode = $('#' + codeId).val();
	if (yzmcode == null || yzmcode == '') {
		$('#' + codeId + 'Error').text('请输入验证码');
		$('#' + codeId).focus();
		can = true;
		return;
	}
	$('#' + codeId + 'Error').text('');
	var eleType=2;
	if($("#" + ths).attr("href")){
		eleType=1;
	}
	$.ajax({
		type : "post",
		url : "/my/mobiles/code",
		data : "mobile=" + mobile + "&yzmcode=" + yzmcode,
		dataType : 'json',
		cache : false,
		success : function(obj) {
			if (obj.code == 1) {
				can = false;
				$(".yzm-box").css("display","none");
				$('#' + tipsId).text(obj.message);
				var second = 60;
				if (eleType == 1) {
					$("#" + ths).text('获取验证码(' + second + 's)');
				}
				if (eleType == 2) {
					$("#" + ths).val('获取验证码(' + second + 's)');
				}
				var timer = setInterval(function() {
					second = second - 1;
					if (eleType == 1) {
						$("#" + ths).text('获取验证码(' + second + 's)');
					}
					if (eleType == 2) {
						$("#" + ths).val('获取验证码(' + second + 's)');
					}
					if (second == 0) {
						can = true;
						clearInterval(timer);
						if (eleType == 1) {
							$("#" + ths).text('获取验证码');
						}
						if (eleType == 2) {
							$("#" + ths).val('获取验证码');
						}
					}
				}, 1000);
			} else {
				can = true;
				if (obj.data != null) {
					$('#' + obj.data).text(obj.message);
				} else {
					$('#' + tipsId).text(obj.message);
				}
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			can = true;
			tishiBox('系统内部错误', 'cuowu');
		}
	});
}

function isLogin(fcName) {
	$.ajax({
		type : "post",
		url : "/my/hasLogin",
		dataType : 'json',
		cache : false,
		success : function(obj) {
			if (obj.code == 1) {
				eval(fcName);
			} else {
				loginLayer();
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			tishiBox('系统内部错误', 'cuowu');
		}
	});
}
