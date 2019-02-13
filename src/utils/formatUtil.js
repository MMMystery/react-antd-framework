/**
 * Created by hayzroyanghuanzhou on 2018/12/4.
 */

import moment from 'moment';

export function formatDate(date) {
    try {
        return moment(date).format('YYYY.MM.DD');
    } catch (error) {
        return '日期格式不正确';
    }
}

export function formatDateWithTime(date) {
    try {
        return moment(date).format('YYYY.MM.DD HH:mm:ss');
    } catch (error) {
        return '时间格式不正确';
    }
}

export function formatTime(date) {
    try {
        return moment(date).format('HH:mm:ss');
    } catch(error) {
        return '时间格式不正确';
    }
}
