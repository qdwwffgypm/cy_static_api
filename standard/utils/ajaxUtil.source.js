//import CryptoJS from 'cryptojs';
//import {browser} from '@/assets/libs/browser';
(function(win){
	win.CY = win.CY || {};
	var CTYPE = "Content-Type", AJSON = "application/json";
	var ajax = win.CY.ajax, browser = win.CY.browser, CryptoJS = win.CryptoJS;
	var ajaxUtil = {
	    _createSign: function (data, options) {
	        var keys = [], sign = [], item, i;
	        options = options || {};
	        for (item in data) {
	            if (item != "sign") {
	                keys.push(item);
	            }
	        }
	        keys.sort();
	        for (i = 0; i < keys.length; i++) {
	            sign.push(keys[i] + (options.sepStr || "") + data[keys[i]]);
	        }
	        sign.push(options.signKey || "09FB84B1-D90E-4C14-84DB-DEE924A87B51");
	        return win.CryptoJS.MD5(sign.join(options.joinStr || "")).toString();
	    },
	    loadData: function (url = "", request = {}) {
	        var _data, params = {
	            authType: "MD5",
	            msgVersion: browser.jfmore || "1.0.0",
	            custString: browser.jfmore ? "jfmore_app_h5" : "jfmore_h5",
	            platform: browser.ios ? "ios" : "android",
	            appId: (browser.jfmore ? "jfmore_h5" : browser.weixin ? "weixin_h5" : "h5"),
	            coordinate: "120,30",
	            machineNo: "abcdefgh1234567890",
	            ip: "0.0.0.0"
	        }
	        request.headers = request.headers || {};
	        var reg = new RegExp(CTYPE,"i"), has = false;
	        var reg = new RegExp(CTYPE,"i");
	        for (var key in request.headers || {}) {
	            if (request.headers.hasOwnProperty(key) && new RegExp(key,"i").test(reg)) {
	                if (request.headers[key] == AJSON) {
	                    delete request.headers[key];
	                    request.headers[CTYPE] = AJSON;
	                }
	                has = true;
	                break;
	            }
	        }
	        !has && (request.headers[CTYPE] = AJSON);
	        _data = Object.assign(params, request.body || {});
	        request.body = request.standard ? {data: _data} : _data;
	        request.body.reqTime = new Date().getTime() + "";
	        request.body.sign = this._createSign(request.standard ? request.body.data : request.body, {"signKey": request.headers[CTYPE] == AJSON ? "123456":''});

	        return ajax(url, request)
	    }
	}

	win.CY.ajaxUtil = ajaxUtil;
	if ( typeof define === "function" && define.amd) {
		define("ajaxUtil", ["ajax", "browser","CryptoJS"], function(_ajax, _browser, _CryptoJS) {
			ajax = _ajax; 
			browser = _browser; 
			CryptoJS = _CryptoJS;
			return ajaxUtil;
		});
	}
})(window);



