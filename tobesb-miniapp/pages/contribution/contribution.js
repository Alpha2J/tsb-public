// pages/contribution/contribution.js
const {basicRestURL} = require('../../config/index.js');
const authUtil = require('../../utils/authUtil');
const commonConstant = require('../../constant/commonConstant.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAuthenticated: authUtil.isAuthenticated(),
        receiveAuditChecked: false,
        contributionOpenId: authUtil.isAuthenticated() ? authUtil.getAuthenticatedOpenId() : ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    receiveAuditSwitchChange: function ({detail}) {
        if (detail.value) {
            wx.requestSubscribeMessage({
                tmplIds: [commonConstant.SUBSCRIPTION_MESSAGE_ID],
                success: result => {
                    // 成功回调
                    if (result[commonConstant.SUBSCRIPTION_MESSAGE_ID] !== 'accept') {
                        this.setData({
                            receiveAuditChecked: false
                        });
                    }
                },
                fail: (res) => {
                    // 失败回调
                },
                complete: () => {
                    // 无论调用成功失败与否都回调
                }
            });
        }
    },
    confirmBtnClick: function (res) {
        const postValue = res.detail.value;
        wx.request({
            url: basicRestURL + 'hahas',
            method: 'POST',
            data: postValue,
            success: res => {
                if (res.statusCode === 201) {
                    wx.showToast({
                        title: '投稿成功, 正在等待管理员审核 🥰',
                        icon: 'none',
                        mask: true,
                        duration: 3000
                    });
                } else {
                    // 404
                    wx.showToast({
                        title: '投稿失败了, 请稍后重试 🥺',
                        icon: 'none',
                        mask: true,
                        duration: 2000
                    });
                }
            },
            fail: () => {
                wx.showToast({
                    title: '出错啦😭',
                    icon: 'none',
                    mask: true,
                    duration: 1000
                });
            }
        });
    },
    authorizedUserInfoCallback: function (res) {
        if (res.detail.errMsg === 'getUserInfo:ok') {
            authUtil.doAuthorizeUserInfo((authorizedUser) => {
                this.setData({
                    'isAuthenticated': true,
                    'contributionOpenId': authorizedUser.openId
                });
            });
        } else {
        }
    }
})
