package cn.alpha2j.tobesbweb.site.controller.dto;

/**
 * 供非rest接口使用, 如AuthenticationController
 *
 * @param <T>
 */
public class ResponseContent<T> {

    private int code;

    private String message;

    private T data;

    public ResponseContent() {

    }

    public ResponseContent(int code, String message) {
        this(code, message, null);
    }

    public ResponseContent(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
