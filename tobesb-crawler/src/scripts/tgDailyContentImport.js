/**
 * author: Jeb.Wang
 * date: 2020/7/19
 */
const datas = require('../../datas/tobesb_tobesb_haha.json');
const TGDailyContentService = require('../app/service/TGDailyContentService');
const {internalCode} = require('../app/constant/constant.common');

(async () => {
    const tgDailyContentService = TGDailyContentService.getInstance();
    let addedCount = 0;
    let existedCount = 0;

    for (let i = 0; i < datas.length; i++) {
        let data = datas[i];
        let contentEntity = {};
        contentEntity.date = data.date;
        contentEntity.weather = data.weather;
        contentEntity.content = data.content;
        contentEntity.ranking = data.ranking;
        contentEntity.auditStatus = 1;
        contentEntity.original = data.original;
        contentEntity.type = 0;
        contentEntity.contentHash = data.contentHash;
        contentEntity.createdBy = 0;
        contentEntity.createdAt = data.createdAt;

        let addResult = await tgDailyContentService.addContent(contentEntity);
        if (addResult === internalCode.SUCCESS) {
            console.log('content successfully added at [%s] times crawl.', i);
            addedCount++;
        } else {
            existedCount++;
            console.log('failed adding content. serviceCode: [%s]', JSON.stringify(addResult));
        }
    }

    console.log('addedCount: ', addedCount);
    console.log('existedCount: ', existedCount);
})();
