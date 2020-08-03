package cn.alpha2j.tobesbweb.site.repository;

import cn.alpha2j.tobesbweb.site.entity.HaHa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Author: Jeb.Wang
 * Time: 2020/7/19 12:51
 */
public interface HaHaRepository extends PagingAndSortingRepository<HaHa, Long> {

    long countByType(int type);

    Page<HaHa> findAllByType(int type, Pageable pageable);
}
