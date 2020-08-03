package cn.alpha2j.tobesbweb.site.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/21 22:12
 */
@Entity
@Table(name = "tobesb_user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String headImg;

    private int gender;

    private String nickname;

    private String region;

    private String openId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "headimg")
    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    @Basic
    @Column(name = "nickname")
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    @Basic
    @Column(name = "openid")
    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }
}
