package cn.alpha2j.tobesbweb.site.restController;

import cn.alpha2j.tobesbweb.site.entity.User;
import cn.alpha2j.tobesbweb.site.service.UserService;
import org.springframework.web.bind.annotation.*;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/21 22:11
 */
@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping(value = "/{openId}")
    public User updateByOpenId(@PathVariable(value = "openId") String openId, @RequestBody UserUpdateForm form) {

        User user = new User();
        user.setHeadImg(form.getHeadImg());
        user.setGender(form.getGender());
        user.setNickname(form.getNickname());
        user.setRegion(form.getRegion());

        return userService.updateByOpenId(openId, user);
    }

    static final class UserUpdateForm {

        private String headImg;

        private int gender;

        private String nickname;

        private String region;

        private String openId;

        public String getHeadImg() {
            return headImg;
        }

        public void setHeadImg(String headImg) {
            this.headImg = headImg;
        }

        public int getGender() {
            return gender;
        }

        public void setGender(int gender) {
            this.gender = gender;
        }

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }

        public String getRegion() {
            return region;
        }

        public void setRegion(String region) {
            this.region = region;
        }

        public String getOpenId() {
            return openId;
        }

        public void setOpenId(String openId) {
            this.openId = openId;
        }
    }
}
