	var is_set_drag_zoom = false;

	var _myMap;
	var isFullScreen = false;
	var is_certain_view = true;
	var is_drag_zoom = false;
    var circleNum=0; 
    var autoSearchVal=''; 
    var my_radius=1000; 
    var only_around=false; 
    var move_load=true;
    var is_scale=true; 
    var is_navigation=false; 
    var is_baidu=false; 
    var is_community_load=true; 
    var zoomId=12; 
    var house_type="all"; 
    var s_price=0;
    var s_area=0; 
    var s_room=0; 
    var s_tag=0; 
    var j_nearby = {'bus':'公交', 'bank':'银行', 'hospital':'医院', 'shop':'购物', 'eat':'美食', 'education':'学校'};

function myMap(options) {
    this.loadDataAjax = null;
    this.mapStatu = 'area';
    this.operate = { loadList:false };
    this.tools = { myDis: null };
    this.ply = {};
    this.nearbys = '';

    this.options = {
        x: '',
        y: '',
        cityName: '',
        dataUrl: '',
        defaultZoom: 10,
        mapBoxId: 'map'
    };
    
    this.resize = {
    	flag: false,
    	center: null
    },
    
    this.condition = {
        zoom: null,
        center: null, 
        x: null,
        y: null,
        bounds: null,
        sw: null, 
        ne: null, 
        searchType: '', 
        searchData: {} 
    };
    this.area = {
        id: '',
        name: '',
        x: '',
        y: ''
    };
    this.district= {
        id: '',
        name: '',
        x: '',
        y: ''
    };
    this.community = {
        id: '', 
        x: '',
        y: '',
        data: '', 
        key: '', 
        index: 0,
        keys: new Array(),
        localSearchResult: null,
        infoList: null
    }
    this.subWay = {
        isSubWay: false,
        line: ''
    }
    this.mapObj = null;
    if (options) {
        if (options.x) {
            this.options.x = options.x;
        }
        if (options.y) {
            this.options.y = options.y;
        }
        if (options.cityName) {
            this.options.cityName = options.cityName;
        }
        if (options.dataUrl) {
            this.options.dataUrl = options.dataUrl;
        }
        if (options.defaultZoom) {
            this.options.defaultZoom = options.defaultZoom;
        }
        if (options.mapBoxId) {
            this.options.mapBoxId = options.mapBoxId;
        }
    }
    myMap.prototype.loadMap = function() {
        var self = this;
        _myMap.addPageEvent();
        _myMap.mapObj = new BMap.Map(this.options.mapBoxId, {enableMapClick:false,minZoom:11,maxZoom:17});
		_myMap.mapObj.addEventListener('zoomend', zoomendEvent);
		_myMap.mapObj.addEventListener('moveend', moveendEvent);
		_myMap.mapObj.addEventListener('dragstart', dragstartEvent);
		_myMap.mapObj.addEventListener('zoomstart', zoomstartEvent);
		_myMap.mapObj.addEventListener('resize', function(){
			if(_myMap.resize.flag) {
				_myMap.mapObj.panTo(_myMap.resize.center, {"noAnimation": true});
				_myMap.resize.flag = false;
			}
		});
		
        this.mapObj.enableScrollWheelZoom(); 
        this.mapObj.enableDragging(); 
        this.mapObj.enableDoubleClickZoom(); 
        this.mapObj.centerAndZoom(new BMap.Point(this.options.x, this.options.y), this.options.defaultZoom); 
        this.addScale(); 
        this.addNavigation(); 
        this.addBaiduImage(); 
        this.tools.myDis = new BMapLib.DistanceTool(this.mapObj);
    };
}



function checkHover(e, target) {  
    if (getEvent(e).type == "mouseover") {  
        return !contains(target, getEvent(e).relatedTarget  
        || getEvent(e).fromElement)  
        && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target);  
    } else {  
        return !contains(target, getEvent(e).relatedTarget  
        || getEvent(e).toElement)  
        && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target);  
    }  
}  

function contains(parentNode, childNode) {  
    if (parentNode.contains) {  
        return parentNode != childNode && parentNode.contains(childNode);  
    } else {  
        return !!(parentNode.compareDocumentPosition(childNode) & 16);  
    }  
}  
function getEvent(e) {  
    return e || window.event;  
}



function mapBoxResize() {
    var bodyHeight = $(document.body).height();
    var bodyWidth = $(document.body).width();
    var centerHeight = bodyHeight - 100;
    
    if (centerHeight < 849) {
    }
    if(isFullScreen) {
    	$(".map_box").width(document.documentElement.clientWidth);
    	$(".map_box").height(document.documentElement.clientHeight);
    	reloadMap(_myMap);
    } else {
    	$("#map").height(centerHeight);
    }
}

function rightBoxResize(centerHeight) {
}