import { Injectable } from '@angular/core';
//import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConstantService } from '../../../../constant.service';
import { Observable } from 'rxjs/Rx';
import { HttpStatusService } from '../../../../http-status.service';

@Injectable()
export class TimeTableService {
  constructor(private httpStatus: HttpStatusService, public http: HttpClient, public constantService: ConstantService) {
  }

  resetSingleTT(batchID) {
    const array: any = {
      'batchIds': [
        batchID
      ],
      'constraints': [
        {
          'priority': 'Hard',
          'name': 'ScheduleConflict'
        }
      ]
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.put(this.constantService._base_url + 'TTGenerator/1/reset', JSON.stringify(array), { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  /** MANUAL TIME TABLE **/
  fetchcourse_tt(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'batch/' + id + '/Course', { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  fetchTT(batchID) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'batch/' + batchID + '/schedule')
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }
  // For Generating TimeTable Automatically using Constraints
  submitTTConstraints(batchIds, constraints) {
    const array: any = {
      'batchIds': batchIds,
      'constraints': constraints
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'TTGenerator/1', JSON.stringify(array), { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }

  tt_add(manual_fn_tt, id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.put(this.constantService._base_url + 'batch/' + id + '/schedule', JSON.stringify(manual_fn_tt), { headers: headers })
      .catch((error: any) => {
        return this.httpStatus.errorStatus(error)
      });
  }
}