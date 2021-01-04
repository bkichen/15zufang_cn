	var appendCondition = {
			pageNo: 1,
			sortField: '',
			sortOrder: '',
			regionCode: '',
			boardId: '',
			buildingId: '',
			sw: '',
			ne: ''
	};
	
	var map_append_statu = 'city';
	
	$(function() {
		$(".pageBox a").bind("click",function() {
			$("#panel.listStyle #list").scrollTop(0);
			appendCondition.pageNo = $(this).attr("page");
			searchMapAppend();
			appendCondition.pageNo = 1;
		})
		
		$("#sort_ul li").bind("click",function() {
			var field = $(this).attr("field");
			var order = $(this).attr("order");
			if(field == "") return;
			
			if(order == "asc") {
				$(this).attr("order", "desc");
				$(this).find("i").removeClass("top-gray").addClass("down-gray");
			} else if(order == "desc") {
				$(this).attr("order", "asc");
				$(this).find("i").removeClass("down-gray").addClass("top-gray");
			}
			appendCondition.sortField = field;
			appendCondition.sortOrder = order;
			searchMapAppend();
		})
		
	});
	
	function resetAppendCondition() {
		appendCondition.pageNo = 1;
		appendCondition.sortField = '';
		appendCondition.sortOrder = '';
		appendCondition.regionCode = '';
		appendCondition.boardId = '';
		appendCondition.buildingId = '';
		appendCondition.sw = '';
		appendCondition.ne = '';
	}
	
    
    function searchMapAppend() {
    	switchOperateAppend();
    }
	
	/**
     * 根据当前地图的mapStatu加载不同的数据
     * @returns {undefined}
     */
    function switchOperateAppend() {
        //console.log(_myMap.mapStatu);
        switch (map_append_statu) {
            case 'city'://地图显示区域，加载城市信息
                loadCityHouse();
                break;
            case 'area'://地图显示商圈，加载区域信息
            	loadAreaHouse();
                break;
            case 'district'://地图显示小区，加载商圈信息
            	loadDistrictHouse();
                break;
            case 'community'://加载小区信息
            	loadCommunityHouse();
                break;
            case 'bounds'://加载地图边界范围内的房源
            	loadMapBoundsHouse();
                break;
            default:
            	break;
        }
    }
    
    /**
     * 加载地图可见区域内的房源
     * @returns {undefined}
     */
    function loadMapBoundsHouse() {
        data = {
            t: house_type,
            dataType: 'bounds'
        };
        $.extend(data,_myMap.condition.searchData);
        $.extend(data,appendCondition);
        $.ajax({
            url: '/map/house_api',
            type: 'GET',
            data: data,
            dataType: 'json',
            beforeSend:function(XMLHttpRequest){
                addMapLoading(); //地图加载中
            },
            success: function(data) {
            	initBoundsHouse(data);
            },
            complete:function(XMLHttpRequest) {
                removeMapLoading(); //移除地图加载中
            },
            error: function() {
                //alert('附近未找到房源，请重新选择！');
            }
        });
    }
    
    /**
     * 加载城市房源
     * @returns {undefined}
     */
    function loadCityHouse() {
        data = {
            t: house_type,
            dataType: 'city'
        };
        $.extend(data,_myMap.condition.searchData);
        $.extend(data,appendCondition);
        $.ajax({
            url: '/map/house_api',
            type: 'GET',
            data: data,
            dataType: 'json',
            beforeSend:function(XMLHttpRequest){
                addMapLoading(); //地图加载中
            },
            success: function(data) {
            	initDataList(data);
            },
            complete:function(XMLHttpRequest) {
//                removeMapLoading(); //移除地图加载中
            },
            error: function() {
                alert('附近未找到房源，请重新选择！');
            }
        });
    }
    
	
	/**
     * 加载区域
     * @returns {undefined}
     */
    function loadAreaHouse() {
        data = {
            t: house_type,
            dataType: 'area'
        };
        $.extend(data,_myMap.condition.searchData);
        $.extend(data,appendCondition);
        $.ajax({
            url: '/map/house_api',
            type: 'GET',
            data: data,
            dataType: 'json',
            beforeSend:function(XMLHttpRequest){
                addMapLoading(); //地图加载中
            },
            success: function(data) {
            	initDataList(data);
            },
            complete:function(XMLHttpRequest) {
                removeMapLoading(); //移除地图加载中
            },
            error: function() {
                //alert('附近未找到房源，请重新选择！');
            }
        });
    }
    
    /**
     * 加载商圈房源
     * @returns {undefined}
     */
    function loadDistrictHouse() {
    	data = {
            t: house_type,
            dataType: 'district'
        };
        $.extend(data,_myMap.condition.searchData);
        $.extend(data,appendCondition);
        $.ajax({
            url: '/map/house_api',
            type: 'GET',
            data: data,
            dataType: 'json',
            beforeSend:function(XMLHttpRequest){
                addMapLoading(); //地图加载中
            },
            success: function(data) {
            	initDataList(data);
            },
            complete:function(XMLHttpRequest) {
                removeMapLoading(); //移除地图加载中
            },
            error: function() {
                //alert('附近未找到房源，请重新选择！');
            }
        });
    }
    
    /**
     * 小区
     * @returns {undefined}
     */
    function loadCommunityHouse() {
    	data = {
            t: house_type,
            dataType: 'community'
        };
        $.extend(data,_myMap.condition.searchData);
        $.extend(data,appendCondition);
        $.ajax({
            url: '/map/house_api',
            type: 'GET',
            data: data,
            dataType: 'json',
            beforeSend:function(XMLHttpRequest){
                addMapLoading(); //地图加载中
            },
            success: function(data) {
            	initCommunityResult(data);
            },
            complete:function(XMLHttpRequest) {
                removeMapLoading(); //移除地图加载中
            },
            error: function() {
                //alert('附近未找到房源，请重新选择！');
            }
        });
    }
    
 	/**
     * 地图加载中提示
     */
    function addMapLoading() {
        var htm='<div class="loadingsty"><div class="location_indicator"></div><div class="content_loadinfo">努力加载中...</div></div>';
        //$('#t_L').html(htm);
        //$('#t_L').show();
    }
    
    /**
     * 移除地图加载中提示
     */
    function removeMapLoading() {
        //$('#t_L').empty();
    }
    
    
    function nullToEmpty(v) {
    	if(v == null || v == undefined || v == 'null' || v == 'undefined') return '';
    	return v;
    }
    
    function cut(v, max_length, shenglue) {
    	if(max_length == undefined) max_length = 9;
    	if(shenglue == undefined) shenglue = "...";
    	v = nullToEmpty(v);
    	if(v.length > max_length) {
    		v = v.substr(0, max_length) + shenglue;
    	}
    	return v;
    }
    
    function fixed(v, n) {
    	v = nullToEmpty(v);
    	if(v == "") return 0;
    	return parseFloat(v).toFixed(n);
    }
    
    
    function initDataList(data) {
    	if(house_type == 'sale' || house_type == 'rent') {
    		initHouse(data);
    	} else if(house_type == 'building') {
    		initBuildingList(data);
    	}
    }
    
    function initCommunityResult(data) {
    	if(house_type == 'sale' || house_type == 'rent') {
    		initHouse(data);
    	} else if(house_type == 'building') {
    		initBuildingDetail(data);
    	}
    }
    
    function priceChart_(housePriceCharts)
	{
		var labels = new Array();
		var show_data =new Array();
		
		for(var i=0;i<housePriceCharts.length;i++) {
			var housePrice = housePriceCharts[i];
			labels.push(parseInt(housePrice.created.substr(4,6)) + "月");
			show_data.push(housePrice.housetrade_price*10000);
		}
			
		var data = {
			labels :labels,
			datasets :[
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "#3399ff",
				pointColor : "#3399ff",
				pointStrokeColor : "#fff",
				data : show_data
			}]
		}
		//挂牌均价
		var ctx = $("#price_trend").get(0).getContext("2d");
		var myNewChart = new Chart(ctx);
		
		var options = {
			bezierCurve: false,
			tooltipTemplate: "<%if (label){%><%=label%> 均价：<%}%><%= value %>元/平米"
		}
					
		myNewChart.Line(data,options);
	}
    
    function initBuildingList(data) {
    	$("#panel").empty();
		var housePriceCharts = data.housePriceCharts;
		var lastMonthChart = data.lastMonthChart;
		var lastMonth = data.lastMonth;
		var hotBuilding = data.hotBuilding;
		var viewName = data.viewName;
		
		var arrow = "";
    	if(lastMonthChart.housetrade_priceOr > 0) {
    		arrow = "rise";
    	} else if(lastMonthChart.housetrade_priceOr < 0) {
    		arrow = "fall";
    	}
    	
    	var content = [];
    	content.push('<div class="priceChart">');
    	content.push('<p class="Cred aprice mb5"><span><em>' + fixed(lastMonthChart.housetrade_price * 10000,2) + '</em>元/平米</span><span class="' + arrow + '">');
    	var priceOr = (lastMonthChart.housetrade_priceOr==0)?"--":fixed(lastMonthChart.housetrade_priceOr,2)+"%";
    	content.push('<span>环比</span><i class="arrow-icon"></i>' + priceOr + '</span></p>');
    	content.push('<p class="sub">'+ viewName + lastMonth +'月份挂牌均价</p>');
    	content.push('<div><canvas id="price_trend" width="390" height="170"></canvas></div>');
    	content.push('</div>');
    	$("#panel").append(content.join(""));
    	
    	//
    	var canvas=$("#panel #price_trend").get(0);
    	if($.browser.msie && !canvas.getContent && window.G_vmlCanvasManager){
    		canvas=window.G_vmlCanvasManager.initElement(canvas);
    	}
    	
    	content = [];
    	content.push('<div class="infoGroup">');
		content.push('<hr class="aline">');
		content.push('</div>');
		content.push('<div class="xiaoquList">');
		content.push('<p class="xiaoquListTitle">' + viewName + '热门小区</p>');
		content.push('<ul>');
		var li = [];
		for(var i=0;i<hotBuilding.length;i++) {
			if(i >=5) break;
			var hotBd = hotBuilding[i];
			li.push('<li>');
			li.push('<a href="javascript:void(0);" id="' + hotBd.buildingId + '" x="' + nullToEmpty(hotBd.pointx) + '" y="' + nullToEmpty(hotBd.pointy) + '">');
			li.push('<p class="title">' + hotBd.buildingName + '<span>二手房' + hotBd.tradeQty + '套</span></p>');
			li.push('<p><span>均价<em>' + fixed(hotBd.housetrade_price * 10000, 0) + '</em>元/平米</span>');
			var arrow_hot = "";
			var hotBd_housetrade_priceOr = hotBd.housetrade_priceOr;
			if(hotBd.housetrade_priceOr > 0) {
				arrow_hot = "↑";
				hotBd_housetrade_priceOr += "%";
			} else if(hotBd.housetrade_priceOr < 0) {
				arrow_hot = "↓";
				hotBd_housetrade_priceOr += "%";
			} else if(hotBd.housetrade_priceOr == 0) {
				hotBd_housetrade_priceOr = "--";
			}
			li.push('<span> 环比 ' + arrow_hot + ' ' + hotBd_housetrade_priceOr + '</span></p>');
			li.push('</a>');
			li.push('</li>');
		}
		content.push(li.join(""));
		
		content.push('</ul>');
		content.push('</div>');
		
		$("#panel").append(content.join(""));
		
		priceChart_(housePriceCharts);
		bindClick_hotBuilding();
    }
    
    function initBuildingDetail(data) {
    	var building = data.build.building;
    	var buildInfo = data.build.buildInfo;
    	var lastMonthChart = data.lastMonthChart;
    	var lastMonth = data.lastMonth;
    	var brokers = data.brokers;
    	
    	var arrow = "";
    	if(lastMonthChart.housetrade_priceOr > 0) {
    		arrow = "rise";
    	} else if(lastMonthChart.housetrade_priceOr < 0) {
    		arrow = "fall";
    	}
    	
    	var content = [];
    	content.push('<div class="xiaoquHeader">');
    	content.push('<div class="cityBox">');
    	content.push('<div>');
    	content.push('<img src="/themes/default/images/map/city.gif"/>');
    	content.push('<div>');
    	content.push('<span class="title">' + building.BuildingName + '</span>');
    	content.push('<p class=""><span>' + building.RegionName + '-' + building.BoardName + '</span><span title="' + building.Addr + '">' + cut(building.Addr, 15) + '</span></p>');
    	content.push('</div></div>');
    	content.push('<a href="/community/detail/esfzs/' + building.BuildingID + '" target="_blank"><i class="trend-icon fr"></i></a>');
    	content.push('</div></div>');
//    	content.push('<div class="infoGroup">
//    	var tag = [];
//    	for(var i=0;i<1;i++) {
//    		tag.push('<span class="toTag">'+ 学区房 +'</span>');
//    	}
//    	content.push(tag.join(''));
//    	content.push('</div>');
    	
    	content.push('<div class="priceChart">');
    	content.push('<p class="Cred aprice mb5"><span><em>' + fixed(lastMonthChart.housetrade_price * 10000,2) + '</em>元/平米</span>');
    	var priceOr = lastMonthChart.housetrade_priceOr==0?"--":fixed(lastMonthChart.housetrade_priceOr,2)+"%";
    	content.push('<span class="' + arrow + '"><span>环比</span><i class="arrow-icon"></i>' + priceOr + '</span>');
//    	content.push('<span class="rise"><span>同比</span><i class="arrow-icon"></i>+1.17%</span></p>');
    	content.push('<p class="sub">' + building.BuildingName + lastMonth + '月份挂牌均价</p>');
    	content.push('</div>');
    	content.push('<div class="infoGroup">');
//    	content.push('<a href="##" class="toTag">学区房</a>');
    	content.push('<a href="/community/czf/' + building.BuildingID + '" class="toTag" target="_blank">出租房 ' + building.houseLeaseQty + ' 套</a><a href="/community/esf/' + building.BuildingID + '" class="toTag Cred" target="_blank">二手房 ' + building.houseTradeQty + ' 套</a></div>');
    	if(buildInfo != undefined) {
	    	var buildYear = nullToEmpty(buildInfo.completiontime);
	    	if(buildYear != '') buildYear = new Date(buildYear).getFullYear() + '年';
	    	content.push('<div class="infoGroup">');
	    	content.push('<table class="infoTab" width="360" border="0">');
	    	content.push('<tr><td>房屋类型：' + cut(buildInfo.officetype) + '</td><td>物  业 费：' + cut(buildInfo.fee,15) + '</td></tr>');
	    	content.push('<tr><td>楼层状况：' + cut(buildInfo.buildingtypes) + '</td><td>房屋总数：' + nullToEmpty(buildInfo.households) + '</td></tr>');
	    	content.push('<tr><td>建筑年代：' + buildYear + '</td><td>停  车 位：' + cut(buildInfo.parkingspace) + '</td></tr>');
	    	content.push('<tr><td>建筑面积：' + nullToEmpty(buildInfo.buildingarea) + '</td><td>绿  化 率：' + nullToEmpty(buildInfo.greenrate) + '</td></tr>');
	    	content.push('<tr><td>开发商：' + cut(buildInfo.developer) + '</td></tr>');
	    	content.push('<tr><td>小区物业：' + cut(buildInfo.officeconsultants) + '</td></tr>');
	    	content.push('</table>');
	    	content.push('<a class="detail" href="/community/detail/' + building.BuildingID + '" target="_blank">小区详情介绍>></a>');
	    	content.push('</div>');
    	}
    	content.push('<div class="infoGroup">');
    	content.push('<hr class="aline">');
    	content.push('</div>');
    	content.push('<div class="infoGroup expert-recommend mb30">');
    	content.push('<ul>');
    	
    	var li = [];
		for(var i=0;i<brokers.length;i++) {
			if(i >=2) break;
			var bk = brokers[i];
			li.push('<li>');
			li.push('<a href="/broker/esf/' + bk.id + '" class="fl" target="_blank">');
			var img_src = "/themes/default/images/brokerDefault.png";
			if(nullToEmpty(bk.porsonImgPath) != "") {
				img_src = bk.porsonImgPath;
			}
			li.push('<img class="fl" src="' + img_src + '" title="' + bk.nick + '" style="width:60px;height:74px;"></a>');
			li.push('<div class="fl">');
			li.push('<p class="C000 name"><a href="/broker/esf/' + bk.id + '" title="' + bk.nick + '"><span class="mr5"> '+ bk.nick +' </span></a>');
			if(bk.recomState == 1) {
				li.push('<i class="paperwork-rz" title="已认证"></i>');
//				li.push('<i class="paperwork-zjs" title="小区专家"></i></p>');
			}
			li.push('<p class="C000 tel">' + bk.mobiel + '</p>');
			li.push('<p class="C666">二手房' + bk.tradeQty + '套</p>');
			li.push('</div>');
			li.push('</li>');
		}
		content.push(li.join(""));
       
		content.push('</ul>');
		content.push('</div>');
		
		$("#panel").html(content.join(""));
		$("#panel").addClass("xiaoquBrief");
    }
    
    function initBoundsHouse(data) {
    	initHouse_menubar(data);
    	initHouseList(data);
    	$(".listBox ul").height($(window).height()-220+80);
    	$("#panel .cityBox").hide();
    }
    
    function initHouse(data) {
    	initHouse_menubar(data);
    	initHouse_cityBox(data);
    	initHouseList(data);
    	$(".listBox ul").height($(window).height()-220);
    	$("#panel .cityBox").show();
    }
    
    function initHouse_menubar(data) {
    	var housePriceChart = data.priceChart;
    	var pageBean = data.pageBean;
    	
    	$("#totalCount").html(pageBean.totalCount);
    	$("#cityName").html(data.viewName);
    }
    
    function initHouse_cityBox(data) {
    	var housePriceChart = data.priceChart;
    	var pageBean = data.pageBean;
    	
    	if(map_append_statu == 'city') {
    		$("#regionCount").html("共"+data.viewChildCount+"个区");
    	} else if(map_append_statu == 'area') {
    		$("#regionCount").html("共"+data.viewChildCount+"个商圈");
    	} else if(map_append_statu == 'district') {
    		$("#regionCount").html("共"+data.viewChildCount+"个小区");
    	} else if(map_append_statu == 'community') {
    		$("#regionCount").html("共"+data.viewChildCount+"套房源");
    	}
    	
    	var house_priceOr = 0;
    	if(house_type == "sale") {
    		$("#priceChart").html(fixed(housePriceChart.housetrade_price,4));
    		$("#priceUnit").html("万");
    		house_priceOr = parseFloat(housePriceChart.housetrade_priceOr);
    	} else if(house_type == "rent") {
    		$("#priceChart").html(fixed(housePriceChart.houselease_price,2));
    		$("#priceUnit").html("元/月");
    		house_priceOr = parseFloat(housePriceChart.houselease_priceOr);
    	}
    	if(house_priceOr < 0) {
    		$("#priceOr").html(house_priceOr.toFixed(2) + "% ↓");
    	} else if(house_priceOr > 0) {
    		$("#priceOr").html(house_priceOr.toFixed(2) + "% ↑");
    	} else {
    		$("#priceOr").html("--");
    	}
    }
    
    function initHouseList(data) {
    	var housePriceChart = data.priceChart;
    	var pageBean = data.pageBean;
    	
    	var search_list = $(".listBox ul");
    	if(pageBean.list != null && pageBean.list.length > 0) {
    		var totalCount = pageBean.totalCount;
			if( totalCount > 0 ){
				//列表
				search_list.empty();
				for(var i = 0; i < pageBean.list.length; i++){
					var j = pageBean.list[i];
					var li = [];
					li.push('<li onclick="javascript:window.open(\'/' + house_type + '/detail/' + j.hid +'\')"><a><img src="' + j.frontCover + '" onerror="this.src=\'/themes/default/images/house_none.png\'"/></a>');
					li.push('<p class="title"><a href="##">' + j.title + '</a></p>');
					li.push('<p class="info">');
					li.push(cut(j.buildingName, 6, "..") + ' ' + j.area + '平米 ' + j.roomCount + '室' + j.hollCount + '厅 ');
					if(house_type=='sale') {
						li.push('<span class="price"><em>' + j.price + '</em>万</span>');
					} else if(house_type=='rent') {
						li.push('<span class="price"><em>' + j.price + '</em>'+ j.priceUnit +'</span>');
					}
					li.push('</p>');
					li.push('<p class="fangTag">');
					if( j.houseTag != '' ){
						var houseTag = j.houseTag.split(',');
						for(var a = 0; a < houseTag.length; a++){
							li.push('<span class="toTag">' + houseTag[a] + '</span> ');
						}
					}
					li.push('</p>');
					
					li.push('</li>');
					search_list.append(li.join(''));
				}
				$(".listBox").removeClass("noData");
				//分页
				$(".pageBox").show();
				$("#prevPage").attr("page", (pageBean.pageNo-1)==0?1:pageBean.pageNo-1);
				$(".pageBox .pageNum").html(pageBean.pageNo + "/" + pageBean.pageCount);
				$("#nextPage").attr("page", (pageBean.pageNo+1)>pageBean.pageCount?pageBean.pageCount:pageBean.pageNo+1);
			}
    	} else {
    		$(".listBox ul").empty();
    		$(".listBox").addClass("noData");
    		$(".pageBox").hide();
    	}
    }
    