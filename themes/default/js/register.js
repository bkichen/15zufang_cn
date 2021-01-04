var reg_data = {};
reg_data.form = '#addUser';
reg_data.form_uname = 'uname';
reg_data.form_pword = 'pword';
reg_data.form_repword = 'repassword';
reg_data.form_tel = 'tel';
reg_data.form_realname = 'realname';
reg_data.form_random = 'random';
reg_data.form_cpName = 'cpName';
reg_data.form_store = 'store';
reg_data.form_region = 'region';
reg_data.form_board = 'board';
reg_data.form_cityId = 'cityId';
reg_data.form_invite = 'invite';
reg_data.time = 60;
reg_data.flag = true;
reg_data.tel_flag = false;

reg_data.submit_flag = false;
reg_data.mobile = /^1[0-9]{10}$/;



var register = {
	tipError : function(t, m) {
		t.attr('class','input error');
		var a = t.parent().next().find('.dis_box');
		if(!a || a.length==0)
		{
			a=t.parent().parent().next().find('.dis_box');
		}
		a.find('span').html(m);
		a.attr('class','Cred fontS12 dis_box');
		reg_data.flag = false;
	},
	tipSuccess : function(t, m) {
		t.attr('class','input');
		var a = t.parent().next().find('.dis_box');
		if(!a || a.length==0)
		{
			a=t.parent().parent().next().find('.dis_box');
		}
		a.find('span').html(m);
		a.attr('class','C999 fontS12 dis_box');
	},
	tip : function(t) {
		t.attr('class','input error');
		var a = t.parent().next().find('.dis_box');
		if(!a || a.length==0)
		{
			a=t.parent().parent().next().find('.dis_box');
		}
		a.find('span').html(t.attr('tip'));
		a.attr('class','Cred fontS12 dis_box');
	},
	ckUname : function(a){
		var v = $(a).val(); 
		var t = $(a);
		if(!/^[\w\.-]+@[\w-]+(\.[\w-]+){1,3}$/i.exec(v)) {
			register.tipError(t,'邮箱格式不正确！');
			return;
		}
		$.ajax({
			url : '/my/cheUserName?username=' + v,
			cache : false,
			dataType: "json",
            success : function(json) {
				if( json.code == 1 ){
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
			url : '/my/cheUserTel?tel=' + v+"&t="+Math.random(),
			cache : false,
			dataType : "json",
			async : false,
            success : function(json) {
				if( json.code == 1 ){
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
			register.tipError(t,'请输入所属门店！');
			return;
		}
		register.tipSuccess(t,'');
	},
	chkRandom : function(a){
		var t = $(a);
		var v = $(a).val();
		if( v.length < 6){
			register.tipError(t,'请输入验证码！');
			return;
		}
		register.tipSuccess(t,'');
	},
	chkRegion : function(a){
		var t = $(a);
		var v = $(a).val();
		if( v.length <= 0 ){
			register.tipError(t,'请选择区域！');
			return;
		}
		register.tipSuccess(t,'');
	},
	chkBoard : function(a){
		var t = $(a);
		var v = $(a).val();
		if( v.length <= 0 ){
			register.tipError(t,'请选择板块！');
			return;
		}
		register.tipSuccess(t,'');
	},
	chkInvite : function(a){
		var t = $(a);
		var v = $(a).val();
		if( v.length > 0 ){
			$.ajax({
				url : '/my/cheInvite?invite=' + v+"&t="+Math.random(),
				cache : false,
				dataType: "json",
				async : false,
	            success : function(json) {
	            	if( json.code == 1 ){
						register.tipSuccess(t,'<span style="color:blue">'+json.message+'</span>&nbsp;&nbsp;');
					}else{
						register.tipError(t,'推荐人不存在！');
					}
				},
				error: function(XmlHttpRequest) {
					register.tipError(t, '发送信息错误！！请稍后再试...');
				}
			})
			return;
		}
		register.tipSuccess(t,'');
	},
	bindEvents : function() {
		var e = $(reg_data.form);
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
		e.find('input[name="invite"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			var t = $(this);
			if( t.val() == '' ){
				register.tipSuccess(t,'');
			}else{
				$.ajax({
					url : '/my/cheInvite?invite=' + t.val()+"&t="+Math.random(),
					cache : false,
					dataType: "json",
					async : false,
		            success : function(json) {
		            	if( json.code == 1 ){
		            		register.tipSuccess(t,'<span style="color:blue">'+json.message+'</span>&nbsp;&nbsp;');
						}else{
							register.tipError(t,'推荐人不存在！');
						}
					},
					error: function(XmlHttpRequest) {
						register.tipError(t, '发送信息错误！！请稍后再试...');
					}
				})
			}
		});
		register.req_random($(reg_data.form));
	},
	req_random : function(a) {
		$('#req_random').bind('click', function() {
			if( reg_data.time == 60 ){
				var t = a.find('input[name="' + reg_data.form_tel + '"]');
				if( !reg_data.tel_flag ){
					return;
				}
				if( !reg_data.mobile.exec(t.val()) ) {
					register.tipError(t,'手机格式不正确！');
					return;
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
		reg_data.flag = true;
		var e = $(reg_data.form);
		register.ckUname(e.find('input[name="' + reg_data.form_uname + '"]'));
		register.chkPword(e.find('input[name="' + reg_data.form_pword + '"]'));
		register.chkRePword(e.find('input[name="' + reg_data.form_repword + '"]'));
		register.chkRealname(e.find('input[name="' + reg_data.form_realname + '"]'));
		
		register.chkRandom(e.find('input[name="' + reg_data.form_random + '"]'));
		register.chkCpname(e.find('input[name="' + reg_data.form_cpName + '"]'));
		if($("#cid").val()!='')
		{
			$("#region").val('');
			$("#board").val('');
			$("#regionName").val('');
			$("#boardName").val('');
			register.chkStore(e.find('input[name="' + reg_data.form_store + '"]'));
		}else
		{
			$("#store").val('');
			register.chkRegion(e.find('input[name="' + reg_data.form_region + '"]'));
		}
		
		register.ckTel(e.find('input[name="' + reg_data.form_tel + '"]'));
		register.chkInvite(e.find('input[name="' + reg_data.form_invite + '"]'));
		if( reg_data.flag ){
		    $.ajax({
				type:"post",
		    	url:e[0].action,
		    	data:$("#addUser").serialize(),
		    	dataType: "json",
		    	beforeSend:function() {
		    		reg_data.submit_flag = true
				},
		    	success:function(json) {
		    		if( json.code == 1 ){
		    			$(".popMask,.popSucc").fadeIn();
//		    			var domain = json.data;
//		    			setTimeout("toGrade('"+domain+"')",3000);
//		    			tishiBox("注册成功！！去<a href='javascript:void(0);' onclick=\"toGrade('"+domain+"');\">首页</a>","okok");
		    			
		    		}else{
		    			tishiBox("注册失败！！"+json.message,"cuowu");
		    		}
		    	},
				error: function(XmlHttpRequest) {
					tishiBox("发送信息错误！！请稍后再试...！！"+json.message,"cuowu");
				}
			})
		}
		reg_data.submit_flag = false;
	},
	
	forget : function() {
		var e = $("#forget_form");
		register.req_random(e);
		register.captcha_req(e, 2);
		
		e.find('input[name="' + reg_data.form_tel + '"]').focus(function(){
			register.tip($(this));
		}).blur(function(){
			register.forget_tel($(this))
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
						if( json.code == 1 ){
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
			url : '/register/forget_chkTel.htm?tel=' + t.val()+"&t="+Math.random(),
			cache : false,
			dataType: "json",
			async : false,
            success : function(json) {
				if( json.code == 1 ){
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
function toGrade(domain)
{
	window.location.href='http://agent.fangtan007.com/';
}