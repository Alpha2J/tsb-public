package cn.alpha2j.tobesbweb.site.service;

import cn.alpha2j.tobesbweb.site.entity.HaHa;
import cn.alpha2j.tobesbweb.site.exception.ResourceNotFoundException;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/19 12:52
 */
public interface HaHaService {

    /**
     * 随机获取一条content记录
     *
     * @param type
     * @return
     * @throws ResourceNotFoundException 当前没有content记录存在
     */
    Optional<HaHa> getRandomOne(int type) throws ResourceNotFoundException;

    /**
     * 点赞haha
     *
     * @param openId
     * @param hahaId
     * @return
     * @throws ResourceNotFoundException
     */
    Optional<HaHa> addLikeToOne(String openId, long hahaId) throws ResourceNotFoundException;

    /**
     * 获取一页数据
     *
     * @param type
     * @param page
     * @return
     * @throws ResourceNotFoundException
     */
    List<HaHa> getForPage(int type, Pageable page) throws ResourceNotFoundException;

    /**
     * 添加一条记录, 并映射到openId指定的用户
     *
     * @param content
     * @param type
     * @param openId
     * @return
     * @throws ResourceNotFoundException
     */
    HaHa saveWithOpenId(String content, int type, String openId) throws ResourceNotFoundException;
}
