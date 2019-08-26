(function(win){
	win.CY = win.CY || {};
	var _libs= {};
	var _isInit = false;
	var _opts= {ext: '__t__m_', t: 1000 * 60 * 30};
	var cache = {
	    debug: false,
	    set: function (item, value, time) {
	        var m = this, _time = new Date().getTime() + ((m.debug ? 1 : time) || _opts.t);
	        if (m.localStorage) {
	            _isInit && m.runClear();
	            m.localStorage.setItem(item, JSON.stringify(value));
	            m.localStorage.setItem(_opts.ext + item, _time);
	        } else {
	            _libs[item] = value;
	        }
	    },
	    get: function (item) {
	        var m = this, value, _time;
	        if (m.localStorage) {
	            _isInit && m.runClear();
	            _time = m.localStorage.getItem(_opts.ext + item)
	            value = m.localStorage.getItem(item);
	            value = JSON.parse(value);
	            if (value && _time && new Date().getTime() > _time) {
	                value = null;
	                m.del(item);
	            }
	        } else {
	            value = _libs[item];
	        }
	        return value;
	    },
	    del: function (item) {
	        var m = this;
	        delete _libs[item];
	        if (m.localStorage) {
	            m.localStorage.removeItem(item);
	            m.localStorage.removeItem(_opts.ext + item);
	        }
	    },
	    runClear: function () {
	        var _ext, _time, storage, cItem;
	        storage = win.localStorage;
	        if (!storage) {
	            return;
	        }
	        _ext = _opts.ext;
	        _time = new Date().getTime();
	        for (var key in storage) {
	            cItem = storage.getItem(_ext + key) || 0;
	            if (cItem && cItem > 0 && _time > cItem) {
	                storage.removeItem(key);
	                storage.removeItem(_ext + key);
	            }
	        }
	        _isInit = false;
	    },
	    toCacheImg: function (imgObj, timg){
	        var m = this;
	        var url = imgObj.currentSrc.split(".com/")[1];
	        if (url && !cache.get(url)) {
	            var text = m.getBase64Img(imgObj, url.split(".")[1]);
	            text && cache.set(url, text, timg);
	        }
	    },
	    getBase64Img: function(img, type) {
	        var canvas = document.createElement("canvas");
	        canvas.width = img.width;
	        canvas.height = img.height;
	        var ctx = canvas.getContext("2d");
	        ctx.drawImage(img, 0, 0, img.width, img.height);
	        try {
	            return canvas.toDataURL("image/" + type);
	        } catch (e) {
	            return null;
	        }
	    },
	    localStorage: function () {
	        var storage = win.localStorage;
	        if (storage) {
	            try {
	                storage.setItem("__has_", true);
	                storage.removeItem("__has_");
	                return storage;
	            } catch (e) {
	                return false;
	            }
	        }
	        setTimeout(function () {
	            cache.runClear();
	        }, 0);
	        return false;
	    }()
	};
	win.CY.cache = cache;
	if ( typeof define === "function" && define.amd) {
		define("cache", [], function () { return cache; } );
	}
})(window);
