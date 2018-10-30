import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConstantService } from '../../../../constant.service';
import { HttpStatusService } from '../../../../http-status.service';

@Injectable()
export class DepartmentsService {

  constructor(private httpStatus: HttpStatusService, private http: HttpClient, private constantService: ConstantService) {

  }

  // fetching the departments details for the Departments List
  fetchDepartmentDetails() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'institute/1/departments', { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  fetchDepartmentDetail(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'institute/' + id + '/departments', { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  // submiting the department details
  submitDepartmentDetails(department) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'institute/1/department', JSON.stringify(department), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Getting the Separate Departments Details 
  getDepartmentDetails(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'department/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For updating the department details
  updateDepartment(department, id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.put(this.constantService._base_url + 'department/' + id, JSON.stringify(department), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Deleting the Department
  deleteDepartment(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.delete(this.constantService._base_url + 'department/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

}