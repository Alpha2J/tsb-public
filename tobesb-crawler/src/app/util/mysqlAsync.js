/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const {promisify} = require('util');
const mysql = require('mysql');
const {mysql: mysqlConfig} = require('../../config').db;

let connectionPool = null;
let connectionPoolAsync = null;
module.exports = {
    getConnectionFromPool: async () => {
        if (connectionPool === null) {
            connectionPool = mysql.createPool(mysqlConfig);

            connectionPoolAsync = {
                getConnectionAsync: promisify(connectionPool.getConnection).bind(connectionPool),
                endPoolAsync: promisify(connectionPool.end).bind(connectionPool)
            };
        }

        let connection = await connectionPoolAsync.getConnectionAsync();
        return wrapPoolingConnection(connection);
    },
    destroyConnectionPool: async () => {
        if (connectionPool !== null) {
            await connectionPoolAsync.endPoolAsync();

            connectionPoolAsync = null;
            connectionPool = null;
        }
    }
};

function wrapPoolingConnection(connection) {
    return {
        // 查询
        queryAsync: promisify(connection.query).bind(connection),
        // 事务
        beginTransactionAsync: promisify(connection.beginTransaction).bind(connection),
        commitAsync: promisify(connection.commit).bind(connection),
        rollbackAsync: promisify(connection.rollback).bind(connection),
        // 关闭当前连接, 由于是处于连接池的连接, 所以暂不提供对外接口.
        // endAsync: promisify(connection.end).bind(connection)
        // 连接池里面的连接用完后需要释放, 否则没有连接给后续请求使用
        release: () => {
            connection.release();
        }
    };
}
