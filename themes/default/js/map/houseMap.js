myMap.prototype.addPageEvent = function() {
	var self = this;
	$(document).on(
			'click',
			'.map_pop_location',
			function() {
				is_set_drag_zoom = true;
				is_certain_view = true;
				_myMap.mapObj.setZoom(15);
				_myMap.mapObj.clearOverlays(); 
				_myMap.area.id = $(this).attr('areaid');
				_myMap.area.name = $(this).attr('areaName');
				_myMap.area.x = $(this).attr('x');
				_myMap.area.y = $(this).attr('y');
				_myMap.mapObj.panTo(new BMap.Point($(this).attr('x'), $(this)
						.attr('y')));
				move_load = false;

				resetAppendCondition();
				map_append_statu = "area";
				appendCondition.regionCode = $(this).attr('areaid');
				searchMapAppend();

				return false;
			});
	$(document).on(
			'click',
			'.map_pop_sublocation',
			function() {
				is_set_drag_zoom = true;
				is_certain_view = true;
				_myMap.district.id = $(this).attr('districtid');
				_myMap.district.name = $(this).attr('districtName');
				_myMap.district.x = $(this).attr('x');
				_myMap.district.y = $(this).attr('y');
				_myMap.mapObj.setZoom(17);
				_myMap.mapObj.clearOverlays(); 
				_myMap.mapObj.panTo(new BMap.Point($(this).attr('x'), $(this)
						.attr('y')));

				resetAppendCondition();
				map_append_statu = "district";
				appendCondition.boardId = $(this).attr("districtid");
				searchMapAppend();

				return false;
			});

	$(document).on('click', '.map_pop_community', function() {
		
		$('.map_pop_community').removeClass('red');
		$('.map_pop_community').removeClass('active');
		$('.map_pop_community').css('z-index', 0);
		$(this).addClass('red');
		$(this).addClass('active');
		if($("#panel").is(":hidden")) {
			is_set_drag_zoom = true;
			is_certain_view = true;
			_myMap.community.id = $(this).attr("communityId");
			_myMap.community.x = $(this).attr("x");
			_myMap.community.y = $(this).attr("y");
			var center = new BMap.Point(_myMap.community.x, _myMap.community.y);
			showMapRightPanel(center);
		} else {
			is_set_drag_zoom = false;
			is_certain_view = true;
		}
		resetAppendCondition();
		map_append_statu = "community";
		appendCondition.buildingId = $(this).attr("communityId");
		searchMapAppend();
	});

	$(document)
			.on(
					'click',
					'.pop_adsales',
					function() {
						var $map_pop_adsales = $(this).parent(
								"div[class*='map_pop_adsales']");
						if ($map_pop_adsales.find("div[class~='map_advert']")
								.html() == '') {
							$(document).find("div[class~='map_advert']").hide();
							$(document).find("div[class~='map_pop_adsales']")
									.css('z-index', 0);
							$map_pop_adsales.css('z-index', 1);

							var popObj = $map_pop_adsales;
							loadAdSalesBid(popObj);
							popObj.addClass('map_pop_adsales_cur');
						} else {
							$map_pop_adsales.find("div[class~='map_advert']")
									.html('').hide();
						}
						return false;
					});

	$(document).on('mouseover mouseout', '.map_pop_location', function(event) {
		if (event.type == 'mouseover') {
			if (checkHover(event, this)) {
				var popObj = $(this);
				var popId = popObj.attr('id');
				var testStr = 'map_pop_lv0';
				popObj.addClass('red');
				popObj.attr('old_z-index', popObj.css('z-index'));
				popObj.css('z-index', 0);
			}
		} else if (event.type == 'mouseout') {
			if (checkHover(event, this)) {
				var popObj = $(this);
				popObj.removeClass('red');
				popObj.css('z-index', popObj.attr('old_z-index'));
			}
		}
	});
	$(document).on('mouseover', '.map_pop_sublocation', function() {
		var popObj = $(this);
		var popId = popObj.attr('id');
		popObj.addClass('red');
		popObj.attr('old_z-index', popObj.css('z-index'));
		popObj.css('z-index', 0);
	});
	$(document).on('mouseout', '.map_pop_sublocation', function() {
		var popObj = $(this);
		popObj.removeClass('red');
		popObj.css('z-index', popObj.attr('old_z-index'));
	});
	$(document).on('mouseover', '.map_pop_community', function() {
		var popObj = $(this);
		var popId = popObj.attr('id');
		popObj.addClass('red');
		popObj.css('z-index', 2);
	});
	$(document).on('mouseout', '.map_pop_community', function() {
		var popObj = $(this);
		if (!popObj.hasClass('active')) {
			popObj.removeClass('red');
			popObj.css('z-index', 0);
		}
	});

};

