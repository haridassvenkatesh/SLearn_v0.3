import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StaffsService } from '../staffs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';
import { DateService } from '../../../../../date.service';
import { DepartmentsService } from '../../../master_entry/departments/departments.service';

@Component({
  selector: 'app-add-staffs',
  templateUrl: './add-staffs.component.html',
  styleUrls: ['./add-staffs.component.scss']
})
export class AddStaffsComponent implements OnInit {

  /*   staffs: any = {
      firstName: '',
      lastName: '',
      doj: '',
      dob: '',
      mobile: 0,
      email: ''
    } */

  staffs: any = {
    repoId: "string",
    privilege: "User",
    status: "Active",
    departmentId: -1
  }

  userInfo: any = {
    groupId: 1,
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: 0,
    pwd: 'pass123',
    role: 'User'
  }

  updateButton: Boolean = false;
  updateDataID: any;

  departmentID: any = '-1';
  selection: any;

  constructor(private departmentService: DepartmentsService, private dateService: DateService, private spinnerService: Ng4LoadingSpinnerService, private toastr: ToastsManager, vcr: ViewContainerRef, private staffsService: StaffsService,
    private router: Router,
    private route: ActivatedRoute) {

    this.toastr.setRootViewContainerRef(vcr);

    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.getStaffs(params.id);
        this.updateDataID = params.id;
      }
    })
  }

  ngOnInit() {
    this.getDepartments();
  }

  submitStaffs(userdetails) {
    /*  this.spinnerService.show();
 
     this.staffs.dob = new DatePipe('en-US').transform(this.staffs.dob, 'dd-MM-yyyy');
     this.staffs.doj = new DatePipe('en-US').transform(this.staffs.doj, 'dd-MM-yyyy');
 
     this.staffsService.submitStaffs(staffs, this.departmentID)
       .subscribe(response => {
         this.toastr.success('Data Added Successfully!', 'Success!');
         this.flushStaff();
         this.spinnerService.hide();
       }, error => {
         console.log(error);
         this.toastr.error('Data Added Failed!', 'Error!');
         this.spinnerService.hide();
       }) */

    this.spinnerService.show();
    this.staffsService.createUserRepo(userdetails)
      .then(response => {
        this.staffs.repoId=response.login;
        this.staffs.departmentId = this.departmentID;
        this.createStaff(this.staffs)
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      })
  }

  createStaff(staff) {
    this.staffsService.submitStaffs(this.staffs, this.departmentID)
      .then(response => {
        this.toastr.success('Staff Added Successfully!', 'Success!');
        console.log(response);
        this.flushStaff();
        this.spinnerService.hide();
      },
        error => {
          console.log(error);
          this.toastr.error('Creation Failed!', 'Error!');
          this.spinnerService.hide();
        })
  }
  updateDetails(userdetails)
  {
    this.spinnerService.show();
    this.staffsService.updateUserRepo(userdetails, this.staffs.repoId)
      .then(response => {
        this.staffs.departmentId = this.departmentID;
        this.updateStaffs(this.staffs);
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      })
  }
  updateStaffs(staffs) {
    
  //  this.staffs.dob = new DatePipe('en-US').transform(this.staffs.dob, 'dd-MM-yyyy');
   //  this.staffs.doj = new DatePipe('en-US').transform(this.staffs.doj, 'dd-MM-yyyy');

    this.staffsService.updateStaffs(staffs, this.updateDataID)
      .subscribe(response => {
        this.toastr.success('Staff Added Successfully!', 'Success!');
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('Update Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  getDepartments() {
    this.departmentService.fetchDepartmentDetails()
      .subscribe(response => {
        this.selection = response;
      })
  }

  getStaffs(id) {
    this.spinnerService.show();
    this.staffsService.getStaffs(id)
      .subscribe(response => {
        this.staffs.roleId = response.roleId;
        this.staffs.repoId = response.repoId;
        this.staffs.privilege = response.privilege;
        this.staffs.status = response.status;
        this.staffs.id = response.id;
        this.staffs.departmentId = response.departmentId;
        this.getStaffInfo(this.staffs.repoId);
        this.updateButton = true;
        this.spinnerService.hide();
      })
  }

  getStaffInfo(login)
  {
    this.staffsService.getUserRepo(login)
    .subscribe(response => {
      this.userInfo.login = response.login;
      this.userInfo.firstName = response.firstName;
      this.userInfo.lastName = response.lastName;
      this.userInfo.mobileNumber = response.mobileNumber;
      this.userInfo.email = response.email;

    }, error => {
      console.log(error);
    })

  }
  flushStaff() {
    this.staffs = {
      repoId: "string",
      privilege: "User",
      status: "Active",
      departmentId: -1
    }

    this.userInfo = {
      groupId: 1,
      login: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      pwd: '',
      role: 'User'
    }

    this.departmentID = -1;
  }
}