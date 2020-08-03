/**
 * author: Jeb.Wang
 * date: 2020/4/28
 */
const Crawler = require('./Crawler');
const puppeteer = require('puppeteer');
const {timingUtil, dateUtil} = require('../util');
const {crawler: {puppeteer: puppeteerConfig}} = require('../../config');
const ContentService = require('../service/TGDailyContentService');
const {internalCode} = require('../constant/constant.common');

class HuHeXianComCrawler extends Crawler {

    constructor(name) {
        super(name);
    }

    async beforeCrawl() {
        super.beforeCrawl();
    }

    async doCrawl() {
        // 这个是使用本地机器chromium的例子, 主要是去掉无头参数, 方便开发.
        // const browser = await puppeteer.launch({
        //     executablePath: '/Users/jeb/puppeteer/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
        //     headless: false,
        //     width: 800,
        //     height: 600
        // });

        const browser = await puppeteer.connect({browserWSEndpoint: puppeteerConfig.browserWSEndpoint});

        let page = await browser.newPage();

        let gotoPageErrCount = 0;
        while (gotoPageErrCount <= 100) {
            try {
                await page.goto('https://www.huhexian.com/tiangou');
                break;
            } catch (e) {
                gotoPageErrCount++;
                this._logger.info('going to page [https://www.huhexian.com/tiangou] error.');
            }
            await timingUtil.sleep(5000);
        }
        if (gotoPageErrCount >= 100) {
            this._logger.error('error going to page');
            return;
        }


        const contentService = ContentService.getInstance();
        let pageLoadedTime = dateUtil.now();
        while (true) {
            try {
                await page.waitForSelector('#header');
                const date = await page.$eval('#header .content .inner h2', e => e.innerText);
                const content = await page.$eval('#header .content .inner #sentence', e => e.innerText);

                let dateArr = date.split(' ');
                let dateStr = dateArr[0];
                let weatherStr = dateArr[1];

                let contentEntity = {};
                contentEntity.date = dateUtil.formatTimestamp(dateUtil.toTimestamp(dateStr, 'YYYY年MM月DD日'));
                contentEntity.weather = weatherStr;
                contentEntity.content = content;
                contentEntity.original = 'https://www.huhexian.com/tiangou';

                let addResult = await contentService.addContent(contentEntity);
                if (addResult === internalCode.SUCCESS) {
                    this._logger.info('content added successfully.');
                } else {
                    this._logger.warn('failed adding content. serviceCode: [%s]', JSON.stringify(addResult));
                }

                // 30分钟刷新一次页面
                if (dateUtil.now() - pageLoadedTime > 1000 * 60 * 30) {
                    pageLoadedTime = dateUtil.now();
                    let reloadTimes = 0;
                    while (true) {
                        try {
                            await page.reload();
                            break;
                        } catch (e) {
                            this._logger.error('reload page error.');
                            await timingUtil.sleep(1000);
                            reloadTimes++;
                        }
                        if (reloadTimes > 100) {
                            this._logger.error('reload reach retry times, exiting...');

                            return;
                        }
                    }
                }
                await page.click('#header button');
            } catch (e) {
                this._logger.error('huhexian.com error crawling. ', e);
            } finally {
                await timingUtil.sleep(4000);
            }
        }

        // await browser.close();
    }

    async afterCrawl() {
        super.afterCrawl();
    }
}

module.exports = HuHeXianComCrawler;
