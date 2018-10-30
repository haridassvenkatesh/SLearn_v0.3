import { Injectable } from '@angular/core';
//import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConstantService } from '../../../../constant.service';
import { HttpStatusService } from '../../../../http-status.service';

@Injectable()
export class TermService {

  constructor(public httpStatus: HttpStatusService, private http: HttpClient, private constantService: ConstantService) { }

  // For Fetching the TERM Details
  fetchTermDetails() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'institute/1/terms', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  submitTerm(term) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'institute/1/term', JSON.stringify(term), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For getting the Particular Term
  getTerm(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'term/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  getActiveTerm() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'institute/1', { headers: headers });
  }
  
  // For update the Term
  updateTerm(term, id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.put(this.constantService._base_url + 'term/' + id, JSON.stringify(term), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Deleting the Term
  deleteTerm(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.delete(this.constantService._base_url + 'term/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

}