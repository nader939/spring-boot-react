import React, { Component } from 'react'
import EmployeeDataService from '../service/EmployeeDataService';
import Pagination from "react-js-pagination";
class ListEmployeesComponent extends Component {

    constructor(props) {

        super(props)
        this.state = {

            employees: [],
            message: null,

            activePage: 1,
            totalPages: null,
            itemsCountPerPage: null,
            totalItemsCount: null

        }
        this.refreshEmployees = this.refreshEmployees.bind(this)
        this.viewEmployeeClicked = this.viewEmployeeClicked.bind(this)
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this)
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this)
        this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this)

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(pageNumber) {

        this.refreshEmployees(this.state.activePage);        

    }

    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber,  message: null })
        this.refreshEmployees(pageNumber)

    }

    refreshEmployees(page) {

        EmployeeDataService.retrieveAllEmployees(page)

            .then(

                response => {

                    // console.log(response);
                    this.setState({ employees: response.data.content })

                    this.setState({ totalPages: response.data.totalPages })
                    this.setState({ totalItemsCount: response.data.totalElements })
                    this.setState({ itemsCountPerPage: response.data.size })
                }

            )

    }

    viewEmployeeClicked(id) {

        this.props.history.push(`/employee/view/${id}`)
    
    }
    addEmployeeClicked() {

        this.props.history.push(`/employee/-1`)
    
    }
    updateEmployeeClicked(id) {
    
        this.props.history.push(`/employee/${id}`)
    
    }
    deleteEmployeeClicked(id) {

        EmployeeDataService.deleteEmployee(id)
    
            .then(
    
                response => {
    
                    this.setState({ message: `Delete of employee ${id} Successful` })
                    this.refreshEmployees()
    
                }
    
            )
    }
    
    
    render() {

        return (

            <div className="container">

                <h3>All Employees</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">

                    <table className="table">

                        <thead>
                            <tr>

                                <th>Id</th>
                                <th>First Name</th>                                
                                <th>Last Name</th>
                                <th>Department</th>                                                               
                                <th>View</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {

                                this.state.employees.map(

                                    employee =>

                                        <tr key={employee.employeeId}>

                                            <td>{employee.employeeId}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.department?employee.department.departmentName: ""}</td>
                                            <td><button className="btn btn-success" onClick={() => this.viewEmployeeClicked(employee.employeeId)}>View</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.updateEmployeeClicked(employee.employeeId)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteEmployeeClicked(employee.employeeId)}>Delete</button></td>
                                        </tr>

                                )

                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEmployeeClicked}>Add</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            hideNavigation
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={10}
                            itemClass='page-item'
                            linkClass='btn btn-light'
                            onChange={this.handlePageChange}
                        />
                    </div>
                </div>

            </div>

        )

    }

}

export default ListEmployeesComponent