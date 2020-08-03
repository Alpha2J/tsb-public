/**
 * author: Jeb.Wang
 * date: 2020/4/28
 */
const moment = require('moment');

/**
 * 获得当前的UTC时间戳
 *
 * @returns {number}
 */
function now() {
    return moment.now();
}

/**
 * 获得当前时间的格式化字符串.
 * 如果不带格式化参数, 默认以'YYYY-MM-DD HH:mm:ss.SSS'的格式进行格式化.
 *
 * @param format
 * @returns {string}
 */
function formattedNow(format) {
    format = format || 'YYYY-MM-DD HH:mm:ss.SSS';

    return moment().format(format);
}

/**
 * 将UTC时间戳格式化为字符串.
 * 若不指定format参数, 则使用默认格式进行格式化.
 *
 * @param timestamp
 * @param format
 * @returns {string}
 */
function formatTimestamp(timestamp, format) {
    format = format || 'YYYY-MM-DD HH:mm:ss.SSS';
    return moment(timestamp).format(format);
}

/**
 * 将代表时间的指定字符串转化为UTC时间戳.
 * format参数表示dateStr的格式.
 *
 * @param dateStr
 * @param format
 * @returns {Object}
 */
function toTimestamp(dateStr, format) {
    let date;
    if (format) {
        date = moment(dateStr, format);
    } else {
        date = moment(dateStr);
    }

    return date.valueOf();
}

module.exports = {
    now: now,
    formattedNow: formattedNow,
    formatTimestamp: formatTimestamp,
    toTimestamp: toTimestamp
};
