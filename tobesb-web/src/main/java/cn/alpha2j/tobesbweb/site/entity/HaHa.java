package cn.alpha2j.tobesbweb.site.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Set;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/19 12:40
 */
@Entity
@Table(name = "tobesb_haha")
public class HaHa implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private Calendar date;

    private int weather;

    private String content;

    private long ranking;

    private int auditStatus;

    private int original;

    private int type;

    private String contentHash;

    private Long createdBy;

    // 不需要顺序, 存用户id就可以了
    // 取消注释也可以直接使用
    //    private List<User> likedUsers;
    private Set<Long> likedUsers;

    private Calendar createdAt;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) {
        this.date = date;
    }

    public int getWeather() {
        return weather;
    }

    public void setWeather(int weather) {
        this.weather = weather;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getRanking() {
        return ranking;
    }

    public void setRanking(long ranking) {
        this.ranking = ranking;
    }

    @Column(name = "auditstatus") // 不加这行的话, hibernate会将字段解析为audit_status, 从而找不到字段
    public int getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(int auditStatus) {
        this.auditStatus = auditStatus;
    }

    public int getOriginal() {
        return original;
    }

    public void setOriginal(int original) {
        this.original = original;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    @Column(name = "contenthash")
    public String getContentHash() {
        return contentHash;
    }

    public void setContentHash(String contentHash) {
        this.contentHash = contentHash;
    }

    @Column(name = "createdby")
    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "tobesb_user_tgdailyContent_liked_map",
//            joinColumns = @JoinColumn(name = "tgdaily_content_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
//    )
//    public List<User> getLikedUsers() {
//        return likedUsers;
//    }
//
//    public void setLikedUsers(List<User> likedUsers) {
//        this.likedUsers = likedUsers;
//    }

    @ElementCollection
    @CollectionTable(name = "tobesb_user_haha_liked_map", joinColumns = @JoinColumn(name = "haha_id", referencedColumnName = "id"))
    @Column(name = "user_id")
    public Set<Long> getLikedUsers() {
        return likedUsers;
    }

    public void setLikedUsers(Set<Long> likedUsers) {
        this.likedUsers = likedUsers;
    }

    @Column(name = "createdat")
    public Calendar getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Calendar createdAt) {
        this.createdAt = createdAt;
    }
}
