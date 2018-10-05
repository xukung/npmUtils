/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 常用功能函数
 */

/**
 * 获取cookie
 * @param name
 * @returns {*}
 */
exports.getCookie = function (name) {
    var arrStr = document.cookie.split(";");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        var tempName = temp[0].replace(/ /, "");
        if (tempName == name) {
            return temp[1];
        }
    }
};

/**
 * 获取url search中的值
 * @param name
 * @returns {*}
 */
exports.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return r[2];
    return null;
};

/**
 * 动态加入js
 * @param url
 * @param callback
 */
exports.addjs = function (url, callback) {
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.async = true;
    oScript.src = url;

    /*
     ** script标签的onload和onreadystatechange事件
     ** IE6/7/8支持onreadystatechange事件
     ** IE9/10支持onreadystatechange和onload事件
     ** Firefox/Chrome/Opera支持onload事件
     */
    // 判断IE8及以下浏览器
    var isIE = !-[1];

    if (!callback) {
        //not handle
    } else if (isIE) {
        oScript.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                callback();
            }
        };
    } else {
        // IE9及以上浏览器，Firefox，Chrome，Opera
        oScript.onload = function () {
            callback();
        };
    }

    document.body.appendChild(oScript);
};

/**
 * 添加css到dom
 * @param url
 */
exports.addcss = function (url) {
    var doc = document;
    var link = doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    var heads = doc.getElementsByTagName("head");
    if (heads.length) {
        heads[0].appendChild(link);
    } else {
        doc.body.appendChild(link);
    }
};

/**
 * 拷贝字符串到剪贴板
 * @param text
 * @param callback
 */
exports.copyText = function (text, callback) {
    var textarea = document.createElement('textarea');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand('copy');
    document.body.removeChild(textarea);

    try {
        document.execCommand('copy');
        if (callback) {
            callback();
        }
    } catch (err) {
        alert('您使用的浏览器不支持此复制功能，请更换chrome浏览器!');
    }
};

/***/ })
/******/ ]);