import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConstantService } from '../../../../constant.service';
import { HttpStatusService } from '../../../../http-status.service';

@Injectable()
export class FeesService {

  constructor(private httpStatus: HttpStatusService, private http: HttpClient, private constantService: ConstantService) { }

  fetchFees() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'group/1/feetype', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
  

  addFeeType(fees) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'group/1/feetype', JSON.stringify(fees), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  addFeeYear(fees) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'group/1/feeyear', JSON.stringify(fees), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  fetchFeeYear() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'group/1/feeyear', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  fetchSubGroup() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'group/1/subgroup', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
 

}
