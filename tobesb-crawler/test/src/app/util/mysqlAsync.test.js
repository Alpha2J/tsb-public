/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const config = require('../../../../src/config');
const mysqlConfig = config.db.mysql;
const mysqlAsync = require('../../../../src/app/util/mysqlAsync');

describe('mysqlAsync test', () => {

    afterAll(async () => {
        await mysqlAsync.destroyConnectionPool();
    });

    test('test getConnectionFromPool', async () => {

        let connection = await mysqlAsync.getConnectionFromPool(mysqlConfig);

        let result = await connection.queryAsync('select * from tobesb_haha where id=1 limit 1');
        console.log(result);
    });

    test('test transaction commit', async () => {

        // let connection = await mysqlAsync.getConnectionFromPool(mysqlConfig);
        //
        // await connection.beginTransactionAsync();
        // let queryResult = await connection.queryAsync('insert into tg_daily_content(content, contentHash) values(?, ?)', ['world', 'hello']);
        // console.log(queryResult);
        // if (queryResult.affectedRows !== 0) {
        //     console.log('going to commit');
        //     await connection.commitAsync();
        // }
    });

    test('test transaction rollback', async () => {
        let connection = await mysqlAsync.getConnectionFromPool(mysqlConfig);

        await connection.beginTransactionAsync();
        try {
            let queryResult = await connection.queryAsync('insert into tg_daily_content(content, contentHash) values(?, ?)', ['world1', 'hello21']);
            console.log(queryResult);
            if (queryResult.affectedRows !== 0) {
                console.log('going to rollback');
                await connection.commitAsync();
            }
        } catch (e) {
            console.log(e.code);
            console.log(e.errno);
            console.log(e.sqlState);
            console.log(e.sqlMessage);
            console.log(e);
        }

    });
});
