import { Injectable } from '@angular/core';
//import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConstantService } from '../../../../constant.service';
import { HttpStatusService } from '../../../../http-status.service';

@Injectable()
export class EventsService {

  constructor(private httpStatus: HttpStatusService, private http: HttpClient, private constantService: ConstantService) { }

  // For Fetching the All the Events from the Instuitute
  fetchEvents() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'institute/1/event', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Submitting the new Events
  submitEvents(events) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'institute/1/event', JSON.stringify(events), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Getting the Single and Separate Event
  getEvent(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'Event/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Deleting the Events
  deleteEvent(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.delete(this.constantService._base_url + 'Event/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
}