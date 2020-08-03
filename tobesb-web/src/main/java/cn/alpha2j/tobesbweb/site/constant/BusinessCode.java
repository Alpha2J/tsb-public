package cn.alpha2j.tobesbweb.site.constant;

/**
 * 供controller层的非restController使用的业务code
 */
public class BusinessCode {

    public static final int INFO_OPERATION_SUCCESS = 1000;
    public static final int INFO_OPERATION_FAIL = 1001;

    // 保留
    public static final int WARNXXX = 3000;

    public static final int ERROR_WX_LOGIN_CODE_NOT_VALID = 5000;

    public static String getMessageByCode(int code) {

        String message = "";
        switch (code) {
            case INFO_OPERATION_SUCCESS:
                message = "operation success";
                break;
            case INFO_OPERATION_FAIL:
                message = "operation fail";
                break;
            case ERROR_WX_LOGIN_CODE_NOT_VALID:
                message = "wx login code not valid";
                break;
            default:
        }

        return message;
    }
}
