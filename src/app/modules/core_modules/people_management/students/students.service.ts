import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpStatusService } from 'app/http-status.service';
import { ConstantService } from 'app/constant.service';

@Injectable()
export class StudentsService {

  constructor(private httpStatus: HttpStatusService, private constantService: ConstantService, private http: HttpClient) { }

  fetchStudentsDetail(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'batch/' + id + '/Student', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // Submiting the students details
  submitStudents(students, guardians, id) {
    const array: any = {
      'userInfo': students,
      'guardians': guardians
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'batch/' + id + '/Student', JSON.stringify(array), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // fetching the single student details
  fetchStudent(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Student/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  getStudentBatch() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Student/' + this.constantService.getCookie('UserId'), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  getCourseList(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'batch/' + id + '/Course', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
  getUserRepo(id): Observable<any> {
    let headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken') });
    return this.http.get('http://52.15.210.240:9080/admin/user/' + id, { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }
  // updating the Students Details
  updateStudents(students, guardians, id) {
    const array: any = {
      'userInfo': students,
      'guardians': guardians
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.put(this.constantService._base_url + 'Student/' + id, JSON.stringify(array), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  deleteStudents(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.delete(this.constantService._base_url + 'Student/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // for post the Leave Request.
  submitLeaveRequest(array) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'Student/' + this.constantService.getCookie('UserId') + '/LeaveRequest', JSON.stringify(array), { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }


  /**** HARI CODE  ****/

  // FOR FETCHING ATTENDANCE

  fetchStudentsAttendance() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Student/' + this.constantService.getCookie('UserId') + '/AttendanceSummary', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }


  // STUDENTS LEAVE REQUEST
  LeaveRequest() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Student/' + this.constantService.getCookie('UserId') + '/LeaveRequest', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // STUDENTS EVENTS
  StudentEvents() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Student/' + this.constantService.getCookie('UserId') + '/EventInstance', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // STUDENTS ASSESSMENTS
  StudentAssessment(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Student/' + this.constantService.getCookie('UserId') + '/AssessmentByCourse/'+ id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // STUDENTS SCHEDULE
  studentSchedule(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'batch/' + id + '/schedule', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
}