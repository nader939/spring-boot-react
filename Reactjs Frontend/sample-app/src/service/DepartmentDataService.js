import axios from 'axios'


const HOME_API_URL = 'http://localhost:9090'

const DEPARTMENT_API_URL = `${HOME_API_URL}/departments`

class DepartmentDataService {

    retrieveAllDepartments() {
        return axios.get(`${DEPARTMENT_API_URL}/fetchAll`);
    }

    retrieveDepartmentsPage(page) {
        return axios.get(`${DEPARTMENT_API_URL}/fetchAll?page=${page-1}&size=5`);
    }

    retrieveDepartment(id) {

        return axios.get(`${DEPARTMENT_API_URL}/fetch/${id}`);
    }

    updateDepartment(department) {

        return axios.put(`${DEPARTMENT_API_URL}/update`, department);
  
    }
  
    createDepartment( department) {
  
        return axios.post(`${DEPARTMENT_API_URL}/add/`, department);
  
    }

    deleteDepartment(id) {
    
        return axios.delete(`${DEPARTMENT_API_URL}/delete/${id}`);
    }

}

export default new DepartmentDataService()