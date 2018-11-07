/**
 * common functions
 */


/**
 * 获取cookie
 * @param cname {string}
 * @returns {string}
 */
exports.getCookie = function (cname) {
    var arr = document.cookie.split(";");

    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
//            var key = temp[0].trim();
        var key = temp[0].replace(/^\s+|\s+$/g, '');
        var val = decodeURIComponent(temp[1]);
        if (key === cname) {
            return val;
        }
    }

    return '';
};


/**
 * 设置cookie
 * @param cname {string}
 * @param value {string}
 * @param expiredays {number}
 */
exports.setCookie = function (cname, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cname + "=" + encodeURIComponent(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}


/**
 * 获取url search中的值
 * @param name {string}
 * @returns {string}
 */
exports.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null)return r[2];
    return null;
};


/**
 * 动态加入js
 * @param url {string}
 * @param callback {function}
 */
exports.loadJS = function (url, callback) {
    var sc = document.createElement('script');
    sc.async = true;
    sc.src = url;

    /*
     ** script标签的onload和onreadystatechange事件
     ** IE6/7/8支持onreadystatechange事件
     ** IE9/10支持onreadystatechange和onload事件
     ** Firefox/Chrome/Opera支持onload事件
     */
    // 判断IE8及以下浏览器
    var isIE = !-[1,];

    if (!callback || (typeof callback) !== 'function') {
        //not handle
    } else if (isIE) {
        sc.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                callback();
            }
        }
    } else {
        // IE9及以上浏览器，Firefox，Chrome，Opera
        sc.onload = function () {
            callback();
        }
    }

    document.body.appendChild(sc);
};


/**
 * 添加css到dom
 * @param url {string}
 */
exports.loadCSS = function (url) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    var heads = document.getElementsByTagName("head");
    if (heads.length) {
        heads[0].appendChild(link);
    } else {
        document.body.appendChild(link);
    }
};


/**
 * 拷贝字符串到剪贴板
 * @param text {string}
 * @param callback {function}
 */
exports.copy = function (text, callback) {
    var textarea = document.createElement('textarea');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        if (callback && (typeof callback) === 'function') {
            callback();
        }
    } catch (err) {
        alert('您使用的浏览器不支持此复制功能，请更换chrome浏览器!');
    } finally {
        document.body.removeChild(textarea);
    }
};