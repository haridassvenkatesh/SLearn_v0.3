import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConstantService } from '../../../../constant.service';
import { Observable } from 'rxjs/Rx';
import { HttpStatusService } from '../../../../http-status.service';

@Injectable()
export class StaffsService {

  constructor(private httpStatus: HttpStatusService, public http: HttpClient, public constantService: ConstantService) {

  }

  // fetching the staffs for the Staffs List
  fetchStaffDetails(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'department/' + id + '/staff', { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  // For adding the staff Details
  submitStaffs(staffs, departmentid): Promise<any> {
    /*     const array: any = {
          'userInfo': staffs,
        }; */
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'department/' + departmentid + '/staff', JSON.stringify(staffs), { headers: headers })
      .toPromise()
      .then((response) => response);
    /*       .catch((error: any) => {
            return this.httpStatus.errorStatus(error)
          }); */
  }

  getUserRepo(id): Observable<any> {
    let headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken') });
    return this.http.get('http://52.15.210.240:9080/admin/user/' + id, { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }
  createUserRepo(userdetails): Promise<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken') });
    return this.http.post('http://52.15.210.240:9080/admin/user', JSON.stringify(userdetails), { headers: headers })
      .toPromise()
      .then((response) => response);
  }

  updateUserRepo(userdetails, id): Promise<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken') });
    return this.http.post('http://52.15.210.240:9080/admin/user/' + id, JSON.stringify(userdetails), { headers: headers })
      .toPromise()
      .then((response) => response);
  }

  // For updating the Staffs
  updateStaffs(staffs, id) {
    /*    const array: any = {
         'userInfo': staffs,
       }; */
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.put(this.constantService._base_url + 'Staff/' + id, JSON.stringify(staffs), { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  // For updating Student Leave Request
  updateLeaveRequest(leaveRequest, id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.put(this.constantService._base_url + 'Staff/' + id + '/Requests', JSON.stringify(leaveRequest), { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Deleting the Staffs
  deleteStaffs(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.delete(this.constantService._base_url + 'Staff/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
  // Staff Taking Attendance

  staffStudentAttendance(id): Observable<any> {
    let headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'batch/' + id + '/Student', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  addStudentAttendance(batch, attDate, session, body): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'batch/' + batch + '/Attendance/' + attDate + '/' + session, JSON.stringify(body), { headers: headers })
      .toPromise()
      .then((response) => response);
  }
  // for get the particular staff details
  getStaffs(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Staff/' + id, { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  // for post the Leave Request.
  submitLeaveRequest(array) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'Staff/' + this.constantService.getCookie('UserId') + '/Requests', JSON.stringify(array), { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  /*** HARI CODE ***/

  // STAFF ATTENDANCE
  StaffAttendance() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Staff/' + this.constantService.getCookie('UserId') + '/AttendanceSummary', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  getStudentAttendance(batch, attDate, session) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'batch/' + batch + '/Attendance/' + attDate + '/' + session, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
  // STAFF SCHEDULE
  staffSchedule() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Staff/' + this.constantService.getCookie('UserId') + '/schedule', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
  // STAFF ASSIGNED REQUEST
  assignedRequest() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Staff/' + this.constantService.getCookie('UserId') + '/AssignedRequests', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // STAFF EVENTS
  staffEvents() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Staff/' + this.constantService.getCookie('UserId') + '/EventInstance', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
}