function responsive()
{
	var oHeader=document.getElementById("header");
	var oOption=document.getElementById("option");
	var oMap=document.getElementById("map");

	var oPanel=document.getElementById("panel");
	
	var W=document.body.clientWidth;
	var H=document.body.clientHeight;
	oPanel.style.height=H-header.offsetHeight+"px";
	oMap.style.height=H-option.offsetHeight-header.offsetHeight+"px";
	oMap.style.width=W-oPanel.offsetWidth+"px";
	
}
responsive();
window.onresize=function(){responsive();};
$("#panel.listStyle #list").css("height",$(window).height()-220);

$("#panelToggle").css({
	"top":$("#panel").height()/2-20,
	"right":$("#panel").width()
})
$("#panelToggle").bind("click", function() {
	is_certain_view = false;
	if($("#panel").is(":hidden")) {
		showMapRightPanel();
	} else if($("#panel").is(":visible")) {
		hideMapRightPanel();
	}
});
function hideMapRightPanel() {
	var center = _myMap.mapObj.getCenter();
	$("#map").css("width","100%");
	$("#panelToggle").animate({"right":0});
	$("#allmap div:eq(0)").animate({"left":$("#allmap div:eq(0)").offset().left+225})
	$("#panel").animate({"width":0},function(){
		$("#panel").css("display","none");
		responsive();
		$("#panelToggle").html('<i class="left-icon"></i>');
		
		_myMap.mapObj.panTo(center, {"noAnimation": true});
	})
}

function showMapRightPanel(center) {
	if(house_type == 'sale' || house_type == 'rent') {
		$("#panel .listBox #list").empty();
	}
	if(center == undefined) {
		center = _myMap.mapObj.getCenter();
	}
	$("#panel").css("display","block");
	$("#allmap div:eq(0)").animate({"left":$("#allmap div:eq(0)").offset().left-225})
	$("#panelToggle").animate({"right":449});
	$("#panel").animate({"width":449},function(){
		responsive();
		$("#panelToggle").html('<i class="right-icon"></i>');
		_myMap.resize.flag = true;
		_myMap.resize.center = center;
	})
}


$("#option .selectBox").mouseenter(function(){
		$(".popList").css("display","none")
		$(this).find(".popList").css("display","block");
})
$("#header").mouseenter(function(){
	$(".popList").css("display","none");
});
$("#option .selectBox").mouseleave(function(){
	if($(this).attr("id")!="oMore"){
		$(this).find(".popList").css("display","none");
	}
})
$("#option .selectBox.disabled").unbind();

function ableCommunityCondition() {
	$("#price").removeClass("disabled");
	$("#age").removeClass("disabled");
	$("#price,#age").mouseenter(function(){
		$(".popList").css("display","none")
		$(this).find(".popList").css("display","block");
	})
	$("#price,#age").mouseleave(function(){
		$(this).find(".popList").css("display","none");
	})
}

function disableCommunityCondition() {
	$("#price").addClass("disabled");
	$("#age").addClass("disabled");
	$("#option .selectBox.disabled").unbind();
}

$("#option .moreBox").mouseenter(function(){
	$(this).css("display","block");
	
})

$("#map").mouseenter(function(){
	$(".popList").css("display","none")
})

function popClick(e){
	e.stopPropagation();
		$(this).parents(".selectBox").find("span").eq(0).html($(this).html());
		$(".popList").css("display","none");
};
$("#noRegionLi").bind("click", function(){
	is_set_drag_zoom = true;
	is_certain_view = true;
	
	_myMap.mapObj.setZoom(_myMap.options.defaultZoom);
	_myMap.mapObj.clearOverlays();
	_myMap.mapObj.panTo(new BMap.Point(_myMap.options.x, _myMap.options.y));
	
	resetAppendCondition();
	map_append_statu = "city";
	searchMapAppend();
});

$(".boardul li,#region_other_li").bind("click", function(){
	if($(this).attr("id") == 'region_other_li') {
		$(this).parents(".selectBox").find("span").eq(0).html($(this).find("span").html());
	} else {
		$(this).parents(".selectBox").find("span").eq(0).html($(this).html());
	}
	
	$(".popList").css("display","none");
	
	var boardId = $(this).attr("title");
	if(boardId == "") {
		is_set_drag_zoom = true;
		is_certain_view = true;
		
		_myMap.mapObj.setZoom(15);
        _myMap.mapObj.clearOverlays(); 
    	_myMap.area.id = $(this).attr('regionCode');
        _myMap.area.name = $(this).attr('regionName');
        _myMap.area.x = $(this).attr('x');
        _myMap.area.y = $(this).attr('y');
        _myMap.mapObj.panTo(new BMap.Point($(this).attr('x'), $(this).attr('y')));
        
        resetAppendCondition();
        map_append_statu = "area";
        appendCondition.regionCode = $(this).attr("regionCode");
    	searchMapAppend();
	} else {
		is_set_drag_zoom = true;
		is_certain_view = true;
		
		_myMap.mapObj.setZoom(17);
		_myMap.mapObj.clearOverlays(); 
    	_myMap.district.id = $(this).attr('boardId');
        _myMap.district.name = $(this).attr('boardName');
        _myMap.district.x = $(this).attr('x');
        _myMap.district.y = $(this).attr('y');
		_myMap.mapObj.panTo(new BMap.Point($(this).attr('x'), $(this).attr('y')));
		
		resetAppendCondition();
        map_append_statu = "district";
        appendCondition.boardId = $(this).attr("boardId");
    	searchMapAppend();
	}
});

