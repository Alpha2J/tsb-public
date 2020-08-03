/**
 * author: Jeb.Wang
 * date: 2020/4/28
 */
const crypto = require('crypto');

/**
 * 返回在范围[0, max)内的整数
 *
 * @param max
 * @returns {number}
 */
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * 返回范围在[min, max)内的整数
 * @param min
 * @param max
 * @returns {*}
 */
function randomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 生成32个字符长度的随机Id
 *
 * @returns {string}
 */
function uuid() {
    return crypto.randomBytes(16).toString('hex');
}

module.exports = {
    randomInt: randomInt,
    randomIntInRange: randomIntInRange,
    uuid: uuid
};
