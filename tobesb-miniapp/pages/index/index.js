const {basicRestURL} = require('../../config/index.js');
const randomUtil = require('../../utils/randomUtil.js');
const dateUtil = require('../../utils/dateUtil.js');
const hahaConstant = require('../../constant/hahaConstant.js');
const defaultData = require('./defaultData');

// pageContents无法从后台加载到数据的时候从这里拿一个临时变量返回用户,
// 避免前端出现错误提示
let cacheContents = defaultData.cacheContents;
let fetchContentsLock = false;
Page({
    data: {
        tgDaily: {
            week: dateUtil.weekday(),
            date: dateUtil.formattedNow('YYYY-MM-DD'),
            weather: '☀️',
            content: ''
        }
    },
    onLoad: function (options) {
        // 页面创建时执行
        this.refreshData();
    },
    onShow: function () {
        // 页面出现在前台时执行
    },
    onReady: function () {
        // 页面首次渲染完毕时执行
    },
    onHide: function () {
        // 页面从前台变为后台时执行
    },
    onUnload: function () {
        // 页面销毁时执行
    },
    onPullDownRefresh: function () {
        // 触发下拉刷新时执行
    },
    onReachBottom: function () {
        // 页面触底时执行
    },
    onShareAppMessage: function () {
        // 页面被用户分享时执行
    },
    onPageScroll: function () {
        // 页面滚动时执行
    },
    onResize: function () {
        // 页面尺寸变化时执行
    },
    onTabItemTap(item) {
        // tab 点击时执行
    },
    // 事件响应函数
    refreshBtnClick: function () {
        this.refreshData();
    },
    refreshData: function () {
        this.refreshWeekDateWeather();
        this.refreshContent();
    },
    refreshWeekDateWeather: function () {
        this.setData({
            'tgDaily.week': dateUtil.weekday(),
            'tgDaily.date': dateUtil.formattedNow('YYYY-MM-DD'),
            'tgDaily.weather': hahaConstant.weather.weatherToEmoji(randomUtil.randomIntInRange(1, 6))
        }, result => {
            // 设置结果
        });
    },
    refreshContent: function () {
        if (!fetchContentsLock) {
            fetchContentsLock = true;
            wx.request({
                url: basicRestURL + 'hahas/random?type=0',
                success: result => {
                    fetchContentsLock = false;

                    if (result.statusCode === 200) {
                        this.replaceContent(result.data);
                    } else {
                        wx.showToast({
                            title: '拉取数据失败, 使用本地缓存显示, 若多次失败请点击下方"客服"联系作者哦 🥴',
                            icon: 'none',
                            mask: true,
                            duration: 5000
                        });
                        this.refreshContentByCache();
                    }
                },
                fail: result => {
                    fetchContentsLock = false;

                    this.refreshContentByCache();
                }
            });
        }
    },
    refreshContentByCache: function () {
        let randomIndex = randomUtil.randomInt(cacheContents.length);

        this.replaceContent(cacheContents[randomIndex]);
    },
    replaceContent: function (content) {
        this.setData({
            'tgDaily.content': content
        }, (result) => {

        });
    },
    // 自由数据
    customData: {
        hi: 'MINA'
    }
});
