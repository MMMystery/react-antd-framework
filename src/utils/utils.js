/**
 * Created by hayzroyanghuanzhou on 2018/12/4.
 */
import { Base64 } from 'js-base64';

// base64加密
export function toBASE64(param) {
    return Base64.encode(param);
}

/**
 * extract param from url
 *
 * @param name param name
 * @param url
 */
export function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * 跳到顶部
 */
export function jumpRoot() {
    try {
        const errorPanel = document.getElementById("root")
        if (errorPanel) { errorPanel.scrollIntoView(); }
        return null
    } catch (error) {
        return error
    }
}

export function isUrl(path) {
    const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

    return reg.test(path);
}

/**
 * generate ramdom id
 *
 * @export
 * @returns
 */
export function genRandomId() {
    return Math.random()
        .toString(36)
        .substr(2, 9);
}


// 字节转MB，GB
export function readablizeBytes(bytes) {
    if (bytes === 0||bytes === "0") {
        return "0 B";
    }
    const s = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(e))).toFixed(0) + " " + s[e];
}