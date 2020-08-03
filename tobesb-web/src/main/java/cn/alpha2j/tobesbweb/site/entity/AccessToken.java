package cn.alpha2j.tobesbweb.site.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Calendar;

/**
 * Author: Jeb.Wang
 * Time: 2020/8/2 09:20
 */
public class AccessToken {

    private String token;

    private int expires;

    private Calendar createdAt;

    @JsonIgnore
    public boolean needRefresh() {

        if (createdAt == null) {
            return true;
        }

        long distance = Calendar.getInstance().getTimeInMillis() - createdAt.getTimeInMillis();

        // 提前200秒失效
        return ((expires - distance) / 1000) >= (expires - 200);
    }

    @JsonProperty("access_token")
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @JsonProperty("expires_in")
    public int getExpires() {
        return expires;
    }

    public void setExpires(int expires) {
        this.expires = expires;
    }

    @JsonIgnore
    public Calendar getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Calendar createdAt) {
        this.createdAt = createdAt;
    }
}
