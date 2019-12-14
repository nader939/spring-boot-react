import React, { Component } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';

import DepartmentDataService from '../service/DepartmentDataService';


class DepartmentComponent extends Component {

  constructor(props) {

    super(props)

    this.state = {

      departmentId: this.props.match.params.id,
      departmentName: '',
      managerId: 0,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }


  componentDidMount() {

    if (this.state.departmentId == -1) {

      return

    }

    DepartmentDataService.retrieveDepartment(this.state.departmentId)

      .then(response => this.setState({

        departmentName: response.data.departmentName,
        managerId: response.data.managerId,

      }))

  }

  validate(values) {
    let errors = {}

    if (!values.departmentName) {
      errors.departmentName = 'Enter a Department Name'
    } 
    
    if (!values.managerId) {
      errors.managerId = 'Enter Manager'
    } else if (values.managerId <= 0) {
      errors.managerId = 'Manager must be greater than zero'
    }
    
    return errors

  }

  onSubmit(values) {


    if (this.state.departmentId == -1) {
      DepartmentDataService.createDepartment(values)

        .then(() => this.props.history.push('/department'))

    } else {
      DepartmentDataService.updateDepartment(values)

        .then(() => this.props.history.push('/department'))

    }

  }

  render() {

    let { departmentId, departmentName, managerId } = this.state

    return (

      <div>

        <h3>Department</h3>

        <div className="container">

          <Formik

            initialValues={{ departmentId, departmentName, managerId }}
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
                    <Field className="form-control" type="text" name="departmentId" disabled />
                  </fieldset>

                  <ErrorMessage name="departmentName" component="div" className="alert alert-warning" />
                  <fieldset className="form-group">
                    <label>Department Name</label>
                    <Field className="form-control" type="text" name="departmentName" />
                  </fieldset>                 

                  <ErrorMessage name="managerId" component="div" className="alert alert-warning" />
                  <fieldset className="form-group">
                    <label>Manager</label>
                    <Field className="form-control" type="number" name="managerId" />
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

export default DepartmentComponent