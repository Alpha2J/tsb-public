package cn.alpha2j.tobesbweb.site.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MiniAppLoginResult {

    private String sessionKey;

    private String openId;

    private Integer errorCode;

    private String errorMessage;

    @JsonProperty("session_key")
    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    @JsonProperty("openid")
    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    @JsonProperty("errcode")
    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    @JsonProperty("errmsg")
    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
