/**
 * 加解密工具
 *
 * author: Jeb.Wang
 * date: 2020/4/25
 */
const crypto = require('crypto');

/**
 * 对内容执行md5 hash
 * 1. hash串的长度为32个字符
 * 2. undefined参数会抛出异常
 *
 * @param content
 * @returns {string}
 */
function md5(content) {
    const hash = crypto.createHash('md5');
    return hash.update(content).digest('hex');
}

module.exports = {
    md5: md5
};
