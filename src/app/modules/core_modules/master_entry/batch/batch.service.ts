import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConstantService } from 'app/constant.service';
import { HttpStatusService } from 'app/http-status.service';



@Injectable()
export class BatchService {

  constructor(private httpStatus: HttpStatusService, private http: HttpClient, private constantService: ConstantService) { }

  // Fetching the Batch details
  fetchBatchDetails() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'term/1/batch', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Submiting thr Batch Details
  submitBatch(batch, TermID) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'term/' + TermID + '/batch', JSON.stringify(batch), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For updating the Batch
  updateBatch(batch, id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.put(this.constantService._base_url + 'batch/' + id, JSON.stringify(batch), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // For Deleting the Batch
  deleteBatch(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.delete(this.constantService._base_url + 'batch/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // for getting the separate batch
  getBatch(id) {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'batch/' + id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  

}