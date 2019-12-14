import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ListEmployeesComponent from './ListEmployeesComponent';
import ListDepartmentsComponent from './ListDepartmentsComponent';
import EmployeeComponent from './EmployeeComponent';
import EmployeeDetailsComponent from './EmployeeDetailsComponent';
import DepartmentComponent from './DepartmentComponent';
import DepartmentDetailsComponent from './DepartmentDetailsComponent';
import NavBar from "./navbar";
import Home from "./Home";
import NotFound from "./NotFound";

class SampleApp extends Component {

    render() {

        return (
            <div>
                <Router>
                    <>
                        <NavBar />
                        <br/>
                        <Switch>

                            <Route path="/" exact component={Home} />

                            <Route path="/employee" exact component={ListEmployeesComponent} />
                            <Route path="/employee/view/:id" component={EmployeeDetailsComponent} />
                            <Route path="/employee/:id" component={EmployeeComponent} />

                            <Route path="/department" exact component={ListDepartmentsComponent} />
                            <Route path="/department/view/:id" component={DepartmentDetailsComponent} />
                            <Route path="/department/:id" component={DepartmentComponent} />
                            <Route path="/not-found" component={NotFound} />
                            <Redirect to="/not-found" />
                        </Switch>
                    </>
                </Router>                
            </div>
        )

    }

}

export default SampleApp