package com.ets.sample.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ets.sample.beans.Department;
import com.ets.sample.beans.Employee;
import com.ets.sample.repo.DepartmentRepo;
import com.ets.sample.repo.EmployeeRepo;

/**
 * Back end service for managing {@code Department} CRUD operations
 * 
 * @author n.salaheldeen
 */
@Service
public class DepartmentService {

	@Autowired
	EmployeeRepo employeeRepo;

	@Autowired
	DepartmentRepo departmentRepo;

	public Page<Department> getAllDepartments(Pageable pageable) {

		return departmentRepo.findAll(pageable);
	}

	public Department getDepartment(Integer departmentId) {

		return departmentRepo.findOne(departmentId);

	}

	public Department addDepartment(Department department) {

		return departmentRepo.save(department);

	}

	public Department updateDepartment(Department department) throws Exception {

		int depId = department.getDepartmentId();
		if (departmentRepo.findOne(depId) == null) {
			throw new Exception("DepartmentId " + depId + " not found");

		} else {
			return departmentRepo.save(department);
		}
	}

	public void deleteDepartment(Integer departmentId) throws Exception {

		if (departmentRepo.findOne(departmentId) == null) {
			throw new Exception("DepartmentId " + departmentId + " not found");

		} else {
			// check if child employees exist
			List<Employee> depEmployees = employeeRepo.findByDepartmentDepartmentId(departmentId);
			if (depEmployees.isEmpty()) {
				departmentRepo.delete(departmentId);
			} else {
				throw new IllegalArgumentException(
						"DepartmentId " + departmentId + " contains employees, remove them first");
			}

		}
	}
}
