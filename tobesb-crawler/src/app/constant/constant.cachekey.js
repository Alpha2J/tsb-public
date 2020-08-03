/**
 * redis键的定义
 *
 * author: Jeb.Wang
 * date: 2020/7/18
 */

/**
 * keyPrefix, 通常包括一个keyPrefix和一个使用keyPrefix来build key的函数
 * @type {{uniContentSet: string}}
 */
const prefix = {};

/**
 * 单个key
 *
 * @type {{uniContentSet: string}}
 */
const single = {
    uniContentSet: 'tg-app:uniContentSet'
};

module.exports = {
    prefix: prefix,
    single: single
};
