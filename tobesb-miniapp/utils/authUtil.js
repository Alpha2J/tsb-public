/**
 * 认证与授权工具
 *
 * author: Jeb.Wang
 * date: 2020/7/21
 */
const {basicURL, basicRestURL} = require('../config/index.js');
const storageUtils = require('./storageUtils.js');
const businessCode = require('../constant/businessCode.js');


/**
 * 结构:
 * {
 *     "logined": true,
 *     "authenticated": true,
 *     "user": {
 *
 *     }
 * }
 * @param user
 * @param logined
 */
function setAuthentication(user, logined) {
    let authenticated = false;

    let nickname = user.nickname;
    let region = user.region;
    if (nickname && region) {
        authenticated = true;
    }

    let authentication = {};
    authentication.logined = logined;
    authentication.authenticated = authenticated;
    authentication.user = user;
    storageUtils.setStorageSync('authentication', authentication);
}

function isLogined() {
    let authentication = storageUtils.getStorageSync('authentication');
    return authentication.logined;
}

function isAuthenticated() {
    let authentication = storageUtils.getStorageSync('authentication');
    return authentication.authenticated;
}

function getAuthenticatedOpenId() {
    let authenticatedUser = getAuthenticatedUser();

    if (authenticatedUser && authenticatedUser.openId) {
        return authenticatedUser.openId;
    } else {
        return null;
    }
}

function getAuthenticatedUser() {
    let authentication = getAuthentication();

    if (authentication && authentication.user) {
        return authentication.user;
    } else {
        return null;
    }
}

function getAuthentication() {
    return  storageUtils.getStorageSync('authentication');
}

function doLogin(successCallback, failCallback) {
    wx.login({
        success: res => {
            // 接口调用成功的回调函数
            wx.request({
                url: basicURL + 'login?code=' + res.code,
                method: 'POST',
                success: res => {
                    let resData = res.data;
                    let code = resData.code;
                    if (code === businessCode.INFO_OPERATION_SUCCESS) {
                        let user = resData.data;
                        setAuthentication(user, true);

                        successCallback && successCallback(user);
                    } else {
                        failCallback && failCallback();
                    }
                },
                fail: () => {
                    failCallback && failCallback();
                }
            });
        },
        fail: () => {
            // 接口调用失败的回调函数
            failCallback && failCallback();
        },
        complete: () => {
            // 接口调用结束的回调函数（调用成功、失败都会执行）
        }
    });
}

// 获取用户的信息, nickname, 头像等
// 如果曾经获取过了, 则不再获取
function doAuthorizeUserInfo(successCallback, failCallback) {
    if (isAuthenticated()) {
        successCallback && successCallback(getAuthentication());
    } else {
        wx.getSetting({
            withSubscriptions: false,
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            let userInfoFromWx = res.userInfo;
                            let userInfo = {};
                            userInfo.headImg = userInfoFromWx.avatarUrl;
                            userInfo.gender = userInfoFromWx.gender;
                            userInfo.nickname = userInfoFromWx.nickName;
                            userInfo.region = userInfoFromWx.country + ',' + userInfoFromWx.province + ',' + userInfoFromWx.city;

                            let openId = getAuthenticatedOpenId();
                            wx.request({
                                url: basicRestURL + 'users/' + openId,
                                method: 'PUT',
                                data: userInfo,
                                success: (res) => {
                                    if (res.statusCode === 200) {
                                        // res.data 为user实体
                                        successCallback && successCallback(res.data);
                                    } else {
                                        // statusCode只有404, 进入这里
                                        failCallback && failCallback();
                                    }
                                },
                                fail: (res) => {
                                    // 不知道什么时候才会回调这里, httpStatus=404也不是进入这里的
                                    failCallback && failCallback();
                                }
                            });
                        },
                        fail: () => {
                            failCallback && failCallback();
                        }
                    });
                }
            },
            fail: () => {
                failCallback && failCallback();
            },
            complete: res => {

            }
        });
    }
}

module.exports = {
    isLogined: isLogined,
    isAuthenticated: isAuthenticated,
    getAuthenticatedOpenId: getAuthenticatedOpenId,
    getAuthenticatedUser: getAuthenticatedUser,
    doLogin: doLogin,
    doAuthorizeUserInfo: doAuthorizeUserInfo
}
