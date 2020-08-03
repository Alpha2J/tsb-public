package cn.alpha2j.tobesbweb.site.util;

import static cn.alpha2j.tobesbweb.site.constant.CommonConstant.*;

public class WeChatUtil {
    //     https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code
    public static String generateJscode2sessionURL(String code) {
        return String.format(WECHAT_JSCODE2SESSION_URL, WECHAT_APP_ID, WECHAT_APP_SECRET, code);
    }

    //    https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    public static String generateGetTokenURL() {
        return String.format(WECHAT_GET_TOKEN_URL, WECHAT_APP_ID, WECHAT_APP_SECRET);
    }

    //    https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN
    public static String generateSendCustomServiceMessageURL(String token) {
        return String.format(WECHAT_SEND_CUSTOM_SERVICE_MESSAGE_URL, token);
    }

    //    https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=ACCESS_TOKEN
    public static String generateSendSubscriptionMessageURL(String token) {
        return String.format(WECHAT_SEND_SUBSCRIPTION_MESSAGE_URL, token);
    }
}
