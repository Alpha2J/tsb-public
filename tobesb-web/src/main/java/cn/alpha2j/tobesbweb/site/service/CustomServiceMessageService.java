package cn.alpha2j.tobesbweb.site.service;

import cn.alpha2j.tobesbweb.site.entity.CustomServiceMessage;
import cn.alpha2j.tobesbweb.site.exception.ResourceNotFoundException;

/**
 * Author: Jeb.Wang
 * Time: 2020/8/1 23:44
 */
public interface CustomServiceMessageService {

    /**
     * @param customServiceMessage
     * @return
     * @throws ResourceNotFoundException
     */
    CustomServiceMessage save(CustomServiceMessage customServiceMessage) throws ResourceNotFoundException;

    /**
     * 调用微信接口发送客服消息给用户
     *
     * @param toUser  接受者的openId
     * @param content 发送的内容
     * @throws ResourceNotFoundException 相关资源拿不到, 如Access_Token
     */
    void sendTextMsg(String toUser, String content) throws ResourceNotFoundException;
}
