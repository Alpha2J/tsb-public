/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const {SomeKeyCnRequestFactory} = require('../../../../src/app/util/').request;

describe('SomeKeyCnRequestFactory test', () => {

    test('test get from somekey.cn', async () => {

        let request = new SomeKeyCnRequestFactory().create();
        let getResult = await request.get('https://www.somekey.cn/tiangou/random.php');
        let getResultJSON = JSON.parse(getResult);
        console.log(getResultJSON);
        console.log(getResultJSON.data.content);
    });
});
