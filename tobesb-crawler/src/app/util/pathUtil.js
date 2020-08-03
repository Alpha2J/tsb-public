/**
 * author: Jeb.Wang
 * date: 2020/4/25
 */
const os = require('os');
const path = require('path');

/**
 * 当前程序运行的家目录
 *
 * @type {string}
 */
const homedir = os.homedir();

/**
 * 对path执行normalize操作
 *
 * @param normalizingPath
 * @returns {string}
 */
function normalize(normalizingPath) {
    return path.normalize(normalizingPath);
}

module.exports = {
    homedir: homedir,
    normalize: normalize
};
