package cn.alpha2j.tobesbweb.site.restController;

import cn.alpha2j.tobesbweb.site.constant.entity.HaHaConstant;
import cn.alpha2j.tobesbweb.site.entity.HaHa;
import cn.alpha2j.tobesbweb.site.exception.ResourceNotFoundException;
import cn.alpha2j.tobesbweb.site.service.HaHaService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/19 12:57
 */
@RestController
@RequestMapping(value = "/api/v1/hahas")
public class HaHaController {

    private final HaHaService hahaService;

    public HaHaController(HaHaService hahaService) {
        this.hahaService = hahaService;
    }

    @GetMapping(value = "/random")
    public HaHa getRandomOne(@RequestParam int type) {
        Optional<HaHa> contentOptional = hahaService.getRandomOne(type);
        return contentOptional.orElseThrow(ResourceNotFoundException::new);
    }

    //    小程序不支持patch方法, 日他奶. 先用put顶顶先
//    @PatchMapping(value = "/like")
    @PutMapping(value = "/like")
    public HaHa addLikeToOne(@RequestParam String openId, @RequestParam int hahaId) {
        Optional<HaHa> contentOptional = hahaService.addLikeToOne(openId, hahaId);
        return contentOptional.orElseThrow(ResourceNotFoundException::new);
    }

    @GetMapping(value = "")
    public List<HaHa> get(@RequestParam int type, Pageable page) {
        return hahaService.getForPage(type, page);
    }

    @PostMapping(value = "")
    public ResponseEntity<HaHa> create(@RequestBody HaHaCreationForm form) {

        HaHa haha = hahaService.saveWithOpenId(form.getContent(), HaHaConstant.Type.TG_DAILY, form.getOpenId());

        String uri = ServletUriComponentsBuilder.fromCurrentServletMapping()
                .path("/api/v1/haha/{id}").buildAndExpand(haha.getId()).toString();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(haha, headers, HttpStatus.CREATED);
    }

    static final class HaHaCreationForm {

        private String openId;

        private String content;

        private boolean receiveSubMessage;

        public String getOpenId() {
            return openId;
        }

        public void setOpenId(String openId) {
            this.openId = openId;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public boolean isReceiveSubMessage() {
            return receiveSubMessage;
        }

        public void setReceiveSubMessage(boolean receiveSubMessage) {
            this.receiveSubMessage = receiveSubMessage;
        }
    }
}
