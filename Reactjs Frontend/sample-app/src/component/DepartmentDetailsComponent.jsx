import React, { Component } from 'react'
import DepartmentDataService from '../service/DepartmentDataService';


class DepartmentDetailsComponent extends Component {

  constructor(props) {

    super(props)

    this.state = {

      departmentId: this.props.match.params.id,
      departmentName: '',
      managerId: ''   

    }
    this.onClick = this.onClick.bind(this)
  }


  componentDidMount() {

    DepartmentDataService.retrieveDepartment(this.state.departmentId)

      .then(response => this.setState({

        departmentName: response.data.departmentName,
        managerId: response.data.managerId,

      }))


  }


  onClick() {

    this.props.history.push('/department');

  }

  render() {

    let { departmentId, departmentName, managerId } = this.state

    return (

      <div>

        <h3>Department Details</h3>

        <div className="container">

          <fieldset className="form-group">
            <label>Id</label>
            <div className="form-control" >{departmentId}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>Department Name</label>
            <div className="form-control" >{departmentName}</div>
          </fieldset>

          <fieldset className="form-group">
            <label>Manager Id</label>
            <div className="form-control" >{managerId}</div>
          </fieldset>         

          <button className="btn btn-success" onClick={this.onClick}>Back</button>
        </div>

      </div>

    )

  }

}

export default DepartmentDetailsComponent