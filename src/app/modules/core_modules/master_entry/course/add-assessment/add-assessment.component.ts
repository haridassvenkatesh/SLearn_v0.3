import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from '../../batch/batch.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { CourseService } from '../course.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { frLocale } from 'ngx-bootstrap';
import { ConstantService } from 'app/constant.service';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.scss']
})
export class AddAssessmentComponent implements OnInit {

  // Date Picker

  date: Date;
  options: DatepickerOptions = {
    minYear: 2018,
    maxYear: 2050,
    displayFormat: 'DD-MM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    // barTitleFormat: 'MMMM YYYY',
    // dayNamesFormat: 'dd',
    //   firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(Date.now()),
    //   minDate: new Date(Date.now()), // Minimal selectable date
    //   maxDate: new Date(Date.now()),  // Maximal selectable date
    //   barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    //   addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    //   addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false,
  };


  assessment: any =
    {
      name: "",
      description: "",
      type: "Activity",
      totalScore: "",
      creditWeight: "",
      beginTimestamp: "",
      endTimestamp: ""
    }

  courses: any = [];
  assessmentType: any = [];
  typeID: any = -1;
  typeName: any = "";
  updateButton: Boolean = false;
  batchs: any = [];
  updateDataID: any;
  BatchID: any = -1;
  CourseID: any = -1;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private toastr: ToastsManager, vcr: ViewContainerRef, private constantService: ConstantService, private router: Router, private batchService: BatchService, private courseService: CourseService) {
    this.toastr.setRootViewContainerRef(vcr);
    /*     this.route.params.subscribe(params => {
          if (params.id > 0) {
            this.getCourse(params.id);
            this.updateDataID = params.id;
          }
          if(params.batchid>0){
            this.BatchID = params.batchid;
          }
        }) */
  }

  ngOnInit() {
    this.fetchBatchDetails();
    this.getAssessmentType();
    console.log(Date.now());
  }

  onChangeCourse(id) {
    this.courseService.getCourseDetails(id)
      .subscribe(response => {
        this.CourseID = response.id;
      })
  }

  onChangeType(value) {
    this.typeName = value;
  }

  getAssessmentType() {
    this.constantService.getAssessmentType()
      .subscribe(response => {
        this.assessmentType = response;
      })
  }
  // Fetching the Batch Details
  fetchBatchDetails() {
    this.batchService.fetchBatchDetails()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Batch Not Available!', 'Info!');
        } else {
          this.batchs = response;
          console.log(this.batchs);
        }
      })
  }

  onChangeBatch(id) {
    this.courseService.fetchCourseDetail(id)
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Course Not Available!', 'Info!');
        } else {
          this.courses = response;
        }
      })
  }

  submitAssessment() {
    this.assessment.type = this.typeName;
    this.assessment.beginTimestamp += 'T09:00:00.000Z';
    this.assessment.endTimestamp += 'T11:59:59.000Z';

    this.spinnerService.show();
    this.courseService.submitAssessment(this.assessment, this.CourseID)
      .subscribe(() => {
          this.toastr.success('Assessment Created!', 'Success!');
          this.flushAssessment();
          this.spinnerService.hide();
          this.router.navigate(['course/course-list']);
        }, error => {
        console.log(error);
        this.flushAssessment();
        this.toastr.error('Creation Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  updateAssessment(assessment) {
    this.spinnerService.show();
    this.courseService.updateAssessment(assessment, this.updateDataID)
      .subscribe(() => {
          this.toastr.success('Assessment Updated!', 'Success!');
          this.spinnerService.hide();
          this.router.navigate(['course/course-list']);
        }, error => {
        console.log(error);
        this.toastr.error('Assessment Update Failed!', 'Error!');
        this.spinnerService.hide();
      })
  }

  getCourse(id) {
    this.courseService.getCourseDetails(id)
      .subscribe(response => {
        console.log(response);
      })
  }

  flushAssessment() {
    this.assessment =
      {
        name: "",
        description: "",
        type: "Activity",
        totalScore: "",
        creditWeight: "",
        beginTimestamp: "",
        endTimestamp: ""
      }

    this.BatchID = -1;
    this.CourseID = -1;
    this.typeID = -1;
    this.typeName = "";
  }

}