function searchMap() {
	if (!only_around) {
		switchOperate();
		if (_myMap.nearbys != '') {
			_myMap.nearby();
		}
	}
}

function zoomendEvent() {
	if (!only_around) {
		switchOperate();

		if (house_type == 'building') {
			if (_myMap.mapStatu == 'community') {
				ableCommunityCondition();
			} else {
				disableCommunityCondition();
			}
		}

		if (!is_certain_view && house_type != 'building') {
			resetAppendCondition();
			map_append_statu = 'bounds';
			appendCondition.sw = _myMap.condition.sw;
			appendCondition.ne = _myMap.condition.ne;
			searchMapAppend();
		}

		if (_myMap.nearbys != '') {
			_myMap.nearby();
		}

		is_set_drag_zoom = false;
	}
}

function moveendEvent() {
	if (only_around) {
		return false;
	}
	if (_myMap.mapStatu == 'area') {
		changeToArea(); 
	} else if (_myMap.mapStatu == 'district') {
		changeToDistrict(); 
	} else if (_myMap.mapStatu == 'community') {
		if (is_community_load) {
			changeToCommunity(); 
		}
	}

	if (house_type == 'building') {
		if (_myMap.mapStatu == 'community') {
			ableCommunityCondition();
		} else {
			disableCommunityCondition();
		}
	}

	if (!is_certain_view && house_type != 'building') {
		resetAppendCondition();
		map_append_statu = 'bounds';
		appendCondition.sw = _myMap.condition.sw;
		appendCondition.ne = _myMap.condition.ne;
		searchMapAppend();
	}

	if (_myMap.nearbys != '') {
		_myMap.nearby();
	}

	is_set_drag_zoom = false;

}

function dragstartEvent() {
	if (!is_set_drag_zoom) {
		is_set_drag_zoom = true;
		is_certain_view = false;
	}
}

function zoomstartEvent() {
	if (!is_set_drag_zoom) {
		is_set_drag_zoom = true;
		is_certain_view = false;
	}
}

function resetMyMapCommunity() {
	_myMap.community.id = '';
	_myMap.community.x = '';
	_myMap.community.y = '';
}

myMap.prototype.addScale = function() {
	if (is_scale) {
		var ctrl_sca = new BMap.ScaleControl({
			anchor : BMAP_ANCHOR_BOTTOM_LEFT
		});
		this.mapObj.addControl(ctrl_sca);
	}
}
myMap.prototype.addBaiduImage = function() {
	if (!is_baidu) {
		$('.zuoleftimg').css('display', 'none');
		$('.zuoleftbiao').css('display', 'none');
	}
}
myMap.prototype.addNavigation = function() {
	if (is_navigation) {
		this.mapObj.addControl(new BMap.NavigationControl({
			anchor : BMAP_ANCHOR_TOP_LEFT
		}));
	}
}

myMap.prototype.nearby = function() {
	var searchComplete = function(result) {
		if (!result)
			return;
		var array = new Array();
		for ( var i = 0; i < result.getCurrentNumPois(); i++) {
			array.push(result.getPoi(i));
		}
		_myMap.addOverlay(array, null, 'near');
	};
	var local = new BMap.LocalSearch(_myMap.mapObj, {
		onSearchComplete : searchComplete,
		pageCapacity : 50
	});
	local.searchInBounds(j_nearby[_myMap.nearbys], _myMap.mapObj.getBounds());
}

