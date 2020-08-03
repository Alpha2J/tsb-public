/**
 * author: Jeb.Wang
 * date: 2020/4/25
 */
const logConfig = require('../../config').log;
const log4js = require('log4js');
log4js.configure(logConfig);

class Logger {

    debug(message, ...args) {
    }

    info(message, ...args) {
    }

    warn(message, ...args) {
    }

    error(message, ...args) {
    }

    shutdown() {
    }
}

class LoggerProxy extends Logger {

    constructor(category) {
        super();

        // category 支持logConfig里面配置的几个值
        // 如果传入的值不存在于配置中, 默认值'default'会被使用(而且default也是必须要配置的一个category)
        this._logger = log4js.getLogger(category);
        this._errLogger = log4js.getLogger('error');
    }

    debug(message, ...args) {
        if (args) {
            this._logger.debug(message, ...args);
        } else {
            this._logger.debug(message);
        }
    }

    info(message, ...args) {
        if (args) {
            this._logger.info(message, ...args);
        } else {
            this._logger.info(message);
        }
    }

    warn(message, ...args) {
        if (args) {
            this._logger.warn(message, ...args);
        } else {
            this._logger.warn(message);
        }
    }

    error(message, ...args) {
        if (args) {
            this._logger.error(message, ...args);
        } else {
            this._logger.error(message);
        }
    }

    shutdown() {
        this._logger.shutdown();
        this._errLogger.shutdown();
    }
}

class LoggerFactory {
    static create(category) {
        return new LoggerProxy(category);
    }
}

module.exports = LoggerFactory;
