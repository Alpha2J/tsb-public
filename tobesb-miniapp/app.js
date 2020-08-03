const authUtil = require('./utils/authUtil.js');

//app.js
App({
    onLaunch: function () {
        if (!authUtil.isLogined()) {
            authUtil.doLogin();
        }
    },
    globalData: {
//        userInfo: null
    }
})
