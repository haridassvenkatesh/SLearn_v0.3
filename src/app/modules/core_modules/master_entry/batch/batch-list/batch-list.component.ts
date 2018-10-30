import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BatchService } from '../batch.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss']
})
export class BatchListComponent implements OnInit {

  data: any = [];
  mydata: any = [];
  counter: number;
  BatchId:any;
  Prefix: any;
  BatchName: any;
  StaffIncharge: any;

 /*  mydata: any = [
    {
      Prefix: '',
      BatchName: '',
      StaffIncharge: ''
    }
  ]; */

  constructor(private spinnerService: Ng4LoadingSpinnerService, private toastr: ToastsManager, vcr: ViewContainerRef, private batchService: BatchService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.fetchBatchDetails();
  }

 /*  tabledata(id:any,pre:any,bat:any,staff:any) {
    this.BatchId = id;
    this.Prefix=pre;
    this.BatchName=bat;
    this.StaffIncharge=staff;
  } */
  // Fetching the Batch Details
  fetchBatchDetails() {
    this.spinnerService.show();
    this.batchService.fetchBatchDetails()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          //this.data = response;
          this.data = (response || []).sort((a, b) => a.id < b.id ? -1 : 1)
/* 
          for (let dt = 0; dt < this.data.length; dt++) {
            this.mydata[dt] = new this.tabledata(this.data[dt].id,this.data[dt].idPrefix,this.data[dt].name,this.data[dt].inchargeStaff.repoId);
          }
          console.log(this.data);
          console.log(this.mydata); */
        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Data Request Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  // For Updating the Batch
  update(id) {
    this.router.navigate(['batch/add-batch', id])
  }

  // For deleting the Batch
  delete(id) {
    this.spinnerService.show();
    this.batchService.deleteBatch(id)
      .subscribe(response => {
        this.toastr.success('Data Deleted Successfully!', 'Success!');
        this.fetchBatchDetails();
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Data Deleted Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  gotoAddPage(addRouterLink) {
    this.router.navigate([addRouterLink]);
  }
}