myMap.prototype.addOverlay = function(data, lv, type) {
	var self = this;
	var div;
	$.each(data, function(key, value) {
		div = new ComplexCustomOverlay(value, lv, type);
		self.mapObj.addOverlay(div);
	});
};

function ComplexCustomOverlay(value, lv, type) {
	if (type == 'near') { 
		this._self = _myMap;
		this._value = value;
		this._point = value.point;
		this._title = value.title;
		this._type = type;
	} else if (type == 'main') {
		this._self = _myMap;
		this._value = value;
		this._point = new BMap.Point(value.point.toString().split("|")[0],
				value.point.toString().split("|")[1]);
		this._countNumber = value.countNumber;
		this._title = value.title;
		this._price = value.price;
		this._lv = parseInt(lv);
		this._x = this._point.lng;
		this._y = this._point.lat;
		this._type = type;
	} else if (type == 'parent') {
		this._self = _myMap;
		this._value = value;
		this._point = new BMap.Point(value.x, value.y);
		this._title = value.name;
		this._type = type;
	}

}

ComplexCustomOverlay.prototype = new BMap.Overlay(); 
ComplexCustomOverlay.prototype.createOverlay = function(map) {
	this._map = map;
	var div = this._div = document.createElement("div");
	div.setAttribute('index', '');
	if (this._type == 'near') { 
		div.id = 'map_pop_lv0_' + this._value.uid;
		div.className = "bubble-around bubble-around-" + _myMap.nearbys;
		div.setAttribute('title', this._title);
		var i_c = document.createElement("i");
		var i_a = document.createElement("i");
		i_c.className = "i-cycle";
		i_a.className = "i-arrow";
		div.appendChild(i_c);
		div.appendChild(i_a);
	} else if (this._type == 'parent') {
		div.setAttribute('title', this._title);
		var p = document.createElement("p");
		p.className = "pushpin";
		var span = document.createElement("span");
		var i = document.createElement("i");
		var title = this._title;
		if (title.substring(title.length - 1) == '区') {
			title = title.substring(0, title.length - 1);
		}
		span.appendChild(document.createTextNode(title));
		p.appendChild(span);
		p.appendChild(i);
		div.appendChild(p);
	} else if (this._type == 'main') {
		if (this._lv <= 13) {
			div.id = 'map_pop_lv1_' + this._value.id;
			div.setAttribute('areaId', this._value.id);
			div.setAttribute('areaName', this._title);
			div.setAttribute('domain', '');
			if (house_type == "building") {
				div.className = "map_pop_location range range_building";
			} else {
				div.className = "map_pop_location range";
			}
			var p = document.createElement("p");
			var span = document.createElement("span");
			div.appendChild(p);
			div.appendChild(span);
			var title = this._title;
			if (title.substring(title.length - 1) == '区') {
				title = title.substring(0, title.length - 1);
			}
			p.appendChild(document.createTextNode(title));
			if (house_type != "building") { 
				var numText = parseInt(this._value.countNumber) + '套';
				span.appendChild(document.createTextNode(numText));
			}
			div.setAttribute('x', this._x);
			div.setAttribute('y', this._y);
		} else if (this._lv <= 15) {
			div.id = 'map_pop_district_lv2_' + this._value.id;
			div.setAttribute('districtId', this._value.id);
			div.setAttribute('districtName', this._title);
			div.setAttribute('domain', '');
			if (house_type == "building") {
				div.className = "map_pop_sublocation range range_building";
			} else {
				div.className = "map_pop_sublocation range";
			}
			var p = document.createElement("p");
			var span = document.createElement("span");
			div.appendChild(p);
			div.appendChild(span);
			var title = this._title;
			if (title.substring(title.length - 1) == '区') {
				title = title.substring(0, title.length - 1);
			}
			p.appendChild(document.createTextNode(title));

			if (house_type != "building") { 
				var numText = parseInt(this._value.countNumber) + '套';
				span.appendChild(document.createTextNode(numText));
			}
			div.setAttribute('x', this._x);
			div.setAttribute('y', this._y);
		} else if (this._lv <= 18) {
			div.id = 'map_pop_community_lv2_' + this._value.id;
			div.setAttribute('communityId', this._value.id);

			var bid = '';
			if (_myMap.community.id != '') {
				bid = _myMap.community.id;
			}
			if (this._value.id == bid) {
				div.className = "map_pop_community atip red active";
				resetMyMapCommunity();
			} else {
				div.className = "map_pop_community atip";
			}
			var p = document.createElement("p");
			var span = document.createElement("span");
			div.appendChild(p);
			div.appendChild(span);
			if (house_type == "sale") {
				p.appendChild(document.createTextNode(this._price.toFixed(1)
						+ '万'));
			} else if (house_type == "rent") {
				p.appendChild(document.createTextNode(this._price.toFixed(1)
						+ '元'));
			} else {
				p.appendChild(document.createTextNode(this._price.toFixed(1)
						+ '万'));
			}

			if (house_type != "building") { 
				var numText = parseInt(this._value.countNumber) + '套';
				span.appendChild(document.createTextNode(this._title + ' ('
						+ numText + ')'));
			} else {
				span.appendChild(document.createTextNode(this._title));
			}

			div.setAttribute('x', this._x);
			div.setAttribute('y', this._y);
		}
	}

	div.style.position = "absolute";
	div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	var arrow = this._arrow = document.createElement("div");
	arrow.style.left = "18px";
	map.getPanes().labelPane.appendChild(div);
	return div;
};

