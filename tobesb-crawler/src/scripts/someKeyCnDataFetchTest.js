/**
 * author: Jeb.Wang
 * date: 2020/7/18
 */
const rp = require('request-promise-native');
const {timingUtil} = require('../app/util');

(async () => {
    for (let i = 0; i < 1000; i++) {
        let result = await rp.get('https://www.somekey.cn/tiangou/random.php', {
            gzip: true
        });
        console.log(JSON.parse(result));
        console.log('going to sleep');
        await timingUtil.sleep(100);
        console.log('after sleep');
    }
})();



