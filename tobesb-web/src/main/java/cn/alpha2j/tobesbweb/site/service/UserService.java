package cn.alpha2j.tobesbweb.site.service;

import cn.alpha2j.tobesbweb.site.entity.User;
import cn.alpha2j.tobesbweb.site.exception.ResourceNotFoundException;
import cn.alpha2j.tobesbweb.site.exception.URLRequestException;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/21 22:13
 */
public interface UserService {

    /**
     * 根据openId更新用户
     *
     * @param openId
     * @param user
     * @return
     * @throws ResourceNotFoundException openId对应用户不存在
     */
    User updateByOpenId(String openId, User user) throws ResourceNotFoundException;

    /**
     * 使用微信提供的code进行登录, 从微信获取到openId后检查openId是否存在我们平台,
     * 若不存在则会创建一条记录. 最后将openId对应的User记录返回.
     *
     * @param code 前端调用wx.login返回的code
     * @return openId对应的User
     * @throws RuntimeException    不符合业务逻辑的非法操作
     * @throws URLRequestException 外链访问异常
     */
    User loginByWxCode(String code) throws RuntimeException, URLRequestException;
}
