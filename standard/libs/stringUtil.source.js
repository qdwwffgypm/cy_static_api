(function(win){
	win.CY = win.CY || {};
	var stringUtil = {
	    comma: function(str, length) {
	        if (!length || length < 1) length = 3;
	        var source = ('' + str).split('.');
	        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,');
	        return source.join('.');
	    },
	    params: function(obj) {
	        var params = [];
	        for (var item in obj) {
	            params.push(item + '=' + obj[item]);
	        }
	        return params.join('&');
	    },
	    getQueryValue: function(str, name) {
	        if (!name) {
	            name = str;
	            str = location.href + "";
	        }
	        var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "");
	        var match = str.match(reg);
	        return ((match && match[2] || "").trim()).split("#")[0];
	    },
	    addQueryValue: function(url, name, value) {
	        var m = this, _hash = "", _val, a = "#";
	        value = value || "";
	        _val = m.getQueryValue(url, name);
	        if (_val) {
	            url = url.replace(name + "=" + _val, name + "=" + value);
	        } else {
	            if (url.indexOf(a) != -1) {
	                _hash = a + url.slice(url.indexOf(a) + 1);
	                url = url.substring(0, url.indexOf(a));
	            }
	            url += ((url.indexOf("?") > -1) ? "&" : "?") + name + "=" + value;
	        }
	        return url + _hash;
	    },
	    substitute: function(str, data) {
	        if (data && typeof(data) == 'object') {
	            return str.replace(/\{([^{}]+)\}/g, function(match, key) {
	                var value = data[key];
	                return (value !== undefined) ? '' + value: '';
	            });
	        } else {
	            return str.toString();
	        }
	    }
	};
	win.CY.stringUtil = stringUtil;
	if ( typeof define === "function" && define.amd) {
		define("stringUtil", [], function () { return stringUtil; } );
	}
})(window);
