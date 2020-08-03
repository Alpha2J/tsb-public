/**
 * author: Jeb.Wang
 * date: 2020/4/25
 */
const {internalCode} = require('../constant/constant.common');
const {single: {uniContentSet}} = require('../constant/constant.cachekey');
const {cryptoUtil, loggerFactory: LoggerFactory, redisAsync, mysqlAsync} = require('../util');
const TGDailyContentRepository = require('../repository/TGDailyContentRepository');
const TGDailyContent = require('../entity/TGDailyContent');

let _instance = null;

class TGDailyContentService {

    constructor() {
        this._logger = LoggerFactory.create('TGDailyContentService');
    }

    static getInstance() {
        if (_instance === null) {
            _instance = new TGDailyContentService();
        }
        return _instance;
    }

    /**
     * 持久化实体.
     *
     * @param entity 只包含必须信息的content entity实体, 如:
     * {
     *     date: 'str',
     *     content: 'str',
     *     original: 'str'
     * }
     *
     * @param entity
     * @returns {Promise<number>} 成功: internalCode.SUCCESS, 失败: internalCode.FAILED
     */
    async addContent(entity) {
        let serviceCode = internalCode.FAILED;

        if (!entity || !entity.content) {
            this._logger.warn('invalid content entity: [%s]', JSON.stringify(entity));
            return serviceCode;
        }

        let connection = await mysqlAsync.getConnectionFromPool();
        await connection.beginTransactionAsync();
        let contentRepository = new TGDailyContentRepository(connection);
        try {
            let redisClient = await redisAsync.createClient();

            let contentHash = cryptoUtil.md5(entity.content);
            if (await redisClient.sismemberAsync(uniContentSet, contentHash)) {
                this._logger.warn('contentHash [%s] existed, canceling the insert.', contentHash);
                serviceCode = internalCode.EXISTED;
                return serviceCode;
            }

            entity.contentHash = contentHash;
            let tgDailyContent = TGDailyContent.legalizeEntity(entity);
            let savedResult = await contentRepository.save(tgDailyContent);
            if (savedResult === internalCode.EXISTED) {
                // 存在于DB但是不存在Hash中, 手动add一次
                await redisClient.saddAsync(uniContentSet, contentHash);
                this._logger.info('entity [contentHash: %s] existed in db, but not in redis, added to redis.', contentHash);

                serviceCode = internalCode.SUCCESS;
                return serviceCode;
            } else if (savedResult < 0) {
                this._logger.warn('adding entity failed. savedResult: %s', savedResult);

                serviceCode = internalCode.FAILED;
                return serviceCode;
            }
            await connection.commitAsync();
            await redisClient.saddAsync(uniContentSet, contentHash);

            serviceCode = internalCode.SUCCESS;
        } catch (e) {
            await connection.rollbackAsync();
            this._logger.error('error occurs executing method addContent. ', e);
        } finally {
            connection.release();
        }

        return serviceCode;
    }
}

module.exports = TGDailyContentService;