ComplexCustomOverlay.prototype.initialize = function(map) {
	this._map = map;
	var div = this.createOverlay(map);
	return div;
};

ComplexCustomOverlay.prototype.draw = function() {
	var map = this._map;
	var pixel = map.pointToOverlayPixel(this._point);
	this._div.style.left = pixel.x - parseInt(this._arrow.style.left) - 0
			+ "px";
	this._div.style.top = pixel.y - 40 + "px";
};

function switchOperate() {

	if (_myMap.mapObj.getZoom() >= 19) {
		_myMap.mapStatu = 'adsales'; 
	} else

	if (_myMap.mapObj.getZoom() >= 16) {
		_myMap.mapStatu = 'community'; 
		_myMap.operate.loadList = false;
	} else if (_myMap.mapObj.getZoom() >= 14) {
		autoSearchMaker = '';
		autoSearchVal = '';
		_myMap.condition.searchType = 'all';
		_myMap.mapStatu = 'district'; 
	} else {
		autoSearchMaker = '';
		autoSearchVal = '';
		_myMap.condition.searchType = 'all';
		_myMap.mapStatu = 'area'; 
	}
	switch (_myMap.mapStatu) {
	case 'list':
		changeToList();
		break;
	case 'city':
		changeToCity();
		break;
	case 'area':
		changeToArea();
		break;
	case 'district':
		changeToDistrict();
		break;
	case 'community':
		changeToCommunity();
		break;
	case 'adsales':
		changeToAdsales();
		break;
	default:
		break;
	}
}

function changeToArea() {
	_myMap.mapObj.clearOverlays(); 
	_myMap.mapStatu = 'area';
	_myMap.operate.loadList = false;
	loadArea();
}
function changeToDistrict() {
	_myMap.mapStatu = 'district';
	_myMap.operate.loadList = false;
	loadDistrict();
}
function changeToCommunity() {
	_myMap.mapStatu = 'community';
	_myMap.operate.loadList = false;
	loadCommunity();
}
function changeToAdsales() {
	_myMap.mapStatu = 'adsales';
	_myMap.operate.loadList = false;
	loadAdsales();
}

