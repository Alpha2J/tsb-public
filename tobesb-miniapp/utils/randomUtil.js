/**
 * author: Jeb.Wang
 * date: 2020/6/7
 */

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

module.exports = {
    randomInt: randomInt,
    randomIntInRange: randomIntInRange
};
