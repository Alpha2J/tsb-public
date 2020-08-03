/**
 * author: Jeb.Wang
 * date: 2020/4/25
 */
const {cryptoUtil} = require('../../../../src/app/util');

describe('cryptoUtil.js', () => {

    // 1. 测试hash之后的值是否符合预期: 指定字面量md5 hash之后的值是否和该字面量的hash值相等
    // 2. 测试随机串md5 hash之后的的长度是否为32个字符
    // 3. 测试undefined参数是否会抛出异常
    describe('function md5(content)', () => {

        const md5 = cryptoUtil.md5;

        // ----> 1.
        test('测试hash之后的值是否符合预期', () => {
            expect(md5('123')).toBe('202cb962ac59075b964b07152d234b70');
            expect(md5('abcddd')).toBe('eb17821a1b4861ace65073783438093c');
            expect(md5('jebabcde')).toBe('421977e7b5ae26199f408e603a39885b');
        });

        // ----> 2.
        test('测试随机串md5 hash之后的的长度是否为32个字符', () => {
            expect(md5('1')).toHaveLength(32);
            expect(md5('123456789')).toHaveLength(32);

            let veryLongString = '';
            for (let i = 0; i < 100000; i++) {
                veryLongString += i;
            }
            expect(md5(veryLongString)).toHaveLength(32);
        });

        // ----> 3.
        test('测试undefined参数是否会抛出异常', () => {
            expect(() => {
                md5();
            }).toThrow();
        });
    });
});