function loadArea() {
	_myMap.resetCondition();
	data = {
		t : house_type,
		dataType : 'area',
		s_p : s_price,
		s_a : s_area,
		s_r : s_room,
		s_t : s_tag,
		zoom : _myMap.mapObj.getZoom()
	};
	$.extend(data, _myMap.condition.searchData);
	_myMap.loadDataAjax = $.ajax({
		url : _myMap.options.dataUrl,
		type : 'GET',
		data : data,
		dataType : 'json',
		beforeSend : function(XMLHttpRequest) {
			addMapLoading(); 
		},
		success : function(data) {
			if (data.houses.length > 0) {
				_myMap.mapObj.clearOverlays();
				_myMap.addOverlay(data.houses, data.zoom, 'main'); 
			} else {
				_myMap.mapObj.clearOverlays();
			}
		},
		complete : function(XMLHttpRequest) {
			removeMapLoading(); 
		},
		error : function() {
		}
	});
}

function loadDistrict() {
	_myMap.resetCondition();
	data = {
		t : house_type,
		dataType : 'district',
		s_p : s_price,
		s_a : s_area,
		s_r : s_room,
		s_t : s_tag,
		areaid : _myMap.area.id,
		sw : _myMap.condition.sw,
		ne : _myMap.condition.ne,
		zoom : _myMap.mapObj.getZoom()
	};
	$.extend(data, _myMap.condition.searchData);
	_myMap.loadDataAjax = $.ajax({
		url : _myMap.options.dataUrl,
		type : 'GET',
		data : data,
		dataType : 'json',
		beforeSend : function(XMLHttpRequest) {
			addMapLoading(); 
		},
		success : function(data) {
			if (data.houses.length > 0) {
				_myMap.mapObj.clearOverlays();
				_myMap.addOverlay(data.houses, data.zoom, 'main'); 
			} else {
				_myMap.mapObj.clearOverlays();
			}
			var currArea = new Array();
			currArea.push(_myMap.area);
			_myMap.addOverlay(currArea, null, 'parent');
		},
		complete : function(XMLHttpRequest) {
			removeMapLoading(); 
		},
		error : function() {
		}
	});
}

function loadCommunity() {
	_myMap.resetCondition();
	var data = {};
	data = {
		t : house_type,
		dataType : 'community',
		s_p : s_price,
		s_a : s_area,
		s_r : s_room,
		s_t : s_tag,
		districtid : _myMap.district.id,
		zoom : _myMap.condition.zoom,
		sw : _myMap.condition.sw,
		ne : _myMap.condition.ne
	};
	$.extend(data, _myMap.condition.searchData);
	$.ajax({
		url : _myMap.options.dataUrl,
		type : 'GET',
		data : data,
		dataType : 'json',
		beforeSend : function(XMLHttpRequest) {
			addMapLoading(); 
		},
		success : function(data) {
			if (data.houses != null && data.houses.length > 0) {
				_myMap.mapObj.clearOverlays();
				_myMap.addOverlay(data.houses, data.zoom, 'main'); 
			} else {
				_myMap.mapObj.clearOverlays();
			}
			var currDistrict = new Array();
			currDistrict.push(_myMap.district);
			_myMap.addOverlay(currDistrict, null, 'parent');
		},
		complete : function(XMLHttpRequest) {
			removeMapLoading(); 
		},
		error : function() {
		}
	});
}

myMap.prototype.resetCondition = function() {
	this.condition.zoom = this.mapObj.getZoom();
	this.condition.center = this.mapObj.getCenter(); 
	this.condition.x = this.condition.center.lng;
	this.condition.y = this.condition.center.lat;
	this.condition.bounds = this.mapObj.getBounds(); 
	this.condition.sw = this.condition.bounds.getSouthWest(); 
	this.condition.ne = this.condition.bounds.getNorthEast();
};

function addMapLoading() {
	var htm = '<div class="loadingsty"><div class="location_indicator"></div><div class="content_loadinfo">努力加载中...</div></div>';
}

function removeMapLoading() {
}
