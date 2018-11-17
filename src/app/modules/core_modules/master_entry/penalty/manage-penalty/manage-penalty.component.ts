import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { PenaltyService } from '../penalty.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BatchService } from '../../../master_entry/batch/batch.service';

@Component({
  selector: 'app-manage-penalty',
  templateUrl: './manage-penalty.component.html',
  styleUrls: ['./manage-penalty.component.scss']
})
export class ManagePenaltyComponent implements OnInit {

  constructor(public penaltyService: PenaltyService, private batchService: BatchService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef,
    private constantService: ConstantService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.getBatches();
    //this.getStudent();

  }

  selection: any = [];
  selection_student: any = [];
  penalty: any = [];

  getBatches() {
    this.batchService.fetchBatchDetails()
      .subscribe(response => {
        this.selection = response;
        console.log('selection', this.selection);
      })
  }

  getStudent(id) {
    this.penaltyService.fetcthStudent(id)
      .subscribe(response => {
        this.selection_student = response;
        console.log(this.selection_student);
      })
  }
  selectedBatch(id) {
    this.getStudent(id);
    console.log(id);
  }

  selectedRepoId(id){
    this.penaltyService.getPenalty(id)
    .subscribe(response => {
      
      this.penalty = response;
      console.log(this.penalty); 
    })
  }

 

}
