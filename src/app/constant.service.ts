import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Constant } from './constant.interface';
import { LoggedIn } from './login.interface';
import { CookieService } from '../../node_modules/angular2-cookie/services/cookies.service';


@Injectable()
export class ConstantService {

  // public _base_url = 'http://52.15.179.93:8080/SLearn/rest/';
  public _base_url = 'http://52.15.179.93:8080/slearn_v0.3/rest/';

  constructor(private http: HttpClient, private _cookieService: CookieService) { }

  getAcademicTermType(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/AcademicTermType', { headers: headers });
  }

  getAssessmentType(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/AssessmentType', { headers: headers });
  }

  getAttendenceStatus(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/AttendenceStatus', { headers: headers });
  }

  getEntityLevel(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/EntityLevel', { headers: headers });
  }

  getEventCategory(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/EventCategory', { headers: headers });
  }

  getEventInstanceStatus(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/EventInstanceStatus', { headers: headers });
  }

  getEventType(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/EventType', { headers: headers });
  }

  getGuardianType(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/GuardianType', { headers: headers });
  }

  getLeaveType(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/LeaveType', { headers: headers });
  }

  getRequestStatus(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/RequestStatus', { headers: headers });
  }

  getRequestType(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/RequestType', { headers: headers });
  }

  getTTContraint(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/TTConstraint', { headers: headers });
  }

  getTTContraintPriority(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/TTConstraintPriority', { headers: headers });
  }

  getUserStatus(): Observable<Constant[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get<Constant[]>(this._base_url + 'Constants/UserStatus', { headers: headers });
  }


  // For Token and login
  getToken(username, password): Promise<any> {
    let body = {
      "login": username,
      "pwd": password,
      "groupId": 1
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://52.15.179.93:9080/token', JSON.stringify(body), { headers: headers })
      .toPromise()
      .then((response) => response)
      .catch((error: any) => {
        return this.errorStatus(error)
      });
  }

  /*   setToken(accessToken, userID) {
      return this.http.get(this._base_url + 'Test/setCookie/' + accessToken + '/' + userID)
        .map((response: Response) => { return response });
    } */

  getUserId(): Observable<LoggedIn[]> {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken') });
    //headers.append('Content-Type', 'application/json');
    //headers.append('AccessToken', this.getCookie('AccessToken'));
    return this.http.get<LoggedIn[]>(this._base_url + 'User/roles', { headers: headers })
      .catch((error: any) => {
        return this.errorStatus(error);
      });
  }

  getCookie(keyName: string) {
    return this._cookieService.get(keyName);
  }

  setCookie(key: string) {
    this._cookieService.put('AccessToken', key);
  }

  setCookieUser(key: string) {
    this._cookieService.put('UserId', key);
  }

  removeCookie() {
    this._cookieService.remove('AccessToken');
    this._cookieService.remove('UserId');
  }
  /** HARI CODE  **/
  // getLeaveRequest() {
  //   return this.http.get(this._base_url + '')
  //     .map((response: Response) => response.json());
  // }

  getInstituteName() {
    const headers = new HttpHeaders({ 'AccessToken': this.getCookie('AccessToken'), 'UserId': this.getCookie('UserId') });
    return this.http.get(this._base_url + 'institute/1', { headers: headers });
  }


  // Capturing the Status of the response
  // Success Status
  successStatus(response) {
    console.log(response);
    if (response) {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 200) {
        return response.json();
      } else {
        return response.json();
      }
    }
  }

  // Error Status
  errorStatus(error) {
    console.log(error);
    if (error.status === 500) {
      return Observable.throw(new Error(error.status));
    } else if (error.status === 400) {
      return Observable.throw(new Error(error.status));
    } else if (error.status === 409) {
      return Observable.throw(new Error(error.status));
    } else if (error.status === 406) {
      return Observable.throw(new Error(error.status));
    }
  }

}
