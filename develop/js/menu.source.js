(function () {
	String.prototype.substitute = function(data) {
		if (data && typeof(data) == 'object') {
			return this.replace(/\{([^{}]+)\}/g, function(match, key) {
				var value = data[key];
				return (value !== undefined) ? '' + value: '';
			});
		} else {
			return this.toString();
		}
	};
	var ajax = function(url, callback) {
		var change, xhr = getXhr(), cid;
		change = function() {
			if (cid && xhr.readyState == 4 && (( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223)) {
				clearInterval(cid);
				cid = null;
				callback(xhr.responseText);
			}
		};
		xhr.open("get", url, false);
		cid = setInterval(change, 13);
		try {
			xhr.send(null);
		} catch (e) {
		}
	};
	var getXhr = function () {return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject();};

	var menuData = {
		list : [{
			title : "开发规范",
			list : [ {
				url : "ajax/guide_all.html",
				title : "1-总的规范"
			}, {
				url : "ajax/guide_file.html",
				title : "2-文件规范"
			}, {
				url : "ajax/guide_html.html",
				title : "3-HTML规范"
			}, {
				url : "ajax/guide_css.html",
				title : "4-CSS规范"
			} , {
				url : "ajax/guide_js.html",
				title : "5-JS规范"
			} , {
				url : "ajax/guide_img.html",
				title : "6-图片规范"
			} , {
				url : "ajax/guide_ext.html",
				title : "7-延伸内容"
			} 
			
			
			
			]
		}
		]
	};

	
	var doc = document;
	var menu = doc.querySelector(".menu");
	var listmod = doc.querySelector(".listmod");
	var ul = [], li = [], dataHtml = [], conHtml = [];
	ul.push('<div class="helptree">');
	ul.push('	<h3>{title}</h3>');
	ul.push('	<ul>{lis}</ul>');
	ul.push('</div>');
	li.push('<li class="{on}"><a >{title}<span class="right">{method}</span></a></li>');
	ul = ul.join("");
	li = li.join("");
	var pageName = location.href.substr(0, location.href.indexOf(".html") + 5).split("/").pop();
	
	dataHtml = menuData.list.map(function(item) {
	    item.lis = item.list.map(function(obj, index) {
	    	if (index == 0) {
	    		obj.on = "on";
	    	}
		    ajax(obj.url, function (text) {
		    	conHtml.push('<div id="{id}" class="section">{text}</div>'.substitute({
		    	    id: obj.url.match(/_(\w+)\./)[1],
		    	    text: text
		    	}));
		    	if (index == item.list.length - 1) {
		    		listmod.innerHTML = conHtml.join("");
		    		var middle = doc.querySelector(".middle");
		    		setTimeout(function () {
		    			setHtml();
		    			JEND.Menu({
							menuItem : '.helptree li', 		 // 固定元素选择器多个','分隔
							elemItem : '.listmod .section', // 内容元素选择器多个','分隔
							currCss : 'on', 	// 选中固定元素样式
							speeds:[-90, -90,-90,-90,-90,-90,-90] 		// 内容元素修正偏移量
						});
		    			var helptree = doc.querySelector(".helptree");
		    			document.onscroll = function () {
		    				var top = doc.documentElement.scrollTop;
		    				var menutop = $(menu).offset().top;
		    				if (top>0) {
		    					helptree.style.position = "fixed";
		    				} else {
		    					helptree.style.position = "static";
		    				}
		    				if (top>0) {
		    					middle.style.position = "fixed";
		    				} else {
		    					middle.style.position = "static";
		    				}
		    				
	    				};
		    		},0);
		    	}
		    });
	        return li.substitute(obj);
	    });
	    item.lis = item.lis.join("");
	    return ul.substitute(item);
	});
	menu.innerHTML = dataHtml.join("");
 
	window.setHtml = function () {
		var datalang = document.querySelectorAll("[data-lang]");
		if (!datalang.length) return;
		datalang.forEach(function (item) {
			var html = item.innerHTML, number = 1; 
			var leftHtml = '<div class="leftNum">{text}</div>', numHtml="";
			html.replace(/(\&lt;\/?\w+)/g, function (text) {
				numHtml+='<span class="gray">'+(number++)+'</span>';
			});
			
			html = html.replace(/(\"[^""]+\")/g,'<span class="atv">$1</span>');
			html = html.replace(/\s(true|function|new)/g,' <span class="atn">$1</span>');
			html = html.replace(/&lt;(\w+\s)/g,'&lt;<span class="c069 bold">$1</span>');
			html = html.replace(/&lt;(\w+)&gt;/g,'&lt;<span class="c069 bold">$1</span>&gt;');
			html = html.replace(/&lt;\/(\w+)&gt;/g,'&lt;\/<span class="c069 bold">$1</span>&gt;');
			
			item.innerHTML = numHtml ? leftHtml.substitute({text : numHtml}) + html : html;
			item.removeAttribute("data-lang");
		});
	};
	setHtml();
	
	
	function setHeader(){
		var arr = [], doc = document, header;
		arr.push('<div class="middle">');
		arr.push('	畅由前端开发规范');
		arr.push('	<div class="navbg">');
		arr.push('        <ul class="nav">');
		arr.push('            <li><a href="#">开发环境</a><i></i></li>');
		arr.push('            <li><a href="../../develop/guide/index.html">开发规范</a><i></i></li>');
		arr.push('            <li><a href="../../standard/libs/cache.html">基础库</a><i></i></li>');
		arr.push('            <li><a href="../../standard/spm/spm.html">埋点统计</a><i></i></li>');
		arr.push('        </ul>');
		arr.push('    </div>');
		arr.push('</div>');
		header = doc.getElementsByTagName('header')[0];
		header && (header.innerHTML = arr.join(''));
	}
	setHeader();
	
})();

JEND.define("JEND.Menu", function(opts, callback) {
	var m = this;
	if (!(m instanceof JEND.Menu)) {
		return new JEND.Menu(opts, callback);
	}
	m.opts = {
		menuItem : '', 	// 固定元素选择器多个','分隔
		elemItem : '', 	// 内容元素选择器多个','分隔
		goTop : '', 	// 返回顶部元素选择器
		currCss : 'curr', // 选中固定元素样式
		speeds : [], 	// 内容元素修正偏移量
		moveTime : 300, // 点击时内容元素移动时间
		deferTime : 1000// 延迟时间毫秒数
	};
	m.opts = $.extend(true, m.opts, opts || {});
	m.opts.__isStop = false;// 私有属性
	setTimeout(function() {
		m.init(callback);
	}, m.opts.deferTime || 0);
}, function() {
	JEND.Menu.prototype = {
		init : function(callback) {
			var m = this;
			m.$body = $('html, body');
			$(document).click(function(e) {
				m.clickMenu(e);
			});
			$(window).scroll(function() {
				m.scrollElem();
			});
			m.scrollElem();
			callback && callback.call(m, m);
		},
		getCalcNum : function() {
			var m = this, aIn, tIn, bIn, isGoBottom = true;
			var wh = Math.min($(window).height(), 500), dst = $(document).scrollTop() || 0;
			$(m.opts.elemItem).each(function(index, n) {
				var __speeds = m.opts.speeds[index] || 0;
				var __t = $(n).offset().top + __speeds, __h = $(n).height();
				var __bh = __t + __h, __iw = dst + wh;
				if (aIn == undefined && __t > dst && __bh < __iw) {// all in win
					aIn = index + '';
				}
				if (aIn == undefined && __t < dst && __bh > __iw) {// all in win
					aIn = index + '';
				}
				if (tIn == undefined && __t > dst && __t < __iw) {// top in win
					tIn = index + '';
				}
				if (bIn == undefined && __bh < __iw && __bh > dst) {// bottom in win
					bIn = index + '';
				}
			});
			m.__dst > dst && (isGoBottom = false);
			m.__dst = dst;
			m.__dst > 1000 && !aIn && !tIn && !bIn && (aIn = $(m.opts.elemItem).length - 1);
			return aIn || (isGoBottom ? (tIn || bIn) : (bIn || tIn)) || 0;
		},
		setMenu : function(num) {
			var m = this, opts = m.opts;
			$(opts.menuItem).removeClass(opts.currCss).eq(num).addClass(opts.currCss);
		},
		setElem : function(num, callback) {
			var m = this, opts = m.opts, __top = opts.speeds[num] || 0;
			__top += $(opts.elemItem).eq(num).offset().top + 1;
			m.$body.animate({scrollTop : __top }, opts.moveTime, function () {callback && callback()});
		},
		clickMenu : function(e) {
			var m = this, node = (e.target || e.srcElement);
			var $elems = $(node).parents().add(node);
			$(m.opts.menuItem).each(function(num, elem) {
				$elems.each(function () {
					if (this == elem) {
						m.opts.__isStop = true;
						m.setMenu(num);
						m.setElem(num, function () {
							m.opts.__isStop = false;
						});
					}
				});
			});
			$elems.each(function (num, elem) {
				if ($(m.opts.goTop || [])[0] == elem) {
					m.$body.animate({scrollTop : 0 }, m.opts.moveTime);
				}
			});
		},
		scrollElem : function() {
			!this.opts.__isStop && this.setMenu(this.getCalcNum());
			
		}
	};
});












