package cn.alpha2j.tobesbweb.site.service.impl;

import cn.alpha2j.tobesbweb.site.entity.AccessToken;
import cn.alpha2j.tobesbweb.site.service.AccessTokenService;
import cn.alpha2j.tobesbweb.site.util.WeChatUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Calendar;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Author: Jeb.Wang
 * Time: 2020/8/2 09:21
 */
@Service
public class AccessTokenServiceImpl implements AccessTokenService {

    private static final Logger logger = LoggerFactory.getLogger(AccessTokenServiceImpl.class);

    private final RestTemplate restTemplate;
    private final Lock lock;
    // 先用局部变量存起来, 后面放redis
    private AccessToken accessToken;

    public AccessTokenServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        accessToken = new AccessToken();
        lock = new ReentrantLock();
    }

    @Override
    public AccessToken get() {

        if (accessToken.needRefresh()) {
            lock.lock();
            try {
                if (accessToken.needRefresh()) {
                    AccessToken result = restTemplate.getForObject(WeChatUtil.generateGetTokenURL(), AccessToken.class);
                    if (result != null) {
                        result.setCreatedAt(Calendar.getInstance());
                        accessToken = result;
                        logger.info("access token refreshing success. new token: {}, new expires: {}", accessToken.getToken(), accessToken.getExpires());
                    } else {
                        logger.info("access token refreshing failed. old token: {}, old expires: {}", accessToken.getToken(), accessToken.getExpires());
                    }
                }
            } catch (Exception e) {
                logger.warn("refreshing token error.", e);
            } finally {
                lock.unlock();
            }
        }

        return accessToken;
    }
}
