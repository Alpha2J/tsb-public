/**
 * author: Jeb.Wang
 * date: 2020/4/11
 */
const {SomeKeyCnCrawler} = require('./app/crawler');
const {redisAsync, mysqlAsync, loggerFactory: LoggerFactory, dateUtil} = require('./app/util');

const logger = LoggerFactory.create('main');

async function main() {
    logger.info(`app starting at [${dateUtil.formattedNow()}]`);

    let crawlerQueue = [];
    // crawlerQueue.push(new HuHeXianComCrawler());
    crawlerQueue.push(new SomeKeyCnCrawler());

    for (const crawler of crawlerQueue) {
        crawler.crawl();
    }
}

main();

process.on('exit', async () => {

    logger.info(`app exiting at [${dateUtil.formattedNow()}]`);

    // 虽然redis和mysql库有说在node进程停止的时候会自动释放所有连接,
    // 但是为了稳妥, 还是手动清理下, 避免奇葩问题.
    await redisAsync.destroyClient();
    await mysqlAsync.destroyConnectionPool();
});
