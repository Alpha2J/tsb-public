/**
 * author: Jeb.Wang
 * date: 2020/4/30
 */
const {dateUtil} = require('../../../../src/app/util');

// 该文件暂不用测, 能用就行了
describe('dateUtil.js', () => {

    describe('function now()', () => {
        test('t1', () => {
            const {now} = dateUtil;
            console.log(now());
        });
    });

    describe('function formattedNow(format)', () => {
        test('t2', () => {
            const {formattedNow} = dateUtil;
            console.log(formattedNow());
        });
    });

    describe('function formatTimestamp(timestamp, format)', () => {
        test('t3', () => {
            const {formatTimestamp} = dateUtil;
            console.log(formatTimestamp(dateUtil.now()));
        });
    });

    describe('function toTimestamp(dateStr, format)', () => {
        test('t4', () => {
            const {toTimestamp} = dateUtil;
            console.log(toTimestamp('2020-02-20'));
        });
    });
});
