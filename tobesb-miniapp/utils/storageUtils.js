/**
 * author: Jeb.Wang
 * date: 2020/7/21
 */
function getStorageSync(key) {
    let value = null;
    try {
        value = wx.getStorageSync(key);
    } catch (e) {
        console.log('exception occurs at "wx.getStorageSync(key)". key: %s', key);
    }

    return value;
}

function setStorageSync(key, value) {
    let success = true;
    try {
        wx.setStorageSync(key, value);
    } catch (e) {
        success = false;
        console.log('exception occurs at "wx.setStorageSync(key, value)", key: [%s], value: [%s]', key, value);
    }

    return success;
}

module.exports = {
    getStorageSync: getStorageSync,
    setStorageSync: setStorageSync
}
