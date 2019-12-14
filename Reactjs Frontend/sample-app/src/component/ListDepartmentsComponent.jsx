import React, { Component } from 'react'
import DepartmentDataService from '../service/DepartmentDataService';
import Pagination from "react-js-pagination";
class ListDepartmentsComponent extends Component {

    constructor(props) {

        super(props)
        this.state = {

            departments: [],
            message: null,

            activePage: 1,
            totalPages: null,
            itemsCountPerPage: null,
            totalItemsCount: null

        }
        this.refreshDepartments = this.refreshDepartments.bind(this)
        this.viewDepartmentClicked = this.viewDepartmentClicked.bind(this)
        this.addDepartmentClicked = this.addDepartmentClicked.bind(this)
        this.updateDepartmentClicked = this.updateDepartmentClicked.bind(this)
        this.deleteDepartmentClicked = this.deleteDepartmentClicked.bind(this)

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {

        this.refreshDepartments(this.state.activePage);

    }

    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber, message: null})
        this.refreshDepartments(pageNumber)

    }

    refreshDepartments(page) {

        DepartmentDataService.retrieveDepartmentsPage(page)

            .then(

                response => {

                    // console.log(response);
                    this.setState({ departments: response.data.content })

                    this.setState({ totalPages: response.data.totalPages })
                    this.setState({ totalItemsCount: response.data.totalElements })
                    this.setState({ itemsCountPerPage: response.data.size })
                }

            )

    }

    viewDepartmentClicked(id) {

        this.props.history.push(`/department/view/${id}`)

    }
    addDepartmentClicked() {

        this.props.history.push(`/department/-1`)

    }
    updateDepartmentClicked(id) {

        this.props.history.push(`/department/${id}`)

    }
    deleteDepartmentClicked(id) {

        DepartmentDataService.deleteDepartment(id)

            .then(

                response => {

                    this.setState({ message: `Delete of department ${id} Successful` })
                    this.refreshDepartments()

                }

            )
            .catch(
                error => {
                    if (error.response) {
                        this.setState({ message: error.response.data })
                    }
                }
            )
    }


    render() {

        return (

            <div className="container">

                <h3>All Departments</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">

                    <table className="table">

                        <thead>
                            <tr>

                                <th>Id</th>
                                <th>Department Name</th>
                                <th>View</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {

                                this.state.departments.map(

                                    department =>

                                        <tr key={department.departmentId}>

                                            <td>{department.departmentId}</td>
                                            <td>{department.departmentName}</td>
                                            <td><button className="btn btn-success" onClick={() => this.viewDepartmentClicked(department.departmentId)}>View</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.updateDepartmentClicked(department.departmentId)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteDepartmentClicked(department.departmentId)}>Delete</button></td>
                                        </tr>

                                )

                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addDepartmentClicked}>Add</button>
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

export default ListDepartmentsComponent