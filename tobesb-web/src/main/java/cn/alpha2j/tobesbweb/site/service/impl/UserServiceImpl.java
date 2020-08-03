package cn.alpha2j.tobesbweb.site.service.impl;

import cn.alpha2j.tobesbweb.site.controller.dto.MiniAppLoginResult;
import cn.alpha2j.tobesbweb.site.entity.User;
import cn.alpha2j.tobesbweb.site.exception.ResourceNotFoundException;
import cn.alpha2j.tobesbweb.site.exception.URLRequestException;
import cn.alpha2j.tobesbweb.site.repository.UserRepository;
import cn.alpha2j.tobesbweb.site.service.UserService;
import cn.alpha2j.tobesbweb.site.util.WeChatUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/21 22:13
 */
@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final RestTemplate restTemplate;
    // Auto-configuration for Jackson is provided and Jackson is part of spring-boot-starter-json. When Jackson is on the classpath an ObjectMapper bean is automatically configured. Several configuration properties are provided for customizing the configuration of the ObjectMapper.
    // https://docs.spring.io/spring-boot/docs/2.2.8.RELEASE/reference/html/spring-boot-features.html#boot-features-json-jackson
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    public UserServiceImpl(RestTemplate restTemplate, ObjectMapper objectMapper, UserRepository userRepository) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
    }

    @Override
    public User updateByOpenId(String openId, User user) throws ResourceNotFoundException {

        Optional<User> userOptional = userRepository.findByOpenId(openId);
        if (!userOptional.isPresent()) {
            logger.error("going to update user, but user got by openId is not present, openId [{}].", openId);
            throw new ResourceNotFoundException("entity not exists.");
        }

        User oldUser = userOptional.get();
        oldUser.setHeadImg(user.getHeadImg());
        oldUser.setGender(user.getGender());
        oldUser.setNickname(user.getNickname());
        oldUser.setRegion(user.getRegion());

        return userRepository.save(oldUser);
    }

    @Override
    public User loginByWxCode(String code) throws URLRequestException {

        MiniAppLoginResult result;
        try {
            String resultStr = restTemplate.getForObject(WeChatUtil.generateJscode2sessionURL(code), String.class);
            result = objectMapper.readValue(resultStr, MiniAppLoginResult.class);
            logger.info("after using code [{}] to login wx, result: [{}]", code, resultStr);
        } catch (JsonProcessingException exception) {
            logger.error("error using code [{}] to login wx, exception message: [{}], going to throw URLRequestException.", code, exception.getMessage());
            throw new URLRequestException();
        }

        String openId = result.getOpenid();
        if (openId == null) {
            logger.error("using invalid code [{}] to login wx, going to throw RuntimeException.", code);
            throw new RuntimeException("invalid code.");
        }

        User user;
        Optional<User> userOptional = userRepository.findByOpenId(openId);
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            logger.info("user of openId {} not present, going to save user.", openId);
            user = new User();
            user.setOpenId(openId);
            user = userRepository.save(user);
        }

        return user;
    }
}
