package cn.alpha2j.tobesbweb.site.service.impl;

import cn.alpha2j.tobesbweb.site.constant.entity.HaHaConstant;
import cn.alpha2j.tobesbweb.site.entity.HaHa;
import cn.alpha2j.tobesbweb.site.entity.User;
import cn.alpha2j.tobesbweb.site.exception.ResourceNotFoundException;
import cn.alpha2j.tobesbweb.site.repository.HaHaRepository;
import cn.alpha2j.tobesbweb.site.repository.UserRepository;
import cn.alpha2j.tobesbweb.site.service.HaHaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.transaction.Transactional;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/19 12:53
 */
@Service
@Transactional
public class HaHaServiceImpl implements HaHaService {

    private static final Logger logger = LoggerFactory.getLogger(HaHaServiceImpl.class);

    private final UserRepository userRepository;
    private final HaHaRepository hahaRepository;

    public HaHaServiceImpl(UserRepository userRepository, HaHaRepository hahaRepository) {
        this.userRepository = userRepository;
        this.hahaRepository = hahaRepository;
    }

    @Override
    public Optional<HaHa> getRandomOne(int type) throws ResourceNotFoundException {

        long count = hahaRepository.countByType(type);
        if (count <= 0) {
            logger.warn("no haha exists currently, going to throw ResourceNotFoundException.");
            throw new ResourceNotFoundException("no haha exists currently.");
        }

        long randomIndex = ThreadLocalRandom.current().nextLong(count + 1);
        Page<HaHa> randomPage = hahaRepository.findAllByType(type, PageRequest.of((int) randomIndex, 1));
        if (!randomPage.hasContent()) {
            logger.warn("!randomPage.hasContent(), going to throw ResourceNotFoundException.");
            throw new ResourceNotFoundException("!randomPage.hasContent().");
        }

        return Optional.of(randomPage.getContent().get(0));
    }

    @Transactional
    @Override
    public Optional<HaHa> addLikeToOne(String openId, long hahaId) throws ResourceNotFoundException {

        Optional<User> userOptional = userRepository.findByOpenId(openId);
        if (!userOptional.isPresent()) {
            logger.error("going to add like to haha, but user got by openId is not present, openId [{}].", openId);
            throw new ResourceNotFoundException("no user exists");
        }

        Optional<HaHa> hahaOptional = hahaRepository.findById(hahaId);
        if (!hahaOptional.isPresent()) {
            logger.error("going to add like to haha, but haha got by id is not present, hahaId [{}].", hahaId);
            throw new ResourceNotFoundException("no haha exists");
        }

        User user = userOptional.get();
        long userId = user.getId();

        HaHa haha = hahaOptional.get();
        Set<Long> likedUsers = haha.getLikedUsers();
        likedUsers.add(userId);
        haha.setLikedUsers(likedUsers);

        haha = hahaRepository.save(haha);

        return Optional.of(haha);
    }

    @Override
    public List<HaHa> getForPage(int type, Pageable page) throws ResourceNotFoundException {

        Page<HaHa> hahaPage = hahaRepository.findAllByType(type, page);
        if (!hahaPage.hasContent()) {
            logger.warn("!randomPage.hasContent(), going to throw ResourceNotFoundException.");
            throw new ResourceNotFoundException("!randomPage.hasContent().");
        }

        return hahaPage.getContent();
    }

    @Override
    public HaHa saveWithOpenId(String content, int type, String openId) throws ResourceNotFoundException {

        Optional<User> userOptional = userRepository.findByOpenId(openId);
        if (!userOptional.isPresent()) {
            logger.error("going to save haha, but user got by openId is not present, openId [{}].", openId);
            throw new ResourceNotFoundException("no haha exists");
        }

        User user = userOptional.get();

        HaHa haha = new HaHa();
        haha.setDate(Calendar.getInstance());

        Random random = new Random();
        haha.setWeather(random.nextInt(HaHaConstant.MAX_WEATHER_NO + 1));
        haha.setContent(content);
        haha.setRanking(HaHaConstant.INITIAL_RANKING);
        haha.setAuditStatus(HaHaConstant.AuditStatus.INITIAL);
        haha.setOriginal(HaHaConstant.Original.USER_CREATION);
        haha.setType(type);
        haha.setCreatedBy(user.getId());
        haha.setCreatedAt(Calendar.getInstance());

        byte[] contentBytes = content.getBytes(StandardCharsets.UTF_8);
        String contentHash = DigestUtils.md5DigestAsHex(contentBytes);
        haha.setContentHash(contentHash);

        return hahaRepository.save(haha);
    }
}
