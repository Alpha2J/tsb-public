/**
 * author: Jeb.Wang
 * date: 2020/7/18
 */
const {randomUtil, dateUtil} = require('../util');

class TGDailyContent {
    constructor(id, date, weather, content, ranking, auditStatus, original, type, contentHash, createdBy, createdAt) {
        if (id !== -1) {
            this.id = id;
        }
        this.date = date;
        this.weather = weather;
        this.content = content;
        this.ranking = ranking;
        this.auditStatus = auditStatus;
        this.original = original;
        this.type = type;
        this.contentHash = contentHash;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }

    static getRandomWeather() {
        return randomUtil.randomInt(6);
    }

    /**
     * 在入库前调用, 确保合法化tgDailyContent字段的值,
     * date(可不提供), content, original, contentHash字段需要自行设置
     *
     * 具体逻辑如下:
     * 1. date: 是否存在, 不存在则设置为当前时间
     * 2. weather: 随机获取一个系统内置天气
     * 3. ranking: 设置为默认值0
     * 4. auditStatus: 设置为未审核
     * 5. original: 设置为合法的途径
     * 6. contentHash: content字段的md5值
     * 7. createdAt: 当前时间
     *
     * @param tgDailyContent
     * @returns {TGDailyContent}
     */
    static legalizeEntity(tgDailyContent) {
        let date = tgDailyContent.date || dateUtil.formattedNow();
        let weather = TGDailyContent.getRandomWeather();
        let content = tgDailyContent.content;
        let ranking = 0;
        let auditStatus = TGDailyContent.auditStatusConstant.initial;
        let original = tgDailyContent.original;
        let type = 0;
        let contentHash = tgDailyContent.contentHash;
        // original为userCreation的时候这个字段才有值
        let createdBy = 0;
        let createdAt = dateUtil.formattedNow();

        return new TGDailyContent(-1, date, weather, content, ranking, auditStatus, original, type, contentHash, createdBy, createdAt);
    }
}

// MacOS中关于天气的emoji有这些, 目前先筛几个来用
// ☀️🌤⛅️🌥☁️🌦🌧⛈🌩🌨❄️☃️⛄️🌬💨💧💦☔️☂️🌊🌫
TGDailyContent.weatherConstant = {
    // 云 ☁️
    cloudy: 0,
    // 晴 ☀️
    sunny: 1,
    // 晴转多云 🌤
    sunnyCloudy: 2,
    // 晴转雨 🌦
    sunnyRaining: 3,
    // 雨 🌧
    raining: 4,
    // 雷阵雨 ⛈
    thunderRaining: 5
};
TGDailyContent.auditStatusConstant = {
    // 待审核
    initial: 0,
    // 审核通过
    approve: 1,
    // 审核失败
    refused: 2
};
TGDailyContent.originalConstant = {
    // 来自用户创建
    userCreation: 0,
    // https://www.huhexian.com/tiangou
    huhexian_comCrawl: 1,
    // https://www.somekey.cn/tiangou/random.php
    somekey_cnCrawl: 2
}

module.exports = TGDailyContent;
