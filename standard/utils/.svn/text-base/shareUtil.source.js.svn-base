(function(win){
	win.CY = win.CY || {};
	var ajax = win.CY.ajax, browser = win.CY.browser, require;
    var _callbacks, _loadSlider = function (path, callback) {
        if (_callbacks) {
            return _callbacks = [callback];
        }
        _callbacks = [callback];
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = path[0];
        document.getElementsByTagName("head")[0].appendChild(script);
        script.onload = function () {
            _callbacks[0]({});
        };
    };
    // 防页面已加载
    var _copy = function (target, source) {
        for (var key in source) {
            typeof (source[key]) != "object" && (target[key] = source[key]);
        }
        return target;
    }
    /*
    win.CY._shareData = {
        title: '热嗨世界杯赢iphone X',
        desc: '热嗨世界杯赢iphone X',
        imgUrl: location.origin + '/event/2018/worldCup/img/banner.jpg',
        link: location.href,
        success : function () {},//成功回调
        weixin : {},
        qq : {},
        qzone : {},
    };
    shareUtil.setShareInfo(win.CY._shareData);
    */
    var shareUtil = {
        _path: {
            weixin: "//res.wx.qq.com/open/js/jweixin-1.2.0.js",
            qq: "//open.mobile.qq.com/sdk/qqapi.js",
            qzone: "//qzonestyle.gtimg.cn/qzone/hybrid/lib/jsbridge.js"
        },
        _initWeixin:function (param, wx) {
        	if (!wx.config) {
             wx = window.wx;
            }
            ajax("/pointgate/wechat/jsapi/auth.htm", {
                method: "GET",
                body: {authUrl: location.href.split("#")[0]}
            }).then(function(data) {
                if (data.respCode != "0000") return;
                data = data.data || {};
                var __jsApiList, __param = {
                    debug: false, //
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                }
                __jsApiList = _copy([], __param.jsApiList);
                wx.config(__param);
                wx.ready(function() {
                    __jsApiList.forEach(function(item) {
                        wx[item](param);
                    })
                });
                wx.error(function() {});

            });
        },
        _initQq:function (param) {
            // title string	必选：是 分享标题
            // desc	string	必选：是 分享描述
            // imgUrl string 必选：是 分享图标
            // link	string	必选：是 分享链接
            // success 必选：否 成功回调
            param.image_url = param.imgUrl;
            param.share_url = param.link;
            win.mqq.data.setShareInfo(param);
        },
        _initQzone:function (param) {
            // title string	必选：是 分享标题
            // desc	string	必选：是 分享描述
            // imgUrl string 必选：是 分享图标
            // link	string	必选：是 分享链接
            // type	string	必选：否 分享类型，默认为link
            // success 必选：否 成功回调
            var __jsApiList = ["toQQ", "toQz", "toWX", "toTL"];
            __jsApiList.forEach(function(item) {
                win.mqq.invoke("share", item, param, function(evt) {
                    param.success && param.success(evt);
                });
            })
        },
        setShareInfo:function (param) {
            var _type = browser.weixin ? "weixin" : (browser.qq ? "qq" : (browser.qzone ? "qzone" : ""));
            // 页面JS已加载
            if (win.weixin && win.wx || browser.qq && win.mqq || browser.qzone && win.QZAppExternal) {
                _loadSlider = function(path, callback) {
                    callback();
                };
            }
            if (!_type) return;
            var m = this, __data = {}, __path;
            _copy(__data, param);   // 复制基本参数
            _copy(__data, param[_type] || {});  // 复制特定浏览器参数
            require([m._path[_type]], function (insta) {
                m["_init" + _type.charAt(0).toUpperCase() + _type.slice(1)](__data, insta);
            });
        }
    };
    
    win.CY.shareUtil = shareUtil;
	if ( typeof define === "function" && define.amd) {
		require = window.require;
		define("shareUtil", ["ajax", "browser"], function(_ajax, _browser) {
			ajax = _ajax; 
			browser = _browser; 
			return shareUtil;
		});
	} else {
		require = _loadSlider;
	}
})(window);
