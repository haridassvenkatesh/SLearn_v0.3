import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConstantService } from '../../../../constant.service';
import { HttpStatusService } from '../../../../http-status.service';
@Injectable()
export class PenaltyService {

  constructor(private httpStatus: HttpStatusService, private http: HttpClient, private constantService: ConstantService) { }

  fetchPenalty() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'group/1/feetype', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
  

  // addPenaltyType(fees) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.post(this.constantService._base_url + 'group/1/feetype', JSON.stringify(fees), { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }

  // addPenaltyYear(fees) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.post(this.constantService._base_url + 'group/1/feeyear', JSON.stringify(fees), { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }

  fetchPenaltyYear() {
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'group/1/feeyear', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  // fetchSubGroup() {
  //   const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.get(this.constantService._base_url + 'group/1/subgroup', { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }


  /** DELETE FEE YEAR  **/
  // deletePenaltyYear(del_id){
  //   console.log(del_id);
  //   const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.delete(this.constantService._base_url + 'group/feeyear/' + del_id, { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }


  /** ADD SUB GROUP  **/
  // addSubGroup(fees) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.post(this.constantService._base_url + 'group/1/subgroup', JSON.stringify(fees), { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }

   /** ADD SUB GROUP  **/
<<<<<<< HEAD
  //  deleteSubGroup(del_id) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.delete(this.constantService._base_url + 'group/subgroup/' + del_id, { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }

  // managePenalty(){
  //   const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.get(this.constantService._base_url + 'group/subgroup/1/feemapping', { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }


  // addPenalty(fees){
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    // return this.http.post(this.constantService._base_url + 'group/1/subgroup', JSON.stringify(fees), { headers: headers })
    //   .catch((error: any) => {
    //     console.log(error);
    //     return this.httpStatus.errorStatus(error)
    //   });
  // }

  // addPenaltyTerm(feeTerm){
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.post(this.constantService._base_url + 'group/subgroup/1/feeterm', JSON.stringify(feeTerm), { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }

  // managePenaltyTerm(subgroup_id){
  //   const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
  //   return this.http.get(this.constantService._base_url + 'group/subgroup/'+ subgroup_id +'/feeterm', { headers: headers })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return this.httpStatus.errorStatus(error)
  //     });
  // }
=======
   deleteSubGroup(del_id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.delete(this.constantService._base_url + 'group/subgroup/' + del_id, { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  managePenalty(){
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'group/subgroup/1/feemapping', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }


  addPenalty(fees){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'group/1/subgroup', JSON.stringify(fees), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  addPenaltyTerm(feeTerm){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.post(this.constantService._base_url + 'group/subgroup/1/feeterm', JSON.stringify(feeTerm), { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }

  managePenaltyTerm(subgroup_id){
    const headers = new HttpHeaders({ 'AccessToken': this.constantService.getCookie('AccessToken'), 'UserId': this.constantService.getCookie('UserId') });
    return this.http.get(this.constantService._base_url + 'group/subgroup/'+ subgroup_id +'/feeterm', { headers: headers })
      .catch((error: any) => {
        console.log(error);
        return this.httpStatus.errorStatus(error)
      });
  }
>>>>>>> a0398d95a8857d8fd950222fb6f331e0e854d0d2

}