$(".areaul li").bind("click", function(){
	$(this).parents(".selectBox").find("span").eq(0).html($(this).html());
	$(".popList").css("display","none");
	
	var area = $(this).attr("title");
	_myMap.condition.searchData["area"] = area;
	searchMap(); 
	searchMapAppend();
});

$(".roomCountul li").bind("click", function(){
	$(this).parents(".selectBox").find("span").eq(0).html($(this).html());
	$(".popList").css("display","none");
	
	var roomCount = $(this).attr("title");
	_myMap.condition.searchData["roomCount"] = roomCount;
	searchMap(); 
	searchMapAppend();
});

$("#direction").bind("change", function(){
	_myMap.condition.searchData["direction"] = $(this).val();
});
$("#deck").bind("change", function(){
	_myMap.condition.searchData["deck"] = $(this).val();
});
$("#birthYear").bind("change", function(){
	_myMap.condition.searchData["birthYear"] = $(this).val();
});
$("#moreBtn").bind("click", function(){
	searchMap(); 
	searchMapAppend();
});

$("#unitPrice_ul li").bind("click", function(){
	$(this).parents(".selectBox").find("span").eq(0).html($(this).html());
	$(".popList").css("display","none");
	
	var price = $(this).attr("title");
	_myMap.condition.searchData["price"] = price;
	searchMap(); 
});

$("#age_ul li").bind("click", function(){
	$(this).parents(".selectBox").find("span").eq(0).html($(this).html());
	$(".popList").css("display","none");
	
	var birthYear = $(this).attr("title");
	_myMap.condition.searchData["birthYear"] = birthYear;
	searchMap(); 
});

$("#oRegion .popList li").bind("click",function(){
	$("#oCircle>ul>li").css("display","none")
	$("#oCircle>ul>li").eq($(this).index()).css("display","block");
	$("#oCircle>span").html("不限");
});

$("#oCircle .popList li").unbind("click",popClick);
$(".bx").bind("click",popClick);

$("#oCircle>ul>li>ul>li").mouseenter(function(){
	$("#oCircle>ul>li>ul>li>ul").css("display","none");
	$(this).find("ul").css("display","block");
});
$("#ocDistrict ul").eq(0).find("li").each(function(i){
	$(this).find("ul").css({"left":"97px","top":30*$(this).index()-$(this).index()-1+"px"});
});
$("#ocMetro ul").eq(0).find("li").each(function(i){
	$(this).find("ul").css({"left":"97px","top":30*$(this).index()-$(this).index()-1+"px"});
});
$("#ocDistrict .boxList li").bind("click",popClick);
$("#ocDistrict .boxList li").bind("click",function(){
	if($(this).html()=="不限"){
		$(this).parents(".selectBox").find("span").eq(0).html($(this).parent().parent().find("span").eq(0).html());
	};
});
$("#ocMetro .boxList li").bind("click",popClick);
$("#ocMetro .boxList li").bind("click",function(){
	if($(this).html()=="全程"){
		$(this).parents(".selectBox").find("span").eq(0).html($(this).parent().parent().find("span").eq(0).html());
	}
});


$("#ocSchool ul li").bind("click",popClick);








$(".sort").mouseenter(function(){
	$(".menubar ul").css("display","block");
});
$(".menubar ul").mouseleave(function(){
	$(this).css("display","none");
});
$(".menubar ul li").click(function(){
	$(".sort").html($(this).html())
	$(".menubar ul").css("display","none");
});

$(".ranging").click(function(e){
	e.preventDefault();
});

