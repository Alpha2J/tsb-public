package cn.alpha2j.tobesbweb.site.constant;

public class CommonConstant {
    public static final String WECHAT_APP_ID = "";
    public static final String WECHAT_APP_SECRET = "";
    public static final String WECHAT_CUSTOM_SERVICE_MESSAGE_TOKEN = "";
    public static final String WECHAT_CUSTOM_SERVICE_MESSAGE_ENCODING_AES_KEY = "";
    public static final String WECHAT_SUBSCRIPTION_MESSAGE_TEMPLATE_ID = "";

    public static final String WECHAT_JSCODE2SESSION_URL = "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code";
    public static final String WECHAT_GET_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
    public static final String WECHAT_SEND_CUSTOM_SERVICE_MESSAGE_URL = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s";
    public static final String WECHAT_SEND_SUBSCRIPTION_MESSAGE_URL = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=%s";
}
