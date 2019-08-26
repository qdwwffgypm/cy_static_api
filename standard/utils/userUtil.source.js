//import {ajaxUtil} from "@/assets/util/ajaxUtil";
//import {nativeUtil} from "@/assets/util/nativeUtil";
//import {stringUtil} from "@/assets/libs/stringUtil";
//import {browser} from "@/assets/libs/browser";
//import {cache} from "@/assets/libs/cache";
(function(win){
	win.CY = win.CY || {};
	var ajaxUtil = win.CY.ajaxUtil, nativeUtil = win.CY.nativeUtil, stringUtil = win.CY.stringUtil, cache = win.CY.cache;
	 var TOKENKEY = "login_token", userUtil = {
	  data: {
	    token: spm.util.cookie.get(TOKENKEY) || ""
	  },
	  set: function (token) {
	    this.data.token = token;
	    spm.util.cookie.set(TOKENKEY, token);// app 登录后
	  },
	  get: function () {
	    var _token = this.data.token;
	    if (!_token) {
	      _token = spm.util.cookie.get(TOKENKEY);
	      _token && this.set(_token);
	    }
	    return _token;
	  },// 验证登录token是否有效果
	  check_v1: function (callback) {
	    var m = this, __token, __key, __run, __getPromise;
	    __key = "__cache_key";
	    __token = spm.util.cookie.get(TOKENKEY);
	    callback = callback || function () { };
	    __getPromise = function () {// 多个线程同时进行
	      var __callback = callback;
	      return new Promise(function (resolve, reject) {
	        callback = function (data) {
	          __callback(data);
	          resolve(data)
	        }
	      })
	    }
	    // 缓存5秒
	    if (cache.get(__key) || !__token) {
	      __token = cache.get(__key) || __token || "";
	      callback(__token);
	      return new Promise(function (resolve, reject) {
	        resolve(__token);
	      });
	    }
	    if (m.__callbacks) {// 多个线程
	      var tem = __getPromise();
	      m.__callbacks.push(callback);
	      return tem;
	    }
	    m.__callbacks = [callback];
	    __run = function (token) {
	      m.__callbacks.map(function (item) {
	        setTimeout(function () {
	          item(token);
	        }, 0);
	      });
	      delete m.__callbacks;
	    }
	    return ajaxUtil.loadData("/pointgate/service/validate/loginToken", {
	      method: "POST",
	      headers: {"Accept": "application/json"},
	      body: {login_token: __token},
	      credentials: "include"
	    }).then(function (data) {
	      data = data && data.data || {};
	      __token = data.validResult == "00" ? __token : "";
	      m.set(__token);
	      __run(__token);
	      __token && cache.set(__key, __token, 1000 * 5);
	      return __token;
	    });
	  },// 验证用户是否登录;如果没有登录跳到登录并回调
	  checkLogin: function (param) {
	    param = param || {};
	    typeof (param) == "string" && (param = {url: param});
	    typeof (param) == "function" && (param = {callback: param});
	    var m = this, __loginUrl, __url, __callback, __run;
	    __url = param.url;
	    __loginUrl = "/login/getlogincode.htm";
	    __callback = param.callback || function() {};
	    __run = function(token) {
	      __callback(token, __url) !== false && __url && spm.refresh(__url)
	    }
	    m.check_v1(function(token) {
	      if (token) {
	        return __run(token);
	      }
	      if (!nativeUtil.open_v1({
	            action: "login",
	            callback: function(res) {
	              m.set(res.token);
	              __run(res.token);
	            }
	          })) {
	        __url = stringUtil.addQueryValue(__loginUrl, "callback", encodeURIComponent(__url || location.href));
	        __run(token);
	      }
	    });
	  },
	  checkLink: function () {// 验证元素是否要登录
	      var m = this, doc = document, body = doc.body;
	      if (body.__isBind) return;
	      body.__isBind = true;
	      body.addEventListener('click', function(e) {
	        var _href, cur = (e.target || e.srcElement), i = 0;
	        while (cur && cur != body) {
	          if (cur.nodeType == 1) {
	              if (i++ > 6) return ;
	              if (/^(a|area)$/i.test(cur.nodeName)) {
	                _href = cur.href || "";
	                if (_href.indexOf("needlogin=true") != -1 || cur.getAttribute("needlogin")) {
	                  m.checkLogin(_href);
	                  e.preventDefault();
	                  return;
	                }
	              }
	          }
	          cur = cur["parentNode"];
	        }
	      });
	  }
	};

	win.CY.userUtil = userUtil;
	if ( typeof define === "function" && define.amd) {
		define("userUtil", ["ajaxUtil", "nativeUtil", "stringUtil", "cache"], function(_ajaxUtil, _nativeUtil, _stringUtil, _cache) {
			ajaxUtil = _ajaxUtil;
			nativeUtil = _nativeUtil;
			stringUtil = _stringUtil;
			cache = _cache;
			return userUtil;
		});
	}
})(window);
