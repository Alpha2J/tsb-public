package cn.alpha2j.tobesbweb.site.repository;

import cn.alpha2j.tobesbweb.site.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/21 22:12
 */
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByOpenId(String openId);
}
