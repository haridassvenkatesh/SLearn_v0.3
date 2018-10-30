import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DepartmentsService } from '../departments.service';
import { StaffsService } from '../../../people_management/staffs/staffs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrls: ['./add-departments.component.scss']
})
export class AddDepartmentsComponent implements OnInit {

  staffs: any = [];
  updateButton: Boolean = false;
  updateDataID: any;
  departmentID: any = -1;

  headStaff: any = {
    roleId: 0,
    repoId: "string",
    privilege: "User",
    id: -1,
    departmentId: -1
  }

  department: any = {
    name: '',
    idPrefix: ''
    // headStaff: this.headStaff
  }

  constructor(private spinnerService: Ng4LoadingSpinnerService, private toastr: ToastsManager, vcr: ViewContainerRef, private staffsService: StaffsService, private departmentService: DepartmentsService, private router: Router,
    private route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vcr);
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.getDepartment(params.id);
        this.updateDataID = params.id;
      }
    })

  }

  ngOnInit() {
    //    this.fetchStaffDetails();
  }

  // For submitting the department details
  submitDepartment(department) {
    this.spinnerService.show();
    this.departmentService.submitDepartmentDetails(department)
      .subscribe(response => {
        this.toastr.success('Department Added Successfully!', 'Success!');
        this.router.navigate(['departments/departments-list']);
        this.flushDepartment();
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Department Added Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  //fetching the staffs details
  fetchStaffDetails(id) {
    this.staffsService.fetchStaffDetails(id)
      .subscribe(response => {
        this.staffs = response;
      })
  }

  onChangeHeadStaff(id) {
    this.staffsService.getStaffs(id)
      .subscribe(response => {
        this.headStaff.repoId = response.repoId;
        this.headStaff.roleId = response.roleId;
        this.headStaff.privilege = response.privilege;
        this.headStaff.id = response.id;
        this.headStaff.departmentId = response.departmentId;
      })
  }
  // For fetching the Department details
  getDepartment(id) {
    this.spinnerService.show();
    this.departmentService.getDepartmentDetails(id)
      .subscribe(response => {
        this.department = response;
        this.fetchStaffDetails(id);
        if (this.department.headStaff != null) {
          this.headStaff.id = this.department.headStaff.id;
        }
        this.updateButton = true;
        this.spinnerService.hide();
      })
  }

  // for Update the Department details
  updateDepartment(department) {
    this.spinnerService.show();
    if (this.headStaff.id != -1) {
      this.department.headStaff = this.headStaff;
    }
    this.departmentService.updateDepartment(department, this.updateDataID)
      .subscribe(response => {
        this.toastr.success('Department Updated Successfully!', 'Success!');
        this.router.navigate(['departments/departments-list']);
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Department Update Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  flushDepartment() {
    this.headStaff = {
      roleId: 0,
      repoId: "string",
      privilege: "User",
      id: -1,
      departmentId: -1
    }

    this.department = {
      name: '',
      idPrefix: ''
    }
  }
}