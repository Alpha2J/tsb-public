package cn.alpha2j.tobesbweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ToBeSBWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToBeSBWebApplication.class, args);
    }
}
