import React, { Component } from 'react'
import EmployeeDataService from '../service/EmployeeDataService';


class EmployeeDetailsComponent extends Component {

  constructor(props) {

    super(props)

    this.state = {

      employeeId: this.props.match.params.id,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      hireDate: '',
      salary: '',
      department: {},
      departmentName: '',

    }
    this.onClick = this.onClick.bind(this)
  }


  componentDidMount() {

    EmployeeDataService.retrieveEmployee(this.state.employeeId)

      .then(response => this.setState({

        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        hireDate: response.data.hireDate,
        salary: response.data.salary,
        department: response.data.department,
        departmentName: response.data.department.departmentName

      }))


  }


  onClick() {

    this.props.history.push('/employee');

  }

  render() {

    let { firstName, lastName, email, employeeId, phoneNumber, hireDate, salary, departmentName } = this.state

    return (

      <div>

        <h3>Employee Details</h3>

        <div className="container">

          <fieldset className="form-group">
            <label>Id</label>
            <div className="form-control" >{employeeId}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>First Name</label>
            <div className="form-control" >{firstName}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>Last Name</label>
            <div className="form-control" >{lastName}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>Email</label>
            <div className="form-control" >{email}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>Phone Number</label>
            <div className="form-control" >{phoneNumber}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>Hire Date</label>
            <div className="form-control" >{hireDate}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>Salary</label>
            <div className="form-control" >{salary}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>Department</label>
            <div className="form-control" >{departmentName}</div>
          </fieldset>

          <button className="btn btn-success" onClick={this.onClick}>Back</button>
        </div>

      </div>

    )

  }

}

export default EmployeeDetailsComponent