//import {ajaxUtil} from '@/assets/util/ajaxUtil'
//import {cache} from '@/assets/libs/cache'
(function(win){
	win.CY = win.CY || {};
	function serverUtil () {}
	var ajaxUtil = win.CY.ajaxUtil, cache = win.CY.cache;
	var isPrd = document.domain == "m.changyoyo.com";
    serverUtil.cssUrl = isPrd ? "//css.changyoyo.com" : "//css.ppppoints.com";
    serverUtil.jsUrl = isPrd ? "//js.changyoyo.com" : "//js.ppppoints.com";
    serverUtil.imgUrl = isPrd ? "//image.changyoyo.com" : "//img.ppppoints.com";
    
	serverUtil.getCurrTime = function(callback) {
        callback = callback || function () {};
        var m = this, getTime, __getPromise, __run;
        getTime = function () {
            return new Date((+new Date()) + m.__daTime)
        }
        __getPromise = function () {// 多个线程同时进行
            var __callback = callback;
            return new Promise(function (resolve, reject) {
                callback = function (data) {
                    __callback(data);
                    resolve(data)
                }
            })
        }
        if (m.__isSynchTime) {// 已经同步
            callback(getTime());
            return new Promise(function (resolve, reject) {
                resolve(getTime())
            });
        }
        if (m.__timeCallbacks) {// 多个线程
            var tem = __getPromise()
            m.__timeCallbacks.push(callback)
            return tem;
        }
        m.__timeCallbacks = [callback];
        __run = function () {
            var time = getTime();
            m.__timeCallbacks.map(function (item) {
                setTimeout(function () {
                    item(time);
                }, 0);
            });
            delete m.__timeCallbacks;
        }
        return ajaxUtil.loadData('/pointgate/common/getServerDate', {}).then(function (data) {
            if (data.respCode === '0000') {
                m.__daTime = data.data.serverDate - (+new Date())
                m.__isSynchTime = true;
                __run();
            }
            return getTime()
        })
    };
	serverUtil.loadRecommend = function(params, callback) {
        var that = this
        var sin = ','
        var all = 'all'

        cache.__items = cache.__items || {}

        if (typeof params.keyIds === 'function') {
            callback = params.keyIds
            params.keyIds = []
        }

        if (typeof params.keyIds === 'string') {
            params.keyIds = params.keyIds.split(sin)
            callback = callback || function () {}
        }
        if (params.cache) {
            cache.runClear()
            params.cache = Number(params.cache)
        }
        for (var i = params.keyIds.length - 1, val, fun; i >= 0; i--) {
            val = params.keyIds[i]
            fun = val + sin
            if (cache.get(val)) {
                if (val === all) {
                    var __obj = cache.get(val) || {}
                    for (var key in __obj) {
                        // 处理默认的
                        if (__obj.hasOwnProperty(key) && Object.prototype.toString.call(__obj[key]) === '[object Array]') {
                            callback(val, __obj[key])
                        }
                    }
                } else {
                    callback(val, cache.get(val))
                }
                params.keyIds.splice(i, 1)
                continue
            }
            if (!cache.__items[fun]) {
                cache.__items[fun] = [ callback ]
            } else {
                cache.__items[fun].push(callback)
                params.keyIds.splice(i, 1)
            }
        }

        if (!params.keyIds.length) return
        if (params.onSend && params.onSend.call(that, params, callback) === false) return
        for (var i = params.keyIds.length - 1; i >= 0; i--) {
            // 默认值
            params.keyIds[i] === all && params.keyIds.splice(i, 1)
        }
        var _body = {keyId: params.keyIds.join(sin)}
        params.login_token && (_body.login_token = params.login_token)

        ajaxUtil.loadData(params.url || '/pointgate/service/position/newRecommend', {
            method: 'POST',
            body: _body
        }).then(function (data) {
            params.onAfter && params.onAfter.call(that, params, data)
            if (data.respCode === '0000') {
                for (var i = params.keyIds.length - 1, val, fun; i >= 0; i--) {
                    val = params.keyIds[i]
                    fun = val + sin
                    var _arr = data.data[val] || []
                    _arr.sort(function (a, b) {
                        return b.sort - a.sort
                    })
                    cache.set(val, _arr, params.cache)
                    cache.__items[fun].forEach(function (item) {
                        item(val, _arr)
                    })
                    delete cache.__items[fun]
                    delete data.data[val]
                }
                var __obj = {}
                var __has
                for (var key in data.data) {
                    // 处理默认的
                    if (data.data.hasOwnProperty(key) && Object.prototype.toString.call(data.data[key]) === '[object Array]') {
                        __has = true
                        var val = all
                        var fun
                        fun = val + sin
                        var _arr = data.data[key] || []
                        _arr.sort(function (a, b) {
                            return b.sort - a.sort
                        })
                        __obj[key] = _arr
                        cache.__items[fun].forEach(function (item) {
                            item(val, _arr)
                        })
                        delete data.data[key]
                    }
                }
                __has && cache.set(all, __obj, params.cache)
            }
        })
    };
    
	win.CY.serverUtil = serverUtil;
	if ( typeof define === "function" && define.amd) {
		define("serverUtil", ["ajaxUtil", "cache"], function(_ajaxUtil, _cache) {
			ajaxUtil = _ajaxUtil; 
			cache = _cache; 
			return serverUtil;
		});
	}
})(window);
