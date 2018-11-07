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
 * @param expiredays {number} if set to -1 ,remove cname
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
 * 动态加载js
 * @param src {string}
 * @param callback {function}
 */
exports.loadJS = function (src, callback) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;

    /*
     ** script标签的onload和onreadystatechange事件
     ** IE6/7/8支持onreadystatechange事件
     ** IE9/10支持onreadystatechange和onload事件
     ** Firefox/Chrome/Opera支持onload事件
     */
    // 判断IE8及以下浏览器
    var isIE = !-[1,];

    if (!callback || (typeof callback !== 'function')) {
        //not handle
    } else if (isIE) {
        script.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                callback();
            }
        }
    } else {
        // IE9及以上浏览器，Firefox，Chrome，Opera
        script.onload = function () {
            callback();
        }
    }

    document.body.appendChild(script);
};


/**
 * 动态加载css
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
 * 动态加载image
 * @param src {string}
 * @param callback {function}
 */
exports.loadImage = function (src, callback) {
    var img = new Image();

    if (callback && (typeof callback === 'function')) {
        img.onload = function () {
            callback();
        };
    }

    img.src = src;
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
        if (callback && (typeof callback === 'function')) {
            callback();
        }
    } catch (err) {
        alert('您使用的浏览器不支持此复制功能，请更换chrome浏览器!');
    } finally {
        document.body.removeChild(textarea);
    }
};


/**
 * 获取对象类型
 * @param obj {*}
 * @returns {string}
 */
exports.getTypeOf = function (obj) {
    var typeStr = Object.prototype.toString.call(obj);
    switch (typeStr) {
        case '[object String]':
            return 'string';
            break;

        case '[object Number]':
            return 'number';
            break;

        case '[object Boolean]':
            return 'boolean';
            break;

        case '[object Null]':
            return 'null';
            break;

        case '[object Undefined]':
            return 'undefined';
            break;

        case '[object Array]':
            return 'array';
            break;

        case '[object Object]':
            return 'object';
            break;

        case '[object Function]':
            return 'function';
            break;

        case '[object Date]':
            return 'date';
            break;

        case '[object RegExp]':
            return 'regexp';
            break;

        case '[object Error]':
            return 'error';
            break;

        case '[object Symbol]':
            return 'symbol';
            break;

        case '[object Window]':
            return 'window';
            break;

        case '[object global]':
            return 'global';
            break;

        default:
            return typeStr;
    }
}


/**
 * 判断字符串是否符合json格式
 * @param str {string}
 * @returns {boolean}
 */
exports.isJson = function (str) {
    try {
        JSON.parse(str);
        return true;
    } catch (err) {
        return false;
    }
}


/**
 * 判断浏览器是否移动端
 * @returns {boolean}
 */
exports.isMobile = function () {
    var regMobileAll = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
    var regMobileFour = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i;
    var ua = navigator.userAgent;
    return regMobileAll.test(ua) || regMobileFour.test(ua.substr(0, 4));
}


/**
 * 获取随机数
 * @param min {number}
 * @param max {number}
 * @param isFloat {boolean}
 * @returns {number}
 */
exports.random = function (min, max, isFloat) {
    var rand = Math.random();

    if (isFloat || min % 1 || max % 1) {
        //float
        return min + rand * (max - min);
    } else {
        //int
        return min + Math.floor(rand * (max - min + 1));
    }
}


/**
 * 延迟执行 (多用于input输入、keydown等)
 * debounce 策略的电梯。如果电梯里有人进来，等待15秒。如果又人进来，15秒等待重新计时，直到15秒超时，开始运送。
 * example:jQuery(window).on('resize', debounce(func, 1000));
 *
 * @param func {function}
 * @param wait {number} milliseconds
 * @param immediate {boolean}
 * @returns {Function}
 */
exports.debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function () {
        // 据上一次触发时间间隔
        var last = new Date().getTime() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        var callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}


/**
 * 间隔执行 (多用于mouseover,resize事件)
 * throttle 策略的电梯。保证如果电梯第一个人进来后，15秒后准时运送一次，不等待。如果没有人，则待机。
 * example:jQuery(window).on('resize', throttle(func, 1000));
 *
 * @param func {function}
 * @param wait {number} milliseconds
 * @param options {object}
 * @returns {Function}
 */
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 上次执行时间点
    var previous = 0;
    if (!options) options = {};
    // 延迟执行函数
    var later = function () {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    return function () {
        var now = new Date().getTime();
        // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
        if (!previous && options.leading === false) previous = now;
        // 延迟执行时间间隔
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
            //如果延迟执行不存在，且没有设定结尾边界不执行选项
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
