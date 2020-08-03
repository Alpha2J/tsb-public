/**
 * author: Jeb.Wang
 * date: 2020/7/18
 */
const Crawler = require('./Crawler');

class PuppeteerCrawler extends Crawler {
    async beforeCrawl() {
        this._logger.info('crawlerId: [%s]: before crawl using PuppeteerCrawler.', this._id);
    }

    async doCrawl() {
        this._logger.info('crawlerId: [%s]: doing crawl using PuppeteerCrawler.', this._id);
    }

    async afterCrawl() {
        this._logger.info('crawlerId: [%s]: after crawl using PuppeteerCrawler.', this._id);
    }

    getConcreteCrawlerName() {
        return 'PuppeteerCrawler';
    }
}
