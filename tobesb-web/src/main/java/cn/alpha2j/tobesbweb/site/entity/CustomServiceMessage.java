package cn.alpha2j.tobesbweb.site.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;

/**
 * Author: Jeb.Wang
 * Time: 2020/8/1 23:36
 */
@Entity
@Table(name = "tobesb_custom_service_message")
public class CustomServiceMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String toUserName;

    private String fromUserName;

    private String createTime;

    private String msgType;

    private String content;

    private String msgId;

    private String encrypt;

    private Calendar createdAt;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "tousername")
    public String getToUserName() {
        return toUserName;
    }

    public void setToUserName(String toUserName) {
        this.toUserName = toUserName;
    }

    @Column(name = "fromusername")
    public String getFromUserName() {
        return fromUserName;
    }

    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }

    @Column(name = "createtime")
    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    @Column(name = "msgtype")
    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "msgid")
    public String getMsgId() {
        return msgId;
    }

    public void setMsgId(String msgId) {
        this.msgId = msgId;
    }

    public String getEncrypt() {
        return encrypt;
    }

    public void setEncrypt(String encrypt) {
        this.encrypt = encrypt;
    }

    @Column(name = "createdat")
    public Calendar getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Calendar createdAt) {
        this.createdAt = createdAt;
    }
}
