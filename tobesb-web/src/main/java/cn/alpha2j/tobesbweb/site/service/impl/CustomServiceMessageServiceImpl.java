package cn.alpha2j.tobesbweb.site.service.impl;

import cn.alpha2j.tobesbweb.site.entity.AccessToken;
import cn.alpha2j.tobesbweb.site.entity.CustomServiceMessage;
import cn.alpha2j.tobesbweb.site.exception.ResourceNotFoundException;
import cn.alpha2j.tobesbweb.site.repository.CustomServiceMessageRepository;
import cn.alpha2j.tobesbweb.site.service.AccessTokenService;
import cn.alpha2j.tobesbweb.site.service.CustomServiceMessageService;
import cn.alpha2j.tobesbweb.site.util.WeChatUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Calendar;

/**
 * Author: Jeb.Wang
 * Time: 2020/8/1 23:47
 */
@Service
public class CustomServiceMessageServiceImpl implements CustomServiceMessageService {

    private static final Logger logger = LoggerFactory.getLogger(CustomServiceMessageServiceImpl.class);

    private final CustomServiceMessageRepository customServiceMessageRepository;
    private final AccessTokenService tokenService;
    private final RestTemplate restTemplate;

    public CustomServiceMessageServiceImpl(CustomServiceMessageRepository customServiceMessageRepository, AccessTokenService tokenService, RestTemplate restTemplate) {
        this.customServiceMessageRepository = customServiceMessageRepository;
        this.tokenService = tokenService;
        this.restTemplate = restTemplate;
    }

    @Override
    public CustomServiceMessage save(CustomServiceMessage customServiceMessage) throws ResourceNotFoundException {

        customServiceMessage.setCreatedAt(Calendar.getInstance());
        return customServiceMessageRepository.save(customServiceMessage);
    }

    @Override
    public void sendTextMsg(String toUser, String content) throws ResourceNotFoundException {
        AccessToken accessToken = tokenService.get();
        if (accessToken.needRefresh()) {
            logger.warn("access token expired.");
            throw new ResourceNotFoundException("access token expired.");
        }

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode postBodyJSON = objectMapper.createObjectNode();
        postBodyJSON.put("touser", toUser);
        postBodyJSON.put("content", content);
        postBodyJSON.put("msgtype", "text");

        ObjectNode textJSON = objectMapper.createObjectNode();
        textJSON.put("content", content);
        postBodyJSON.put("text", textJSON);

        String postBodyJSONStr = "";
        try {
            postBodyJSONStr = objectMapper.writeValueAsString(postBodyJSON);
        } catch (JsonProcessingException e) {
            logger.warn("parse json to string error.", e);
            return;
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(postBodyJSONStr, httpHeaders);
        String url = WeChatUtil.generateSendCustomServiceMessageURL(accessToken.getToken());
        ResponseEntity<String> result = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        logger.info("after send text message to user {}, result: {}", toUser, result.getBody());
    }
}
