import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BatchService } from '../batch.service';
import { StaffsService } from '../../../people_management/staffs/staffs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentsService } from '../../departments/departments.service';
import { TermService } from '../../term/term.service';
import { ToastsManager } from 'ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss']
})
export class AddBatchComponent implements OnInit {

  staffs: any = [];
  departments: any = [];
  terms: any = [];
  TermID: any = 1;
  departmentID: any = -1;
  batchList: any = [];
  position: any = -1;

  inchargeStaff: any = {
    roleId: 0,
    repoId: "string",
    privilege: "User",
    id: -1,
    departmentId: -1
  }

  batch: any = {
    name: '',
    description: '',
    idPrefix: '',
    inchargeStaff: this.inchargeStaff
  }

  institute: any = {
    activeTerm: {
      id: 1,
      name: 'string',
      type: 'Active'
    },
    id: 0,
    idPrefix: 'string',
    name: 'string'
  }

  updateDataID: any;
  updateButton: Boolean = false;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private toastr: ToastsManager, vcr: ViewContainerRef, private termService: TermService, private departmentService: DepartmentsService, private batchService: BatchService, private staffsService: StaffsService, private router: Router,
    private route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vcr);

    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.getBatchDetails(params.id);
        this.updateDataID = params.id;
      }
    })
  }

  ngOnInit() {
    this.getTerms();
    this.getCurrentTerm();
    this.getDepartments(); // for fetching the departments
  }

  // For submitting the Batch Details
  submitBatch(batch, TermID) {
    this.spinnerService.show();

    if (this.position == -1) {
      this.batchService.submitBatch(batch, TermID)
        .subscribe(response => {
          this.toastr.success('Batch Added Successfully!', 'Success!');
          this.router.navigate(['batch/batch-list']);
          this.spinnerService.hide();
        }, error => {
          console.log(error);
          this.toastr.error('Batch Added Failed!', 'Error!');
          this.spinnerService.hide();
        })
    }
    else {
      this.spinnerService.hide();
      this.toastr.info('Staff Already Assigned!', 'Info!');
    }
  }

  getBatchList() {
    this.batchService.fetchBatchDetails()
      .subscribe(response => {
        if (response.length < 1) {
        } else {
          this.batchList = response;
          this.position = this.batchList.findIndex(obj => obj.inchargeStaff.id == this.inchargeStaff.id);
        }
      }, error => {
        console.log(error);
      })
  }

  // For getting the TERMS
  getTerms() {
    this.termService.fetchTermDetails()
      .subscribe(response => {
        this.terms = (response || []).sort((a, b) => a.id < b.id ? -1 : 1)
      })
  }

  getCurrentTerm() {
    this.termService.getActiveTerm()
      .subscribe(response => {
        this.institute = response;
        this.TermID  = this.institute.activeTerm.id;
      })
  }
  getDepartments() {
    this.departmentService.fetchDepartmentDetails()
      .subscribe(response => {
        this.departments = (response || []).sort((a, b) => a.name < b.name ? -1 : 1)
      }, error => {
        console.log(error);
        this.toastr.error('Department fetching Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  onChangeDepartment(value) {
    this.position = -1;
    this.fetchStaffDetails(value);
  }

  onChangeHeadStaff(id) {
    this.staffsService.getStaffs(id)
      .subscribe(response => {
        this.inchargeStaff.repoId = response.repoId;
        this.inchargeStaff.roleId = response.roleId;
        this.inchargeStaff.privilege = response.privilege;
        this.inchargeStaff.id = response.id;
        this.inchargeStaff.departmentId = response.departmentId;
        this.getBatchList();
      })
  }
  // getting the batch details
  getBatchDetails(id) {
    this.spinnerService.show();
    this.batchService.getBatch(id)
      .subscribe(response => {
        this.batch.id = response.id;
        this.batch.name = response.name;
        this.batch.idPrefix = response.idPrefix;
        this.batch.description = '';
        if (response.inchargeStaff != null) {
          this.onChangeDepartment(response.inchargeStaff.departmentId);
          this.inchargeStaff.repoId = response.inchargeStaff.repoId
          this.inchargeStaff.roleId = response.inchargeStaff.roleId;
          this.inchargeStaff.privilege = response.inchargeStaff.privilege;
          this.inchargeStaff.id = response.inchargeStaff.id;
          this.inchargeStaff.departmentId = response.inchargeStaff.departmentId;
        }
        this.updateButton = true;
        this.spinnerService.hide();
      })
  }

  // For updating the batch details
  updateBatch(id) {
    this.spinnerService.show();
    console.log(this.batch);
    if (this.position == -1) {
      this.batchService.updateBatch(this.batch, id)
        .subscribe(response => {
          this.toastr.success('Batch Updated Successfully!', 'Success!');
          this.spinnerService.hide();
        }, error => {
          console.log(error);
          this.toastr.error('Batch Updated Failed!', 'Error!');
          this.spinnerService.hide();
        })
    }
    else {
      this.spinnerService.hide();
      this.toastr.info('Staff Already Assigned!', 'Info!');
    }
  }

  //fetching the staffs details
  fetchStaffDetails(id) {
    this.spinnerService.show();
    this.staffsService.fetchStaffDetails(id)
      .subscribe(response => {
        this.staffs = response;
        this.spinnerService.hide();
      })
  }

  flushBatch() {
    this.TermID = -1;
    this.departmentID = -1;
    this.position = -1;

    this.inchargeStaff = {
      roleId: 0,
      repoId: "string",
      privilege: "User",
      id: -1,
      departmentId: 0
    }

    this.batch = {
      name: '',
      description: '',
      idPrefix: '',
      inchargeStaff: this.inchargeStaff
    }
  }
}