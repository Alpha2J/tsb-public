/**
 * author: Jeb.Wang
 * date: 2020/7/18
 */
const Crawler = require('./Crawler');
const rp = require('request-promise-native');
const {randomUtil} = require('../util');

class HttpCrawler extends Crawler {
    async get(url, options) {
        return rp.get(url, options);
    }

    async post(url, options, body) {
        body = {
            json: true,
            body: body
        };
        options = Object.assign({}, options, body);

        return rp.post(url, options);
    }

    async put(url, options, body) {
        body = {
            json: true,
            body: body
        };
        options = Object.assign({}, options, body);

        return rp.put(url, options);
    }

    async patch(url, options, body) {
        body = {
            json: true,
            body: body
        };
        options = Object.assign({}, options, body);

        return rp.patch(url, options);
    }

    async delete(url, options) {
        return rp.delete(url, options);
    }

    /**
     * 休眠时间取决于上一次的抓取状态:
     * 上一次抓取成功: 休眠时间为[3, 10)秒的随机值.
     * 上一次抓取失败: 计算当前连续失败的次数, 每失败一次增加10秒(最大值180秒),
     * 使用失败次数的附加秒数加上[3, 10)秒的随机值.
     *
     * 注: 连续失败次数会在第一次成功抓取之后重置为0.
     *
     * @param crawlSuccess
     * @returns {*}
     */
    getSleepTimeMills(crawlSuccess) {
        let sleepTime;
        if (crawlSuccess === true) {
            this._failTimes = 0;
            sleepTime = randomUtil.randomIntInRange(3, 10);
        } else {
            if (this._failTimes < 18) {
                this._failTimes++;
            }

            sleepTime = this._failTimes * 10 + randomUtil.randomIntInRange(3, 10);
        }

        return sleepTime * 1000;
    }

    async beforeCrawl() {
        this._logger.info('crawlerId: [%s]: before crawl using HttpCrawler.', this._id);
    }

    async doCrawl() {
        this._logger.info('crawlerId: [%s]: doing crawl using HttpCrawler.', this._id);
    }

    async afterCrawl() {
        this._logger.info('crawlerId: [%s]: after crawl using HttpCrawler.', this._id);
    }

    getConcreteCrawlerName() {
        return 'HttpCrawler';
    }
}

module.exports = HttpCrawler;
