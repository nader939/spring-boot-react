import axios from 'axios'


const HOME_API_URL = 'http://localhost:9090'

const EMPLOYEE_API_URL = `${HOME_API_URL}/employees`

class EmployeeDataService {

    retrieveAllEmployees(page) {

        return axios.get(`${EMPLOYEE_API_URL}/fetchAll?page=${page-1}&size=5`);
    }
    retrieveEmployee(id) {

        return axios.get(`${EMPLOYEE_API_URL}/fetch/${id}`);
    }

    updateEmployee(employee) {

        return axios.put(`${EMPLOYEE_API_URL}/update`, employee);
  
    }
  
    createEmployee( employee) {
  
        return axios.post(`${EMPLOYEE_API_URL}/add/`, employee);
  
    }

    deleteEmployee(id) {
    
        return axios.delete(`${EMPLOYEE_API_URL}/delete/${id}`);
    }

}

export default new EmployeeDataService()