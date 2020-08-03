/**
 * author: Jeb.Wang
 * date: 2020/4/25
 */

/**
 * 内部方法业务码的定义
 *
 * @type {{EXISTED: number, SUCCESS: number, FAILED: number}}
 */
const internalCode = {
    SUCCESS: 0,
    FAILED: -1,
    EXISTED: -2
};

module.exports = {
    internalCode: internalCode
};
