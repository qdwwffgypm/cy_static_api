(function(win){
	win.CY = win.CY || {};
	var cookie = {
		set : function(b, j, m) {
			m = m || {};
	        if (j === null) {
	            j = "";
	            var t = {};
	            for (var a in m) {
	                m.hasOwnProperty(a) && (t[a] = m[a]);
	            }
	            m = t;	            
	            m.expires = -1;
	        }
	        var e = "";
	        if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
	            var f;
	            if (typeof m.expires == "number") {
	                f = new Date();
	                f.setTime(f.getTime() + m.expires * 24 * 60 * 60 * 1e3);
	            } else {
	                f = m.expires;
	            }
	            e = "; expires=" + f.toUTCString();
	        }
	        m.path = m.path || "/";
	        var l = m.path ? "; path=" + m.path : "";
	        var g = m.domain ? "; domain=" + m.domain : "";
	        var a = m.secure ? "; secure" : "";
	        document.cookie = [ b, "=", encodeURIComponent(j), e, l, g, a ].join("");
	    },
	    get : function(b) {
	    	var d = null;
	        if (document.cookie && document.cookie != "") {
	            var k = document.cookie.split(";");
	            for (var h = 0; h < k.length; h++) {
	                var c = (k[h] || "").replace( /^\s+|\s+$/g, "");
	                if (c.substring(0, b.length + 1) == b + "=") {
	                	d = decodeURIComponent(c.substring(b.length + 1));
	                    break;
	                }
	            }
	        }
	        return d;
	    }
	};
	win.CY.cookie = cookie;
	if ( typeof define === "function" && define.amd) {
		define("cookie", [], function () { return cookie; } );
	}
})(window);
