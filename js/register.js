var reg_data = {};
reg_data.form = '#addUser';
reg_data.form_uname = 'uname';
reg_data.form_pword = 'pword';
reg_data.form_repword = 'repassword';
reg_data.form_tel = 'tel';
reg_data.form_realname = 'realname';
reg_data.form_cpName = 'cpName';
reg_data.form_store = 'store';
reg_data.form_random = 'random';
reg_data.form_cityId = 'cityId';
reg_data.time = 60;
reg_data.flag = true;
reg_data.tel_flag = false;

reg_data.submit_flag = false;
reg_data.mobile = /^1[0-9]{10}$/;



var register = {
	tipError : function(t, m) {
		t.attr('class','currend utext');
		var a = t.parent().find('.dis_box');
		a.find('span').html(m);
		a.attr('class',' dis_box icon_error');
		reg_data.flag = false;
	},
	tipSuccess : function(t, m) {
		t.attr('class','utext');
		var a = t.parent().find('.dis_box');
		a.find('span').html(m);
		a.attr('class',' dis_box icon_right');
	},
	tip : function(t) {
		t.attr('class','utext');
		var a = t.parent().find('.dis_box');
		a.find('span').html(t.attr('tip'));
		a.attr('class',' dis_box icon_tip');
	},
	ckUname : function(a){
		var v = $(a).val(); 
		var t = $(a);
		if(!/^[\w\.-]+@[\w-]+(\.[\w-]+){1,3}$/i.exec(v)) {
			register.tipError(t,'邮箱格式不正确！');
			return;
		}
		$.ajax({
			url : '/register/cheUserName.htm?uname=' + v,
			cache : false,
			dataType: "json",
            success : function(json) {
				if( json.errorCode == 1 ){
					register.tipSuccess(t,'');
				}else{
					register.tipError(t,'该用户名已被注册！');
				}
			},
			error: function(XmlHttpRequest) {
				register.tipError(t,'发送信息错误！！请稍后再试...');
			}
		})
	},
	ckTel : function(a){
		var t = $(a);
		var v = $(a).val();
		if(!reg_data.mobile.exec(v)) {
			register.tipError(t,'手机格式不正确！');
			return;
		}
		$.ajax({
			url : '/register/cheUserTel.htm?tel=' + v,
			cache : false,
			dataType : "json",
			async : false,
            success : function(json) {
				if( json.errorCode == 1 ){
					register.tipSuccess(t,'');
					reg_data.tel_flag = true;
				}else{
					register.tipError(t,'号码已存在！');
					reg_data.tel_flag = false;
				}
			},
			error: function(XmlHttpRequest) {
				register.tipError(t,'发送信息错误！！请稍后再试...');
			}
		})
	},
	chkPword : function(a){
		var v = $(a).val();
		var t = $(a);
		if( v.length < 6 || v.length > 14){
			register.tipError(t,'密码长度为6-14位！');
		}else{
			register.tipSuccess(t,'');
		}
	},
	chkRePword : function(a){
		var t = $(a);
		var v = $(a).val();
		//var pword = $(reg_data.form).find('input[name="' + reg_data.form_pword + '"]').val();
		var pword = $('input[name="' + reg_data.form_pword + '"]').val();
		if( pword == '' || v !=  pword ){
			register.tipError(t,'两次密码不一致,请确认！');
			return;
		}else{
			register.tipSuccess(t,'');
		}
	},
	chkRealname : function(a){
		var v = $(a).val();
		var t = $(a);
		var patrn= /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
		if (!patrn.exec(v)){
			register.tipError(t,'请输入汉字!');
			return;
		}
		register.tipSuccess(t,'');
	},
	chkCpname : function(a){
		var t = $(a);
		var v = $(a).val();
		if( v.length <= 0 ){
			register.tipError(t,'请输入公司名称');
			return;
		}
		register.tipSuccess(t,'');
	},
	chkStore : function(a){
		var t = $(a);
		var v = $(a).val();
		if( v.length <= 0 ){
			register.tipError(t,'请输入所属门店');
			return;
		}
		register.tipSuccess(t,'');
	},
	chkRandom : function(a){
		var t = $(a);
		var v = $(a).val();
		if( v.length < 4 ){
			register.tipError(t,'请输入校验码');
			return;
		}
		var tel = $('#' + reg_data.form_tel + '').val();//$(reg_data.form).find('input[name="' + reg_data.form_tel + '"]').val();
		$.ajax({
			url : '/comm/chkSms.htm?random=' + v + '&tel=' + tel,
			cache : false,
			dataType: "json",
			async : false,
            success : function(json) {
				if( json.errorCode == 1 ){
					register.tipSuccess(t,'');
				}else{
					register.tipError(t,'校验码错误！');
				}
			},
			error: function(XmlHttpRequest) {
				register.tipError(t,'发送信息错误！！请稍后再试...');
			}
		})
	},
	bindEvents : function() {
		var e = $(reg_data.form);
		//控件事件绑定
		e.find('input[name="' + reg_data.form_uname + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.ckUname(this);
		});
		e.find('input[name="' + reg_data.form_pword + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkPword(this);
		});
		e.find('input[name="' + reg_data.form_repword + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkRePword(this)
		});
		e.find('input[name="' + reg_data.form_tel + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.ckTel(this);
		});
		e.find('input[name="' + reg_data.form_random + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkRandom(this);
		});
		e.find('input[name="' + reg_data.form_realname + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkRealname(this)
		});
		e.find('input[name="' + reg_data.form_cpName + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkCpname(this)
		});
		e.find('input[name="' + reg_data.form_store + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkStore(this)
		});
		e.find('#reg_submit').bind('click', function() {
			register.submit(e);
		});
		//城市选择
		var cl = e.find('.citylist');
		e.find('#selectcity').bind('click', function() {
			if( cl.css("display") == "none" ){
				cl.show();
			}else{
				cl.hide();
			}   
		});
		cl.find('.cityname a').bind('click', function() {
			e.find('#selectcity em').html($(this).html());
			e.find('input[name="' + reg_data.form_cityId + '"]').val($(this).attr('cityid'));
			cl.hide();
		});
		cl.find('.city_tab a').bind('click', function() {
			$(this).addClass("on").siblings(".on").removeClass("on");
			cl.find('.cityname').hide();
			cl.find('.cityname:eq('+ $(this).index()+')').show();
		});
		//推荐人
		e.find('input[name="invite"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			var t = $(this);
			if( t.val() == '' ){
				register.tipSuccess(t,'');
			}else{
				$.ajax({
					url : '/register/cheInvite.htm?invite=' + t.val(),
					cache : false,
					dataType: "json",
					async : false,
		            success : function(json) {
						register.tipSuccess(t, '邀请人：' + json.errorMessage);
					},
					error: function(XmlHttpRequest) {
						register.tipError(t, '发送信息错误！！请稍后再试...');
					}
				})
			}
		});
		//手机验证码
		register.req_random($(reg_data.form));
		//图像验证码
		register.captcha_req($(reg_data.form), 1);
	},
	captcha_refresh: function(){
		$("#imgcode").attr("src","/comm/captcha.htm?t=" + new Date().getTime());
	},
	captcha_req : function(a, type){
		//图像验证码
		$('#btn_captcha').bind('click', function() {
			var v = $('#txt_captcha');
			var s = $('#showWord');
			var d = $('#div_captcha');
			if( v.val() == '' ){
				s.html('<font style="color:#F00;" >验证码为空.</font>');
				v.focus();
				return ;
			}
			if( v.val().length < 4 ){
				s.html('<font style="color:#F00;" >格式不对.</font>');
				v.focus();
				return ;
			}
			if( !type ){
				type = 1;
			}
			var t = a.find('input[name="' + reg_data.form_tel + '"]');
			$.ajax({
		    	url:'/comm/smsSend.htm',
		    	data:'type=' + type + '&tel=' + t.val() + '&verifyCode=' + v.val(),
		    	dataType: "json",
		    	cache : false,
		    	beforeSend:function() {
					reg_data.time == 59
				},
		    	success:function(json) {
					if( json.errorCode == 1 ){
						$('#req_random').addClass('send');
						register.randomCountdown()
						d.hide();
					}else{
						if( json.errorMessage.indexOf('验证码错误') != -1 || json.errorMessage.indexOf('秒后获取') !=-1 ){
							s.html('<font style="color:#F00;" >' +  json.errorMessage+ '</font>');
						}else{
							register.tipError(t, json.errorMessage);
						}
					}
		    	},
				error: function(XmlHttpRequest) {
		    		alert('发送信息错误！！请稍后再试...');
				}
			})
		})
	},
	req_random : function(a) {
		$('#req_random').bind('click', function() {
			if( reg_data.time == 60 ){
				var t = a.find('input[name="' + reg_data.form_tel + '"]');
				if( !reg_data.tel_flag ){
					register.tipError(t,'请正确填写手机信息，再获取校证码！');
					return;
				}
				if( !reg_data.mobile.exec(t.val()) ) {
					register.tipError(t,'手机格式不正确！');
					return;
				}
				var d = $('#div_captcha');
				if( d.is(':visible') ){
					d.hide()
				}else{
					$('#txt_captcha').val('');
					$('#showWord').html('请输入验证码');
					register.captcha_refresh();
					d.show();
				}
			}
		});
	},
	randomCountdown: function() {
		reg_data.time = reg_data.time - 1;
		if( reg_data.time <= 0 ){
			$('#req_random').val('获取校验码').removeClass("send");
			reg_data.time = 60;
			return;
		}
		var msg = '重新发送  ' + reg_data.time
		$('#req_random').val(msg);
		setTimeout('register.randomCountdown()', 1000);
	},
	init : function() {
		register.bindEvents();
	},
	submit : function() {
		if( reg_data.submit_flag == true ){
			return ;
		}
		debugger;
		reg_data.flag = true;
		var e = $(reg_data.form);
		register.ckUname(e.find('input[name="' + reg_data.form_uname + '"]'));
		register.chkPword(e.find('input[name="' + reg_data.form_pword + '"]'));
		register.chkRePword(e.find('input[name="' + reg_data.form_repword + '"]'));
		register.chkRealname(e.find('input[name="' + reg_data.form_realname + '"]'));
		register.chkCpname(e.find('input[name="' + reg_data.form_cpName + '"]'));
		register.chkStore(e.find('input[name="' + reg_data.form_store + '"]'));
		register.ckTel(e.find('input[name="' + reg_data.form_tel + '"]'));
		register.chkRandom(e.find('input[name="' + reg_data.form_random + '"]'));
		if( reg_data.flag ){
		    $.ajax({
				type:"post",
		    	url:e[0].action,
		    	data:e.serialize(),
		    	dataType: "json",
		    	beforeSend:function() {
		    		reg_data.submit_flag = true
				},
		    	success:function(json) {
		    		if( json.errorCode == 1 ){
		    			window.location.href ='http://' + json.errorMessage + '.fangtan007.com/register/registerThird.htm';
		    		}else{
		    			alert(json.errorMessage);
		    		}
		    	},
				error: function(XmlHttpRequest) {
		    		alert('发送信息错误！！请稍后再试...');
				}
			})
		}
		reg_data.submit_flag = false;
	},
	
	forget : function() {
		var e = $("#forget_form");
		//手机验证码
		register.req_random(e);
		//图像验证码
		register.captcha_req(e, 2);
		
		e.find('input[name="' + reg_data.form_tel + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.forget_tel($(this))
		});
		e.find('input[name="' + reg_data.form_random + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkRandom(this);
		});
		e.find('input[name="' + reg_data.form_pword + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkPword(this);
		});
		e.find('input[name="' + reg_data.form_repword + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.chkRePword(this)
		});
		$('#forget_button').bind('click', function() {
			reg_data.flag = true;
			register.chkPword(e.find('input[name="' + reg_data.form_pword + '"]'));
			register.chkRePword(e.find('input[name="' + reg_data.form_repword + '"]'));
			register.forget_tel(e.find('input[name="' + reg_data.form_tel + '"]'));
			register.chkRandom(e.find('input[name="' + reg_data.form_random + '"]'));
			if( reg_data.flag ){
			 	$.ajax({
					type:"post",
			    	url:e[0].action,
			    	data:e.serialize(),
			    	cache : false,
					dataType: "json",
					async : false,
			    	beforeSend:function() {
			    		reg_data.submit_flag = true
					},
			    	success:function(json) {
						if( json.errorCode == 1 ){
							alert('密码设置成功，请重新登录.');
							window.location.href ='/';
						}else{
							alert(json.errorMessage);
						}
			    	},
					error: function(XmlHttpRequest) {
			    		alert('发送信息错误！！请稍后再试...');
					}
				})
			}
		})
	},
	forget_tel  : function(t) {
		$.ajax({
			url : '/register/forget_chkTel.htm?tel=' + t.val(),
			cache : false,
			dataType: "json",
			async : false,
            success : function(json) {
				if( json.errorCode == 1 ){
					register.tipSuccess(t, json.errorMessage);
					reg_data.tel_flag = true;
				}else{
					register.tipError(t, json.errorMessage);
					reg_data.tel_flag = false;
				}
			},
			error: function(XmlHttpRequest) {
				register.tipError(t, '发送信息错误！！请稍后再试...');
			}
		})
	}
}