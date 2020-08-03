package cn.alpha2j.tobesbweb.site.service.scheduler;

import cn.alpha2j.tobesbweb.site.constant.CommonConstant;
import cn.alpha2j.tobesbweb.site.service.AccessTokenService;
import cn.alpha2j.tobesbweb.site.util.WeChatUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;

/**
 * Author: Jeb.Wang
 * Time: 2020/8/2 12:09
 */
@Component
public class ScheduledTask {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTask.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    private final AccessTokenService accessTokenService;
    private final RestTemplate restTemplate;

    private final int count = 0;

    public ScheduledTask(AccessTokenService accessTokenService, RestTemplate restTemplate) {
        this.accessTokenService = accessTokenService;
        this.restTemplate = restTemplate;
    }

    @Scheduled(fixedRate = 20000)
    public void reportCurrentTime() {

        String token = accessTokenService.get().getToken();
        String templateId = CommonConstant.WECHAT_SUBSCRIPTION_MESSAGE_TEMPLATE_ID;


        String toUser = "o8vl75Wpap9aUJUACihpSrR6Dzo8";
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode postBodyJSON = objectMapper.createObjectNode();
        postBodyJSON.put("touser", toUser);
        postBodyJSON.put("template_id", templateId);
        postBodyJSON.put("page", "pages/index/index");

        ObjectNode dataJSON = objectMapper.createObjectNode();
        ObjectNode propertyJSON1 = objectMapper.createObjectNode();
        propertyJSON1.put("value", "通过");
        dataJSON.put("phrase1", propertyJSON1);

        ObjectNode propertyJSON2 = objectMapper.createObjectNode();
        propertyJSON2.put("value", "2020-02-12");
        dataJSON.put("time2", propertyJSON2);

        ObjectNode propertyJSON3 = objectMapper.createObjectNode();
        propertyJSON3.put("value", "备注");
        dataJSON.put("thing3", propertyJSON3);

        ObjectNode propertyJSON4 = objectMapper.createObjectNode();
        propertyJSON4.put("value", "内容");
        dataJSON.put("thing4", propertyJSON4);

        postBodyJSON.put("data", dataJSON);

        String postBodyJSONStr = "";
        try {
            postBodyJSONStr = objectMapper.writeValueAsString(postBodyJSON);
        } catch (JsonProcessingException e) {
            log.warn("parse json to string error.", e);
            return;
        }
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(postBodyJSONStr, httpHeaders);
        String url = WeChatUtil.generateSendSubscriptionMessageURL(token);
        ResponseEntity<String> result = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        log.info("result: {}", result);
    }
}
