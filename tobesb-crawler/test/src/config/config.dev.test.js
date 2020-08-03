/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const config = require('../../../src/config');
const log4js = require('log4js');

describe('config.dev test', () => {
    describe('logConfig test', () => {
        // 1. 配置是否正确被解析
        log4js.configure(config.log);

        // 2. 各个category的logger是否能正确获取到, 且是否只打印对应级别的日志.

        test('2. 各个category的logger是否能正确获取到.', () => {
            log4js.configure(config.log);

            const defaultLogger = log4js.getLogger();
            defaultLogger.debug('defaultLogger debug %s');
            defaultLogger.info('defaultLogger info');
            defaultLogger.error('defaultLogger error');

            const httpLogger = log4js.getLogger('http');
            httpLogger.debug('httpLogger debug');
            httpLogger.info('httpLogger info');
            httpLogger.error('httpLogger error');

            const crawlerLogger = log4js.getLogger('crawler');
            crawlerLogger.debug('crawlerLogger debug');
            crawlerLogger.info('crawlerLogger info');
            crawlerLogger.error('crawlerLogger error');

            const schedulerLogger = log4js.getLogger('scheduler');
            schedulerLogger.debug('schedulerLogger debug');
            schedulerLogger.info('schedulerLogger info');
            schedulerLogger.error('schedulerLogger error');

            const errorLogger = log4js.getLogger('error');
            errorLogger.debug('errorLogger debug');
            errorLogger.info('errorLogger info');
            errorLogger.error('errorLogger error');

            log4js.shutdown();
        });
    });
});

