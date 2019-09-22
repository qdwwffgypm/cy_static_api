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
	var menuData = {
		list : [ {
			title : "目录结构",
			list : [{
				url : "../column/column.html",
				title : "目录结构说明"
			}, {
				url : "../column/notice.html",
				title : "注意事项"
			} ]
		},  {
			title : "前端架构整体方案",
			list : [ {
				url : "../base/base.html",
				title : "base.js说明"
			}, {
				url : "../requirejs/requirejs.html",
				title : "按需加载方案"
			}, {
				url : "../cachLibs/cachLibs.html",
				title : "类库本地存储方案"
			}]
		},  {
			title : "页面埋点",
			list : [ {
				url : "../spm/spm.html",
				title : "页面埋点"
			}]
		}, {
			title : "基本类libs",
			list : [ {
				url : "../libs/rem.html",
				title : "页面自适应方案"
			} , {
				url : "../libs/browser.html",
				title : "浏览器判断",
				method:"CY.browser"
			}, {
				url : "../libs/cache.html",
				title : "数据缓存",
				method:"CY.cache"
			}, {
				url : "../libs/stringUtil.html",
				title : "String方法扩展",
				method:"CY.stringUtil"
			} , {
				url : "../libs/ajax.html",
				title : "ajax方法",
				method:"CY.ajax"
			} , {
				url : "../libs/cookie.html",
				title : "cookie",
				method:"CY.cookie"
			} , {
				url : "../libs/countdown.html",
				title : "倒计时",
				method:"CY.countdown"
			} , {
				url : "../libs/tooltip.html",
				title : "提示层",
				method:"CY.tooltip"
			}, {
				url : "../libs/valid.html",
				title : "数据校验1",
				method:"CY.valid"
			} , {
				url : "../libs/validate.html",
				title : "数据校验2",
				method:"CY.validate"
			}, {
				url : "../libs/iterator.html",
				title : "迭代器加载模块",
				method:"CY.iterator"
			}, {
				url : "../libs/offset.html",
				title : "获取元素位置信息",
				method:"CY.offset"
			}, {
				url : "../libs/select.html",
				title : "下拉列表",
				method:"CY.select"
			}, {
				url : "../libs/page.html",
				title : "pc端分页",
				method:"CY.page"
			} , {
				url : "../libs/searchModule.html",
				title : "搜索框",
				method:"CY.searchModule"
			}, {
				url : "../libs/historyModule.html",
				title : "历史记录列表",
				method:"CY.historyModule"
			}, {
				url : "../libs/drag.html",
				title : "拖曳功能",
				method:"CY.drag"
			}, {
				url : "../libs/pullRefresh.html",
				title : "加载更多功能",
				method:"CY.pullRefresh"
			}, {
				url : "../libs/inpNumber.html",
				title : "输入框加减",
				method:"CY.inpNumber"
			}, {
				url : "../libs/jsonp.html",
				title : "jsonp方式请求数据",
				method:"CY.jsonp"
			} , {
				url : "../libs/slider.html",
				title : "图片轮播滑动",
				method:"CY.slider"
			}, {
				url : "../libs/sliderTab.html",
				title : "tab标签菜单",
				method:"CY.sliderTab"
			}, {
				url : "../libs/sliderWin.html",
				title : "窗口切换",
				method:"CY.sliderWin"
			}, {
				url : "../libs/sliderScroll.html",
				title : "上下滚动窗口",
				method:"CY.sliderScroll"
			}]
		}, {
			title : "工具类utils",
			list : [{
				url : "../utils/ajaxUtil.html",
				title : "ajaxUtil方法",
				method:"CY.ajaxUtil"
			}, {
				url : "../utils/nativeUtil.html",
				title : "APP交互",
				method:"CY.nativeUtil"
			}, {
				url : "../utils/userUtil.html",
				title : "用户登录态",
				method:"CY.userUtil"
			}, {
				url : "../utils/shareUtil.html",
				title : "分享方法",
				method:"CY.shareUtil"
			}, {
				url : "../utils/serverUtil.html",
				title : "常用服务类",
				method:"CY.serverUtil"
			} , {
				url : "../utils/sliderUtil.html",
				title : "图片轮播滑动(旧)",
				method:"CY.sliderUtil"
			},{
				url : "../utils/floatNav.html",
				title : "浮动固定元素",
				method:"CY.floatNav"
			},{
				url : "../utils/lazyloadUtil.html",
				title : "延迟加载图片",
				method:"CY.lazyloadUtil"
			}, {
				url : "../utils/checkUtil.html",
				title : "图形&短信校验码",
				method:"CY.checkUtil"
			}]
		}, {
			title : "效果类uis",
			list : [{
				url : "../uis/dialog.html",
				title : "遮罩层&弹出窗口",
				method:"CY.ui"
			},{
				url : "../uis/funcModule.html",
				title : "功能球",
				method:"CY.funcModule"
			},{
				url : "../uis/proModule.html",
				title : "商品推荐位",
				method:"CY.proModule"
			},{
				url : "../uis/adModule.html",
				title : "广告推荐位",
				method:"CY.adModule"
			},{
				url : "../uis/adChModule.html",
				title : "品型广告推荐位",
				method:"CY.adChModule"
			},{
				url : "../uis/navModule.html",
				title : "浮动导航条",
				method:"CY.navModule"
			},{
				url : "../uis/adCellModule.html",
				title : "功能列表",
				method:"CY.adCellModule"
			}]
		}
		]
	};

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
	
	var doc = document;
	var menu = doc.querySelector(".menu");
	var conTitle = doc.querySelector(".listmod .conTitle");
	var ul = [], li = [], dataHtml = [];
	ul.push('<div class="helptree">');
	ul.push('	<h3>{title}</h3>');
	ul.push('	<ul>{lis}</ul>');
	ul.push('</div>');
	li.push('<li class="{on}"><a href="{url}">{title}<span class="right">{method}</span></a></li>');
	ul = ul.join("");
	li = li.join("");
	var pageName = location.href.substr(0, location.href.indexOf(".html") + 5).split("/").pop();
	
	dataHtml = menuData.list.map(function(item) {
	    item.lis = item.list.map(function(item) {
	    	if (item.url.indexOf(pageName) != -1) {
	    		doc.title = item.title;
    			conTitle.innerHTML = item.title;
    			item.on = "on";
	    	}
	        return li.substitute(item);
	    });
	    item.lis = item.lis.join("");
	    return ul.substitute(item);
	});
	dataHtml.unshift('<div class="middle">');
	dataHtml.push('</div>');
	menu.innerHTML = dataHtml.join("");
	
	var explains = doc.querySelectorAll(".explain");
	if (explains) {
	    for (var i = 0; i < explains.length; i++) {
	        (function(i) {
	            var elem = explains[i];
	            if (elem.querySelector(".title")) {
	            	elem.querySelector(".title").onclick = function() {
	            		elem.classList.toggle("isShow");
	            	};
	            }
	        } )(i);
	    }
	}
	
	(function () {
		var datalang = document.querySelectorAll("[data-lang]");
		if (!datalang.length) return;
		datalang.forEach(function (item) {
			var html = item.innerHTML;
			html = html.replace(/(\"[^""]+\")/g,'<span class="atv">$1</span>');
			html = html.replace(/\s(true|function)/g,'<span class="atn">$1</span>');
			html = html.replace(/(\/\/.*)/g,'<span class="gray">$1</span>');
			item.innerHTML = html;
		});
	})();
	
	
	var helptreeMiddle = doc.querySelector("header .middle");
	var middle = doc.querySelector(".menu .middle");
	document.onscroll = function () {
//		var top = doc.documentElement.scrollTop;
//		var menutop = $(menu).offset().top;
//		if (top>0) {
//			helptreeMiddle.style.position = "fixed";
//		} else {
//			helptreeMiddle.style.position = "static";
//		}
//		if (top>0) {
			middle.style.position = "fixed";
//		} else {
			middle.style.position = "static";
//		}
	};
})();












