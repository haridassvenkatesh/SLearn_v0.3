import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { PenaltyService } from '../penalty.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';
import { BatchService } from '../../../master_entry/batch/batch.service';



@Component({
  selector: 'app-add-penalty',
  templateUrl: './add-penalty.component.html',
  styleUrls: ['./add-penalty.component.scss']
})
export class AddPenaltyComponent implements OnInit {

  constructor(public penaltyService: PenaltyService, private batchService: BatchService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
    private constantService: ConstantService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  penaltyyear: any = [];
  penaltytype: any = [];
  penalty: any = {
    repoId: '',
    feeTypeId: {
      id: '-1'
    },
    feeMappingId: {
      id: '-1',
      instituteBatchId: '-1',
      feeTerm: {
        id: '-1',
        feeYearId: {
          id: '-1'
        }
      },
      feeType: {
        id: '-1'
      },
      feeAmount: ''
    },
    description: '',
    feeAmount: '',
    feePaid: '',
    feeCredit: ''
  }

  selection: any = [];
  selection_student: any = [];
  date: Date;
  options: DatepickerOptions = {
    minYear: 2010,
    maxYear: 2050,
    displayFormat: 'DD-MM-YYYY',
    locale: frLocale,
    placeholder: 'Click to select a date',
    fieldId: 'my-date-picker',
  };

  ngOnInit() {
    this.getPenaltyYear();
    this.getFeeType();
    this.getBatches();
  }
  getPenaltyYear() {
    this.spinnerService.show();
    this.penaltyService.fetchPenaltyYear()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          this.penaltyyear = response;
        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }

  getFeeType() {
    this.spinnerService.show();
    this.penaltyService.fetchPenalty()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          this.penaltytype = response;
        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }

  addPenalty(penalty) {
    console.log(penalty);
    //   this.spinnerService.show();
    //   this.penalty.effectiveDate = new DatePipe('en-IN').transform(this.penalty.effectiveDate, 'yyyy-MM-dd');
    //   this.penalty.endTimestamp = new DatePipe('en-IN').transform(this.penalty.expiryDate, 'yyyy-MM-dd');
    //   this.penalty.effectiveDate += 'T00:00:00.000Z';
    //   this.penalty.expiryDate += 'T23:59:59.000Z';
    //   console.log(penalty);
    //   this.penaltyService.addPenalty(penalty)
    //   // .subscribe(response => {
    //   //   this.toastr.success('Fees Added Successfully!', 'Success!');

    //   //   this.spinnerService.hide();
    //   // }, error => {
    //   //   console.log(error);
    //   //   this.toastr.error('Fees Added Failed!', 'Error!');
    //   //   this.spinnerService.hide();
    //   // })
  }


  getBatches() {
    this.batchService.fetchBatchDetails()
      .subscribe(response => {
        this.selection = response;
        //console.log('selection', this.selection);
      })
  }

  getStudent(id) {
    this.penaltyService.fetchStudent(id)
      .subscribe(response => {
        this.selection_student = response;
        //console.log(this.selection_student);
      })
  }
  selectedBatch(id) {
    this.getStudent(id);

  }



}
