//import {browser} from "@/assets/libs/browser";
(function(win){
	win.CY = win.CY || {};
	var browser = win.CY.browser;
	var nativeUtil = {
	    loadUrl: function (url) {
	        var f = document.createElement("iframe");
	        f.setAttribute("src", url);
	        f.setAttribute("style", "display:none;");
	        document.body.appendChild(f);
	        f.parentNode.removeChild(f);
	        f = null;
	    },
	    open: function (host, action, data, callback) {
	        //exam native://{host}?action={action}[&data={data}][&callback={callback}]
	        var url = "native://" + host + "?action=" + action;
	        if (typeof (data) == "function") {
	            callback = data;
	            data = {};
	        }
	        if (data) {
	            url += "&data=" + encodeURIComponent(JSON.stringify(data || {}));
	        }
	        if (callback) {
	            url += "&callback=" + callback;
	        }
	        this.loadUrl(url);
	    },
	    bridge: {
	        check: function (callback) {
	            if (win.WebViewJavascriptBridge) {
	                return callback(win.WebViewJavascriptBridge);
	            }
	            if (win.WVJBCallbacks) {
	                return win.WVJBCallbacks.push(callback);
	            }
	            win.WVJBCallbacks = [callback];
	            var WVJBIframe = document.createElement("iframe");
	            WVJBIframe.style.display = "none";
	            WVJBIframe.src = "https://__bridge_loaded__";
	            document.documentElement.appendChild(WVJBIframe);
	            setTimeout(function () {
	                document.documentElement.removeChild(WVJBIframe)
	            }, 0)
	        },
	        open: function (action, data, callback) {
	            if (typeof (data) == "function") {
	                callback = data;
	                data = {};
	            }
	            this.check(function () {
	                if (!win.WebViewJavascriptBridge) {
	                    alert("您的APP版本过低，请升级APP。");
	                    return false;
	                }
	                win.WebViewJavascriptBridge.callHandler("jsCallNative", {
	                    action: action,
	                    params: data || {}
	                }, function (response) {
	                    callback && callback(response);
	                });
	            });
	        }
	    },
	    open_v1: function (param) {// nativeUtil.open_v1({action:"test",data:{name:"张三"},callback:function(){}})nativeUtil.open_v1({action:"test",data:{name:"张三"},ios:{isVebView:true,host:"user",action:"share"},callback:function(){}})nativeUtil.open_v1({action:"test",data:{name:"张三"},ios:{isVebView:true,host:"user",action:"share"},android:{isBridge:true,action:"share"},callback:function(){}})
	        if (!browser.jfmore) return false;
	        var m = this, jsonp = "json" + (Math.random() + "").substr(2);
	        win[jsonp] = function (data) {
	            param.callback && param.callback(data);
	            delete win[jsonp];
	        }
	        var __isVebView, __host, __action, __data;
	        var __ios = param.ios || {}, __android = param.android || {};
	        if (browser.ios) {
	            __isVebView = typeof (__ios.isVebView) == "boolean" ? __ios.isVebView : false;
	            __host = __ios.host || param.host;
	            __action = __ios.action || param.action;
	            __data = __ios.data || param.data;
	        } else {
	            __isVebView = typeof (__android.isVebView) == "boolean" ? __android.isVebView : true;
	            __host = __android.host || param.host;
	            __action = __android.action || param.action;
	            __data = __android.data || param.data;
	        }
	        if (__isVebView) {
	            m.open(__host || "user", __action, __data, jsonp);
	        } else {
	            m.bridge.open(__action, __data, win[jsonp]);
	        }
	        return true;
	    },
	    closeWebview: function (param) {
	        return this.open_v1(param || {action: "closewebview"});
	    },
	    goBack: function () {// 返回上一页
	        if (document.referrer) {
	            history.back();
	        } else if (browser.jfmore) {
	            this.closeWebview();
	        }
	    },
	    goHome: function (url) {// 返回首页
	        if (browser.jfmore) {
	            this.closeWebview();
	        } else {
	            spm.refresh(url || "/jfmall/index.htm");
	        }
	    }
	};
	
	win.CY.nativeUtil = nativeUtil;
	if ( typeof define === "function" && define.amd) {
		define("nativeUtil", ["browser"], function(_browser) {
			browser = _browser; 
			return nativeUtil;
		});
	}
	
})(window);
