package com.ets.sample.web;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ets.sample.beans.Employee;
import com.ets.sample.service.EmployeeService;

/**
 * Provides APIs for managing {@code Employee} CRUD operations. Relies on
 * {@link #employeeService}
 * 
 * @author n.salaheldeen
 *
 */
@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/employees")
public class EmployeeManagement {

	@Autowired
	EmployeeService employeeService;

	Logger logger = LoggerFactory.getLogger(EmployeeManagement.class);

	@GetMapping("/fetchAll")
	public Page<Employee> getAllEmployees(Pageable pageable) {

		return employeeService.getAllEmployees(pageable);

	}

	@GetMapping("/fetch/{employeeId}")
	public ResponseEntity<?> getEmployee(@PathVariable Integer employeeId) {

		Employee emp = employeeService.getEmployee(employeeId);
		if (emp == null) {
			return new ResponseEntity<String>("EmployeeId " + employeeId + " not found", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Employee>(emp, HttpStatus.OK);

	}

	@PostMapping("/add")
	public ResponseEntity<?> addEmployee(@RequestBody @Valid Employee employee, BindingResult bindingResult) {

		// server side validation in case of direct API call
		if (bindingResult.hasErrors()) {
			logger.info(bindingResult.getAllErrors().toString());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		try {
			Employee addedEmp = employeeService.addEmployee(employee);
			return new ResponseEntity<Employee>(addedEmp, HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return new ResponseEntity<String>("Department not found", HttpStatus.NOT_FOUND);
		}


	}

	@PutMapping("/update")
	public ResponseEntity<?> updateEmployee(@RequestBody @Valid Employee employee, BindingResult bindingResult) {

		// server side validation in case of direct API call
		if (bindingResult.hasErrors()) {
			logger.info(bindingResult.getAllErrors().toString());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		try {
			employeeService.updateEmployee(employee);
			return new ResponseEntity<String>("Updated", HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return new ResponseEntity<String>("Employee not found", HttpStatus.NOT_FOUND);
		}

	}

	@DeleteMapping("/delete/{employeeId}")
	public ResponseEntity<?> deleteEmployee(@PathVariable Integer employeeId) {

		try {
			employeeService.deleteEmployee(employeeId);
			return new ResponseEntity<String>("Deleted", HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return new ResponseEntity<String>("EmployeeId " + employeeId + " not found", HttpStatus.NOT_FOUND);
		}

	}
}
