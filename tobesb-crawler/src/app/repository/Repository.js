/**
 * 表示实体仓库, 实体都需要带有自增的Id主键字段.
 *
 * author: Jeb.Wang
 * date: 2020/4/25
 */
const {internalCode} = require('../constant/constant.common');
const {loggerFactory: LoggerFactory} = require('../util');

class Repository {

    constructor(tableName, connection) {
        this._tableName = tableName;
        this._connection = connection;
        this._logger = LoggerFactory.create(this.genLoggerCategory());
    }

    /**
     * 保存实体.
     *
     * @param entity
     * @returns {Promise<number>} 结果大于0表示保存成功. 小于0表示保存失败, 值为相应的业务码: internalCode.FAILED(不明原因失败)或internalCode.EXISTED(唯一约束已存在).
     */
    async save(entity) {

        let saveOptions = this.getSaveOptions(entity);

        let savedEntityId = internalCode.FAILED;
        try {
            let queryResult = await this._connection.queryAsync(saveOptions.sql, saveOptions.values);

            if (queryResult && queryResult.affectedRows >= 0 && queryResult.insertId) {
                savedEntityId = queryResult.insertId;
                this._logger.info('saving entity successfully, generated id is: %s', savedEntityId);
            } else {
                this._logger.warn('saving entity failed. queryResult: %s, entity: %s', queryResult, JSON.stringify(entity));
            }
        } catch (e) {
            let existed = false;
            if (e.code === 'ER_DUP_ENTRY') {
                savedEntityId = internalCode.EXISTED;
                existed = true;
            }

            this._logger.error('exceptions saving entity. entityExisted: %s, saveOptions: %s', existed, JSON.stringify(saveOptions));
            this._logger.error('exceptions saving entity. error stack: %s', e);
        }

        return savedEntityId;
    }

    // ------没用到的方法先不浪费时间写, 后面可能直接换用ORM框架
    saveAll(entities) {
    }

    findById(id) {
    }

    existsById(id) {
    }

    findAll() {
    }

    findAllById(ids) {
    }

    count() {
    }

    deleteById(id) {
    }

    delete(entity) {
    }

    deleteAll(entities) {
    }

    // abstract
    getSaveOptions(entity) {
    }

    genLoggerCategory() {
        return 'Repository_' + this.getConcreteRepositoryName();
    }

    /**
     * 获取具体实现类的名字
     */
    // abstract
    getConcreteRepositoryName() {
        return 'BasicRepository';
    }
}

module.exports = Repository;
