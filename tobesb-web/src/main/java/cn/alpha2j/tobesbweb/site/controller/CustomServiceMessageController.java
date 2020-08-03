package cn.alpha2j.tobesbweb.site.controller;

import cn.alpha2j.tobesbweb.site.constant.CommonConstant;
import cn.alpha2j.tobesbweb.site.entity.CustomServiceMessage;
import cn.alpha2j.tobesbweb.site.service.CustomServiceMessageService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

/**
 * Author: Jeb.Wang
 * Time: 2020/8/1 14:57
 */
@RestController
@RequestMapping(value = "/customServiceMessage")
public class CustomServiceMessageController {

    private static final Logger logger = LoggerFactory.getLogger(CustomServiceMessageController.class);

    private final CustomServiceMessageService customServiceMessageService;

    public CustomServiceMessageController(CustomServiceMessageService customServiceMessageService) {
        this.customServiceMessageService = customServiceMessageService;
    }

    private boolean checkSignature(String signature, String timestamp, String nonce) {

        if (signature == null || timestamp == null || nonce == null) {
            logger.warn("checkSignature failed. signature: {}, timestamp: {}, nonce: {}.", signature, timestamp, nonce);
            return false;
        }

        String[] wxParams = new String[3];
        wxParams[0] = CommonConstant.WECHAT_CUSTOM_SERVICE_MESSAGE_TOKEN;
        wxParams[1] = timestamp;
        wxParams[2] = nonce;

        String wxParamsStr = "";
        Arrays.sort(wxParams);
        for (int i = 0; i < wxParams.length; i++) {
            wxParamsStr += wxParams[i];
        }
        String sha1HexResult = DigestUtils.sha1Hex(wxParamsStr);

        return signature.equals(sha1HexResult);
    }

    //    微信校验请求, 校验成功的话需要原样返回echostr, 这样微信那边才算成功通过配置
    @GetMapping(value = "/receive")
    @ResponseBody
    public String receiveValidation(String signature, String timestamp, String nonce, String echostr) {

        if (!checkSignature(signature, timestamp, nonce)) {
            logger.warn("Configuring callback URL, but checkSignature failed. signature: {}, timestamp: {}, nonce: {}", signature, timestamp, nonce);
            return "";
        }

        return echostr;
    }

    @PostMapping(value = "/receive")
    @ResponseBody
    public String receiveMessage(@RequestBody MessageForm form, String signature, String timestamp, String nonce) {

        if (!checkSignature(signature, timestamp, nonce)) {
            logger.warn("Receiving message, but checkSignature failed. signature: {}, timestamp: {}, nonce: {}", signature, timestamp, nonce);
            return "";
        }

        // 目前只保存用户对话信息
        String msgType = form.getMsgType();
        if ("text".equals(msgType)) {
            CustomServiceMessage customServiceMessage = new CustomServiceMessage();
            customServiceMessage.setToUserName(form.getToUserName());
            customServiceMessage.setFromUserName(form.getFromUserName());
            customServiceMessage.setCreateTime(form.getCreateTime());
            customServiceMessage.setMsgType(form.getMsgType());
            customServiceMessage.setContent(form.getContent());
            customServiceMessage.setMsgId(form.getMsgId());
            customServiceMessage.setEncrypt(form.getEncrypt());

            customServiceMessageService.save(customServiceMessage);
        }

        // 目前现在用户进来的时候做出相应
        boolean shouldReply = false;
        String replyContent = "";
        if ("event".equals(msgType)) {
            shouldReply = true;
            replyContent = "意见, 建议都可在这畅所欲言哦 🤒, 我们看到后会及时回复的! 🐶";
        }

        if (shouldReply) {
            customServiceMessageService.sendTextMsg(form.getFromUserName(), replyContent);
        }

        return "";
    }

    static final class MessageForm {

        private String toUserName;

        private String fromUserName;

        private String createTime;

        private String msgType;

        private String content;

        private String msgId;

        private String encrypt;

        @JsonProperty("ToUserName")
        public String getToUserName() {
            return toUserName;
        }

        public void setToUserName(String toUserName) {
            this.toUserName = toUserName;
        }

        @JsonProperty("FromUserName")
        public String getFromUserName() {
            return fromUserName;
        }

        public void setFromUserName(String fromUserName) {
            this.fromUserName = fromUserName;
        }

        @JsonProperty("CreateTime")
        public String getCreateTime() {
            return createTime;
        }

        public void setCreateTime(String createTime) {
            this.createTime = createTime;
        }

        @JsonProperty("MsgType")
        public String getMsgType() {
            return msgType;
        }

        public void setMsgType(String msgType) {
            this.msgType = msgType;
        }

        @JsonProperty("Content")
        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        @JsonProperty("MsgId")
        public String getMsgId() {
            return msgId;
        }

        public void setMsgId(String msgId) {
            this.msgId = msgId;
        }

        @JsonProperty("Encrypt")
        public String getEncrypt() {
            return encrypt;
        }

        public void setEncrypt(String encrypt) {
            this.encrypt = encrypt;
        }
    }
}
