const {basicRestURL} = require('../../config/index.js');
const authUtil = require('../../utils/authUtil');

let fetchContentsLock = false;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 若后面要页面分享, 要注意这里, onLaunch没执行完的话这里获取不到值, 会报错.
        isAuthenticated: authUtil.isAuthenticated(),
        likeIcon: {
            color: '#8a8a8a',
            fill: false
        },
        contents: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.refreshContent();
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

    refreshContent: function () {
        if (!fetchContentsLock) {
            fetchContentsLock = true;
            wx.request({
                url: basicRestURL + 'hahas?sort=ranking,desc&type=0',
                success: result => {
                    fetchContentsLock = false;

                    let authenticatedUser = authUtil.getAuthenticatedUser();
                    if (result.statusCode === 200) {
                        let fetchedContents = result.data;
                        fetchedContents = fetchedContents.map((item, index) => {
                            let indexStr = index + 1 + '. ';
                            item.content = indexStr + item.content;

                            let likedUsers = item.likedUsers;
                            item.liked = likedUsers && likedUsers.includes(authenticatedUser.id);
                            return item;
                        });

                        this.setData({
                            contents: fetchedContents
                        });
                    } else {
                        wx.showToast({
                            title: '拉取数据失败, 请重试, 若多次失败请点击下方"客服"联系作者哦 😦',
                            icon: 'none',
                            mask: true,
                            duration: 5000
                        });
                        this.refreshContentByCache();
                    }
                },
                fail: result => {
                    fetchContentsLock = false;
                }
            });
        }
    },

    onLikeIconClick: function (e) {
        let item = e.currentTarget.dataset.item;

        let openId = authUtil.getAuthenticatedOpenId();
        let id = item.id;
        let liked = item.liked;

        if (!liked) {
            if (!fetchContentsLock) {
                fetchContentsLock = true;
                wx.request({
                    url: basicRestURL + 'hahas/like?openId=' + openId + '&hahaId=' + id,
                    method: 'PUT',
                    success: res => {
                        fetchContentsLock = false;

                        if (res.statusCode === 200) {
                            let newContents = this.data.contents.map(item => {
                                if (item.id === id) {
                                    item.liked = true;
                                }

                                return item;
                            });

                            this.setData({
                                contents: newContents
                            }, () => {
                                // 成功后调用
                                wx.showToast({
                                    title: '已赞👍',
                                    icon: 'none',
                                    mask: true,
                                    duration: 1000
                                });
                            });
                        } else {

                            wx.showToast({
                                title: '网络错误, 若多次失败请点击下方"客服"联系作者哦 🥴',
                                icon: 'none',
                                mask: true,
                                duration: 5000
                            });
                        }
                    },
                    fail: () => {
                        fetchContentsLock = false;
                    }
                });
            }
        } else {
            wx.showToast({
                title: '小星星已点亮了哦❤️',
                icon: 'none',
                mask: true,
                duration: 1000
            });
        }
    },

    onCopyIconClick: function (e) {

        let item = e.currentTarget.dataset.item;
        let content = item.content;
        wx.setClipboardData({
            data: content
        });
    },

    authorizeUserInfoCallback: function (res) {
        if (res.detail.errMsg === 'getUserInfo:ok') {
            authUtil.doAuthorizeUserInfo((authorizedUser) => {
                this.setData({
                    'isAuthenticated': true
                });
            }, () => {
                wx.showToast({
                    title: '获取用户信息失败',
                    icon: 'none',
                    mask: true,
                    duration: 1000
                });
            });
        } else {
            wx.showToast({
                title: '需要点击授权才能进行点赞哦',
                icon: 'none',
                mask: true,
                duration: 1000
            });
        }
    }
});
