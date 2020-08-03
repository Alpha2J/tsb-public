package cn.alpha2j.tobesbweb.site.controller;

import cn.alpha2j.tobesbweb.site.constant.BusinessCode;
import cn.alpha2j.tobesbweb.site.controller.dto.ResponseContent;
import cn.alpha2j.tobesbweb.site.entity.User;
import cn.alpha2j.tobesbweb.site.exception.URLRequestException;
import cn.alpha2j.tobesbweb.site.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/")
public class AuthenticationController {

    private final UserService userService;

    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    /**
     * httpStatus永远为200
     * 成功: code: 1000, user: 对应user
     * 失败: code: 1001, user: null
     *
     * @param code
     * @return
     */
    @PostMapping(value = "login")
    @ResponseBody
    public ResponseContent<User> login(@RequestParam String code) {

        User user = userService.loginByWxCode(code);
        return new ResponseContent<>(
                BusinessCode.INFO_OPERATION_SUCCESS,
                BusinessCode.getMessageByCode(BusinessCode.INFO_OPERATION_SUCCESS),
                user
        );
    }

    @ExceptionHandler(value = {RuntimeException.class, URLRequestException.class})
    @ResponseBody
    public ResponseContent<User> exceptionHandler() {

        return new ResponseContent<>(
                BusinessCode.INFO_OPERATION_FAIL,
                BusinessCode.getMessageByCode(BusinessCode.INFO_OPERATION_FAIL),
                null
        );
    }
}
