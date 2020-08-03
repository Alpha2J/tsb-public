/**
 * haha实体的相关常量值
 * author: Jeb.Wang
 * date: 2020/8/1
 */
const type = {
    TG_DAILY: 0
}

const weather = {
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
    thunderRaining: 5,
    weatherToEmoji: (val) => {
        switch (val) {
            case 0:
                return '☁️';
            case 1:
                return '☀️';
            case 2:
                return '🌤';
            case 3:
                return '🌦';
            case 4:
                return '🌧';
            case 5:
                return '⛈';
            default:
                return '🌨';
        }
    }
}

module.exports = {
    type: type,
    weather: weather
};
