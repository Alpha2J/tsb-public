/**
 * author: Jeb.Wang
 * date: 2020/3/30
 */
async function sleep(mills) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, mills);
    });
}

module.exports = {
    sleep: sleep
};
