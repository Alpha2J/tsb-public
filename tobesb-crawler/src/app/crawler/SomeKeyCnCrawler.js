/**
 * author: Jeb.Wang
 * date: 2020/7/18
 */
const TGDailyContent = require('../entity/TGDailyContent');
const TGDailyContentService = require('../service/TGDailyContentService');
const HttpCrawler = require('./HttpCrawler');
const {internalCode} = require('../constant/constant.common');
const {dateUtil, timingUtil} = require('../util');

class SomeKeyCnCrawler extends HttpCrawler {

    constructor() {
        super();
        this.targetURL = 'https://www.somekey.cn/tiangou/random.php';
    }

    async doCrawl() {

        let count = 0;
        const options = {
            gzip: true
        }
        while (true) {
            count++;
            if (count >= Number.MAX_SAFE_INTEGER) {
                count = 0;
            }

            let crawlSuccess = true;
            this._logger.info('executing the [%d] times crawl.', count);
            try {
                const tgDailyContentService = TGDailyContentService.getInstance();
                // responseBodyJSON的结构：
                // {
                //   "code": 1,
                //   "message": "请求成功！",
                //   "data": {
                //     "date": "2020-04-03",
                //     "weather": "霾",
                //     "content": "我有一个喜欢的女孩子，但是她居然喜欢了另一个女孩子，我跟我家宝贝是闺蜜，但是就是看着我宝贝女朋友很不爽，宝贝，跟着我吧！\nwjh，我爱你\n哈哈哈友爱"
                //   }
                // }
                let responseBody = await this.get(this.targetURL, options);
                let responseBodyJSON = JSON.parse(responseBody);
                if (responseBodyJSON.code === 1 && responseBodyJSON.message === '请求成功！') {
                    let data = responseBodyJSON.data;

                    let contentEntity = {};
                    let parsedDateStr = '';
                    try {
                        parsedDateStr = dateUtil.formatTimestamp(dateUtil.toTimestamp(data.date, 'YYYY-MM-DD'));
                    } catch (e) {
                        this._logger.warn('parse date str error. original date str is: %s', data.date);
                        parsedDateStr = dateUtil.formattedNow();
                    }
                    contentEntity.date = parsedDateStr;
                    contentEntity.content = data.content;
                    contentEntity.original = TGDailyContent.originalConstant.somekey_cnCrawl;

                    let addResult = await tgDailyContentService.addContent(contentEntity);
                    if (addResult === internalCode.SUCCESS) {
                        this._logger.info('content successfully added at [%s] times crawl.', count);
                    } else {
                        this._logger.warn('failed adding content. serviceCode: [%s]', JSON.stringify(addResult));
                    }
                } else {
                    crawlSuccess = false;
                    this._logger.warn('failed at [%s] times crawl.', count);
                }
            } catch (e) {
                crawlSuccess = false;
                this._logger.error('getting resource from [%s] error.', this.targetURL, e);
            }

            await timingUtil.sleep(this.getSleepTimeMills(crawlSuccess));
        }
    }

    getConcreteCrawlerName() {
        return 'SomeKeyCnCrawler';
    }
}

module.exports = SomeKeyCnCrawler;
