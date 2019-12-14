package com.ets.sample.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ets.sample.beans.Employee;

@Repository
public interface EmployeeRepo extends PagingAndSortingRepository<Employee, Integer> {

	Page<Employee> findAll(Pageable pageable);
	List<Employee> findByDepartmentDepartmentId(Integer departmentId);
}
