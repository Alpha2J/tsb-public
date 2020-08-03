/**
 * author: Jeb.Wang
 * date: 2020/4/28
 */
const {randomUtil, loggerFactory: LoggerFactory} = require('../util');

class Crawler {

    constructor() {
        this._id = randomUtil.uuid();
        this._logger = LoggerFactory.create(this.genLoggerCategory());
    }

    async crawl() {
        await this.beforeCrawl();

        await this.doCrawl();

        await this.afterCrawl();
    }

    // 添加代理呀啥的, 先把接口开了, 用不用得到后面再说
    // abstract
    async beforeCrawl() {
        this._logger.info('crawlerId: [%s]: before crawl.', this._id);
    }

    // abstract
    async doCrawl() {
        this._logger.info('crawlerId: [%s]: doing crawl.', this._id);
    }

    // 销毁资源啥的
    // abstract
    async afterCrawl() {
        this._logger.info('crawlerId: [%s]: after crawl.', this._id);
    }

    genLoggerCategory() {
        return 'Crawler_' + this.getConcreteCrawlerName();
    }

    /**
     * 获取具体实现类的名字
     */
    // abstract
    getConcreteCrawlerName() {
        return 'BasicCrawler';
    }
}

module.exports = Crawler;
