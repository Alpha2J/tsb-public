/**
 * author: Jeb.Wang
 * date: 2020/4/25
 */
const Repository = require('./Repository');

class TGDailyContentRepository extends Repository {

    constructor(connection) {
        super('tobesb_haha', connection);
    }

    getSaveOptions(entity) {

        let fields = Object.keys(entity);

        let sql = `INSERT INTO ${this._tableName}(`;
        for (let i = 0; i < fields.length; i++) {
            sql += fields[i];
            if (i !== fields.length - 1) {
                sql += ',';
            }
        }
        sql += ') VALUES(';
        for (let i = 0; i < fields.length; i++) {
            sql += '?';
            if (i !== fields.length - 1) {
                sql += ',';
            }
        }
        sql += ')';

        // 可以放到上面的循环中去的, 这里为了容易看一点, 不放进去了
        let values = [];
        for (let i = 0; i < fields.length; i++) {
            values.push(entity[fields[i]]);
        }

        return {
            sql: sql,
            values: values
        };
    }

    getConcreteRepositoryName() {
        return 'TGDailyContentRepository';
    }
}

module.exports = TGDailyContentRepository;
