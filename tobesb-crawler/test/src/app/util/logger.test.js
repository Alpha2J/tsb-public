/**
 * author: Jeb.Wang
 * date: 2020/4/25
 */
const {LoggerFactory} = require('../../../../src/app/util').loggerFactory;

describe('logger test', () => {

    describe('LoggerFactory test', () => {

        test('test create logger', () => {

            expect(LoggerFactory.create()).toBeDefined();
        });

        test('test log using logger', () => {

            let logger = LoggerFactory.create();
            logger.info('this is default info');
            logger.info('this is default info using placeholder: %s', 'hello world');
            logger.error('this is error');
        });
    });
});
