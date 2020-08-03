/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const crawler = {
    puppeteer: {
        browserWSEndpoint: 'ws://docker_headless_chrome_0:3000'
    }
};

const db = {
    redis: {
        common: {
            host: 'docker_prod_redis_0',
            port: 6379
        },
        auth: 'specialpwd1122forredis.'
    },
    mysql: {
        host: 'docker_prod_mysql_0',
        user: 'root',
        password: 'specialpwd2233formysql.',
        database: 'tobesb',
        connectionLimit: 10
    }
};

const log = {
    appenders: {
        defaultFile: {
            type: 'file',
            filename: '/apps/external/logs/tobesb/crawler/app.log',
            backups: 50,
            pattern: 'yyyy-MM-dd',
            keepFileExt: true
        },
        errorFile: {
            type: 'file',
            filename: '/apps/external/logs/tobesb/crawler/error.log',
            backups: 50,
            pattern: 'yyyy-MM-dd',
            keepFileExt: true
        },
    },
    categories: {
        default: {
            appenders: ['defaultFile'],
            level: 'info'
        },
        // 错误级别的日志统一放到这里处理
        error: {
            appenders: ['errorFile'],
            level: 'error'
        }
    }
};

module.exports = {
    crawler: crawler,
    db: db,
    log: log
};
