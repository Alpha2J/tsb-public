/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const crawler = {
    puppeteer: {
        browserWSEndpoint: 'ws://127.0.0.1:20001'
    }
};

const db = {
    redis: {
        common: {
            host: '127.0.0.1',
            port: 6379
        },
        auth: 'nopwd'
    },
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'nopwd',
        database: 'tobesb',
        connectionLimit: 10
    }
};

const log = {
    appenders: {
        stdout: {type: 'stdout'},
        stderr: {type: 'stderr'}
    },
    categories: {
        default: {
            appenders: ['stdout'],
            level: 'debug'
        },
        // 错误级别的日志统一放到这里处理
        error: {
            appenders: ['stderr'],
            level: 'error'
        }
    }
};

module.exports = {
    crawler: crawler,
    db: db,
    log: log
};
