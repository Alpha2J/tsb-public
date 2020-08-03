/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const {promisify} = require('util');
const redis = require('redis');
const {redis: redisConfig} = require('../../config').db;

// redis是单线程, node也是单线程, 在不使用发布订阅的情况下直接使用单例就可以了
let redisClient = null;
let wrappedRedisClient = null;
module.exports = {
    createClient: async () => {
        if (redisClient === null) {
            redisClient = redis.createClient(redisConfig.common);
            wrappedRedisClient = wrapRedisClient(redisClient);

            if (redisConfig.auth && Object.keys(redisConfig.auth).length !== 0) {
                await wrappedRedisClient.authAsync(redisConfig.auth);
            }
        }

        return wrappedRedisClient;
    },
    destroyClient: async () => {
        if (redisClient !== null) {
            await wrappedRedisClient.quitAsync();

            wrappedRedisClient = null;
            redisClient = null;
        }
    }
};

function wrapRedisClient(client) {
    let clientAsync = {
        // 字符串
        getAsync: promisify(client.get).bind(client),
        setAsync: promisify(client.set).bind(client),


        // 列表
        lindexAsync: promisify(client.lindex).bind(client),
        llenAsync: promisify(client.llen).bind(client),


        // 集合
        saddAsync: promisify(client.sadd).bind(client),
        scardAsync: promisify(client.scard).bind(client),
        smembers: promisify(client.smembers).bind(client),
        sismemberAsync: promisify(client.sismember).bind(client),


        // 有序集合


        // 哈希
        hgetallAsync: promisify(client.hgetall).bind(client),
        unwatchAsync: promisify(client.unwatch).bind(client),


        // 事务
        watchAsync: promisify(client.watch).bind(client),
        multi: () => {
            let multi = client.multi();
            clientAsync.execAsync = promisify(multi.exec).bind(multi);
            return multi;
        },


        // common
        authAsync: promisify(client.auth).bind(client),
        quitAsync: promisify(client.quit).bind(client)
    };

    return clientAsync;
}
