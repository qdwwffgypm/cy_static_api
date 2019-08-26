(function(win){
	win.CY = win.CY || {};
	var ua = navigator.userAgent.toLowerCase();
	var jfmore = ua.match(/(ios|android)_jfmore_(\d\.\d\.\d)/i);
	var browser = {
		ios : /(iphone|ipod|ipad|ios)/i.test(ua),
		android : !!ua.match(/android/i),
		weixin : !!ua.match(/micromessenger/i),
		qq : !!ua.match(/qq\/([\d\.]+)/),
		qzone : /qzone/.test(ua),
		jfmore : (jfmore && jfmore[2].trim()) || "",
		webp : function() {
			return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
		}()
	};
	win.CY.browser = browser;
	if ( typeof define === "function" && define.amd) {
		define("browser", [], function () { return browser; } );
	}
})(window);
