import React, { Component } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';

import EmployeeDataService from '../service/EmployeeDataService';
import DepartmentDataService from '../service/DepartmentDataService';


class EmployeeComponent extends Component {

  constructor(props) {

    super(props)

    this.state = {

      employeeId: this.props.match.params.id,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      hireDate: '',
      salary: 0,
      department: {},
      departmentId: -1,
      departmentOptions: []

    }
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentWillMount() {

    DepartmentDataService.retrieveAllDepartments()

      .then(response => this.setState({

        departmentOptions: response.data.content,
        departmentId: response.data.content[0]? response.data.content[0].departmentId: -1

      }))
  }

  componentDidMount() {

    console.log(this.state.employeeId)
    // eslint-disable-next-line

    if (this.state.employeeId == -1) {

      return

    }

    EmployeeDataService.retrieveEmployee(this.state.employeeId)

      .then(response => this.setState({

        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        hireDate: response.data.hireDate,
        salary: response.data.salary,
        department: response.data.department,
        departmentId: response.data.department.departmentId

      }))


  }
  validate(values) {
    let errors = {}
    if (!values.firstName) {
      errors.firstName = 'Enter a First Name'
    } else if (values.firstName.length <= 2) {
      errors.firstName = 'Enter atleast 3 Characters in First Name'
    } 
    if (!values.lastName) {
      errors.lastName = 'Enter a Last Name'
    } else if (values.lastName.length <= 2) {
      errors.lastName = 'Enter at least 3 Characters in Last Name'
    }
    if (!values.salary) {
      errors.salary = 'Enter Salary'
    } else if(!/^\d{1,}(\.\d{0,4})?$/i.test(values.salary)){
      errors.salary = 'Invalid Salary format'
    } else if (values.salary <= 0) {
      errors.salary = 'Salary must be greater than zero'
    }

    if (!/^[0-9-]*$/i.test(values.phoneNumber)) {
      errors.phoneNumber = 'Invalid Phone Number';
    }
    return errors

  }

  onSubmit(values) {
    console.log(values);
    values.department = { departmentId: values.departmentId }
    console.log(this.state.employeeId);

    if (this.state.employeeId == -1) {
      EmployeeDataService.createEmployee(values)

        .then(() => this.props.history.push('/employee'))

    } else {
      EmployeeDataService.updateEmployee(values)

        .then(() => this.props.history.push('/employee'))

    }

  }

  render() {

    let { firstName, lastName, email, employeeId, phoneNumber, hireDate, salary, department, departmentId, departmentOptions } = this.state
    return (

      <div>

        <h3>Employee</h3>

        <div className="container">

          <Formik

            initialValues={{ employeeId, firstName, lastName, email, phoneNumber, hireDate, salary, departmentId }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >

            {

              (props) => (

                <Form>
                  
                  <fieldset className="form-group">
                    <label>Id</label>
                    <Field className="form-control" type="text" name="employeeId" disabled />
                  </fieldset>

                  <ErrorMessage name="firstName" component="div" className="alert alert-warning" />
                  <fieldset className="form-group">
                    <label>First Name</label>
                    <Field className="form-control" type="text" name="firstName" />
                  </fieldset>

                  <ErrorMessage name="lastName" component="div" className="alert alert-warning" />
                  <fieldset className="form-group">
                    <label>Last Name</label>
                    <Field className="form-control" type="text" name="lastName" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Email</label>
                    <Field className="form-control" type="email" name="email" />
                  </fieldset>

                  <ErrorMessage name="phoneNumber" component="div" className="alert alert-warning" />
                  <fieldset className="form-group">
                    <label>Phone Number</label>
                    <Field className="form-control" type="text" name="phoneNumber" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Hire Date</label>
                    <Field className="form-control" type="date" name="hireDate" />
                  </fieldset>

                  <ErrorMessage name="salary" component="div" className="alert alert-warning" />
                  <fieldset className="form-group">
                    <label>Salary</label>
                    <Field className="form-control" type="text" name="salary" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Department</label>
                    <Field
                      name="departmentId"
                      className="form-control"
                      component="select"
                    >
                      {departmentOptions.map(

                        option => (
                          <option key={option.departmentId} value={option.departmentId}>{option.departmentName}</option >
                        )
                      )}
                    </Field>
                  </fieldset>

                  <button className="btn btn-success" type="submit">Save</button>

                </Form>

              )

            }

          </Formik>

        </div>

      </div>

    )

  }

}

export default EmployeeComponent