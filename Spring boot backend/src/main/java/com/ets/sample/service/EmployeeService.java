package com.ets.sample.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ets.sample.beans.Department;
import com.ets.sample.beans.Employee;
import com.ets.sample.repo.DepartmentRepo;
import com.ets.sample.repo.EmployeeRepo;

/**
 * Back end service for managing {@code Employee} CRUD operations
 * 
 * @author n.salaheldeen
 */
@Service
public class EmployeeService {

	@Autowired
	EmployeeRepo employeeRepo;

	@Autowired
	DepartmentRepo departmentRepo;

	public Page<Employee> getAllEmployees(Pageable pageable) {

		return employeeRepo.findAll(pageable);
	}

	public Employee getEmployee(Integer employeeId) {

		return employeeRepo.findOne(employeeId);

	}

	public Employee addEmployee(Employee employee) throws Exception {

		int departmentId = employee.getDepartment().getDepartmentId();
		
		Department department = departmentRepo.findOne(departmentId);

		if (department != null) {
			employee.setDepartment(department);
			Employee addedEmp = employeeRepo.save(employee);
			return addedEmp;
		} else {
			throw new Exception("Department " + departmentId + " not found");
		}
	}

	public Employee updateEmployee(Employee employee) throws Exception {

		int empId = employee.getEmployeeId();
		
		if (employeeRepo.findOne(empId) == null) {
			throw new Exception("EmployeeId " + empId + " not found");
		} else {
			
			Integer depId = employee.getDepartment().getDepartmentId();
			Department department = departmentRepo.findOne(depId);
			employee.setDepartment(department);

			return employeeRepo.save(employee);
		}
	}

	public void deleteEmployee(Integer employeeId) throws Exception {

		if (employeeRepo.findOne(employeeId) == null) {
			throw new Exception("EmployeeId " + employeeId + " not found");

		} else {
			employeeRepo.delete(employeeId);
		}
	}

}
