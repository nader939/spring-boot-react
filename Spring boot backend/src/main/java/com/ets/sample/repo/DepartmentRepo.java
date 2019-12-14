package com.ets.sample.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ets.sample.beans.Department;

@Repository
public interface DepartmentRepo extends PagingAndSortingRepository<Department, Integer> {

	Page<Department> findAll(Pageable pageable);
}
