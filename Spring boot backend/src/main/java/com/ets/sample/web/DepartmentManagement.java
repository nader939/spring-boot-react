package com.ets.sample.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ets.sample.beans.Department;
import com.ets.sample.service.DepartmentService;

/**
 * Provides APIs for managing {@code Department} CRUD operations. Relies on
 * {@link #departmentService}
 * 
 * @author n.salaheldeen
 *
 */
@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/departments")
public class DepartmentManagement {

	@Autowired
	DepartmentService departmentService;

	Logger logger = LoggerFactory.getLogger(DepartmentManagement.class);

	@GetMapping("/fetchAll")
	public Page<Department> getAllDepartments(Pageable pageable) {

		return departmentService.getAllDepartments(pageable);

	}

	@GetMapping("/fetch/{departmentId}")
	public ResponseEntity<?> getDepartment(@PathVariable Integer departmentId) {

		Department dep = departmentService.getDepartment(departmentId);
		if (dep == null) {
			return new ResponseEntity<String>("DepartmentId " + departmentId + " not found", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Department>(dep, HttpStatus.OK);

	}

	@PostMapping("/add")
	public ResponseEntity<?> addDepartment(@RequestBody Department department) {

		Department addedDep = departmentService.addDepartment(department);
		return new ResponseEntity<Department>(addedDep, HttpStatus.OK);

	}

	@PutMapping("/update")
	public ResponseEntity<?> updateDepartment(@RequestBody Department department) {

		try {
			departmentService.updateDepartment(department);
			return new ResponseEntity<String>("Updated", HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return new ResponseEntity<String>("Department not found", HttpStatus.NOT_FOUND);
		}

	}

	@DeleteMapping("/delete/{departmentId}")
	public ResponseEntity<?> deleteDepartment(@PathVariable Integer departmentId) {

		try {
			departmentService.deleteDepartment(departmentId);
			return new ResponseEntity<String>("Deleted", HttpStatus.OK);
		} catch (IllegalArgumentException e) {
			logger.error(e.getMessage());
			return new ResponseEntity<String>("DepartmentId " + departmentId + " contains employees, remove them first",
					HttpStatus.FORBIDDEN);

		} catch (Exception e) {
			logger.error(e.getMessage());
			return new ResponseEntity<String>("DepartmentId " + departmentId + " not found", HttpStatus.NOT_FOUND);
		}

	}
}