$("#houseTagDiv span.on-off").click(toggleOn_housetag);
function toggleOn_housetag(e){
	if($(this).hasClass("on")){
		$(this).removeClass("on");
		var tag = $(this).attr("tagName");
		var old_tag = _myMap.condition.searchData["houseTag"];
		var new_tag_array = new Array();
		var tags = old_tag.replace(tag,"").split(",");
		for(var i=0;i<tags.length;i++) {
			if(tags[i] != "") {
				new_tag_array.push(tags[i]);
			}
		}
		_myMap.condition.searchData["houseTag"] = new_tag_array.join(",");
		
	}else{
		$(this).addClass("on");
		var tag = $(this).attr("tagName");
		var old_tag = _myMap.condition.searchData["houseTag"];
		if(old_tag == undefined || old_tag == ""){
			_myMap.condition.searchData["houseTag"] = tag;
		} else {
			_myMap.condition.searchData["houseTag"] = old_tag + "," + tag;
		}
	}
	searchMap(); 
	searchMapAppend();
}
function toggleOn(e, obj){
	e.stopPropagation();
	if($(obj).parent().hasClass("on-off-group")){
		if(!$(obj).hasClass("on")){
			$(obj).parent().find(".on-off").removeClass("on");
			$(obj).addClass("on");
		}
	}else if($(obj).hasClass("on")){
		$(obj).removeClass("on");
	}else{
		$(obj).addClass("on");
	}
}
$("#ceju").click(function(e) {
	if($(this).hasClass("on")) {
		_myMap.tools.myDis.close();
	} else {
		_myMap.tools.myDis.open();
	}
	toggleOn(e, this);
});

$("#2dmap,#streetmap").click(toggleOn);

$("#searchBtn").bind("click", function() {
	var searchVal = $("#buildname").val();
	if($.trim(searchVal) == "") return;
	$.ajax({
		type : "post",
		url : "/community/jsonBuilding?t=" + Math.random(),
		data : "buildName="+searchVal,
		success : function(data) {
			var obj = eval('(' + data + ')');
			if(obj.length >= 1) {
				_myMap.community.id = obj[0].buildingId;
				_myMap.community.x = obj[0].pointx;
				_myMap.community.y = obj[0].pointy;
				mapToBuilding();
			}
        },
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		}	
	});
});

function mapToBuilding() {
	is_set_drag_zoom = true;
	is_certain_view = true;
	
	_myMap.mapObj.setZoom(17);
	_myMap.mapObj.clearOverlays(); 
	if($("#panel").is(":hidden")) {
		var center = new BMap.Point(_myMap.community.x, _myMap.community.y);
		showMapRightPanel(center);
	} else {
		_myMap.mapObj.panTo(new BMap.Point(_myMap.community.x, _myMap.community.y));
	}
	resetAppendCondition();
    map_append_statu = "community";
    appendCondition.buildingId = _myMap.community.id;
	searchMapAppend();
	
	
}

$("#header .searchBar").mouseleave(function(){
	$("#header .search-result-box").css("display","none");
})
function onkeyword(searchVar){
	var searchVal = $(searchVar).val();
		if($.trim(searchVal) == "")
		{
		    $(".search-result-box").slideUp(50);
			return;
		}
		$.ajax({
			type : "post",
			url : "/community/jsonBuilding?t=" + Math.random(),
			data : "buildName="+searchVal,
			success : function(data) {
				var obj = eval('(' + data + ')');
				keyword_handler(obj,searchVal);
	        },
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			}	
		});
}
function keyword_handler(data,searchVal)
{
		var inHtml = "";
		for(i=0;i<data.length;i++)
		{
			inHtml += '<a class="C000 cursor" id="'+data[i].buildingId+'" title="'+data[i].buildingName+'" x="'+undefinedToEmpty(data[i].pointx)+'" y="'+(data[i].pointy)+'"><span class="xqm">'+data[i].buildingName.replace(new RegExp(searchVal,"gm"),'<b class="Cred">'+searchVal+'</b>')+'</span><span class="adds C999">'+data[i].addr.replace(new RegExp(searchVal,"gm"),'<b class="Cred">'+searchVal+'</b>')+'</span></a>';
		}
		if(inHtml!="") {
			$(".search-result-box").html(inHtml);
			$(".search-result-box").slideDown(100);
			$(".search-result-box a").click(function(){
				var v = $(this).attr("title");
				$("#buildname").val(v);
				$("#buildname").addClass("C000");
				$(".search-result-box").slideUp(50);
				if($(this).attr("x")!="" && $(this).attr("y")!="") {
					_myMap.community.id = $(this).attr("id");
					_myMap.community.x = $(this).attr("x");
					_myMap.community.y = $(this).attr("y");
					
					mapToBuilding();
				}
			});
		} else {
			$(".search-result-box").html("");
			$(".search-result-box").slideUp(50);
		}
}

function undefinedToEmpty(v) {
	if(v == undefined || v== "undefined" || v == null || v == "null") {
		return "";
	}
	return v;
}


$(".nearby").mouseenter(function(){
	$(this).find(".popList").css("display","block");
});
$(".nearby").mouseleave(function(){
	$(this).find(".popList").css("display","none");
});
$(".nearby .popList li").click(function(){
	$(".nearby>span").html($(this).find("span").html());
	$(".nearby .popList").css("display","none");
	_myMap.nearbys = $(this).attr("key");
	searchMap();
})


