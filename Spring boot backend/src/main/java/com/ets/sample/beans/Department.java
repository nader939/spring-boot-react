package com.ets.sample.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Departments")
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dep_seq")	
	@SequenceGenerator(name = "dep_seq", sequenceName = "dep_seq", allocationSize = 1, initialValue = 1)
	Integer departmentId;

	String departmentName;
	Integer managerId;

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public Integer getManagerId() {
		return managerId;
	}

	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}

	@Override
	public String toString() {
		return "Department [departmentId=" + departmentId + ", departmentName=" + departmentName + ", managerId="
				+ managerId + "]";
	}

}
