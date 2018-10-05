/**
 * 常用功能函数
 */

/**
 * 获取cookie
 * @param name
 * @returns {*}
 */
exports.getCookie = function (name) {
    let arrStr = document.cookie.split(";");
    for (let i = 0; i < arrStr.length; i++) {
        let temp = arrStr[i].split("=");
        let tempName = temp[0].replace(/ /, "");
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
    if (r != null)return r[2];
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
    var isIE = !-[1,];

    if (!callback) {
        //not handle
    } else if (isIE) {
        oScript.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                callback();
            }
        }
    } else {
        // IE9及以上浏览器，Firefox，Chrome，Opera
        oScript.onload = function () {
            callback();
        }
    }

    document.body.appendChild(oScript);
};


/**
 * 添加css到dom
 * @param url
 */
exports.addcss = function (url) {
    let doc = document;
    let link = doc.createElement("link");
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
    let textarea = document.createElement('textarea');
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