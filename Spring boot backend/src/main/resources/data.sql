insert into departments (department_name, manager_id, department_id) values ('Sample Department 1', 1, dep_seq.nextval), ('SampleDepartment 2', 2, dep_seq.nextval)

insert into employees (department_id, email, first_name, hire_date, last_name, phone_number, salary, employee_id) values (1, 'test@sample.com', 'Sample', sysdate,  'Name', 123456789, 20000, emp_seq.nextval)