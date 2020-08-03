package cn.alpha2j.tobesbweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.client.RestTemplate;

@Configuration
@Profile("development")
public class DevelopmentConfiguration {

    @Bean
    public RestTemplate getRestTemplate() {

//        抓包配置, https暂无法抓取
//        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
//
//        Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 8888));
//        requestFactory.setProxy(proxy);
//
//        return new RestTemplate(requestFactory);
        return new RestTemplate();
    }
}
