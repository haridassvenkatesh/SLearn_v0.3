import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


/** FOR CAROUSEL **/
import { CarouselModule } from 'ngx-bootstrap/carousel';

/** FOR CALANDER  **/
import { ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { CalendarEvent, CalendarUtils, CalendarEventTimesChangedEvent } from 'angular-calendar';
import {
    isSameMonth,
    isSameDay,
    getMonth,
    startOfMonth,
    startOfWeek,
    startOfDay,
    endOfMonth,
    endOfWeek,
    endOfDay,
    subWeeks,
    addWeeks
} from 'date-fns';

import { RRule } from 'rrule';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';
import { Chart } from 'angular-highcharts';
import { Subject } from 'rxjs/Subject';
import { ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce } from 'ng-animate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConstantService } from '../../../../../constant.service';

interface Film {
    id: number;
    title: string;
    release_date: string;
}

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.scss'],
    animations: [
        trigger('bounce', [transition('* => *', useAnimation(bounce))])
    ],
})
export class StudentDashboardComponent implements OnInit {

    // studentsService: any;
    atten: any = [];
    leavereq: any = [];
    stuevents: any = [];
    stutestrep: any = [];

    constantService: any;
    eventService: any;

    // TIMETABLE
    GeneratedSchedule: any = [];
    CourseList: any = [];
    Monday: any = [];
    Tuesday: any = [];
    Wednesday: any = [];
    Thursday: any = [];
    Friday: any = [];
    StudentBatchId: any;

    present: any = 5;


    id = 'chart';
    width = 200;
    height = 260;
    type = 'pie';
    dataFormat = 'json';

    AbsoluteImageUrl: any;
    dataSource: any;
    options: any;
    chart: any;
    add: any;
    rate: any;
    eventPaginate: number = 1;
    requestPaginate: number = 1;
    assessmentPaginate: number = 1;

    name: string;
    //  view: String = 'month';
    viewDate: Date = new Date();
    bounce: any;

    performancegraph: any;
    //student_id = 1;

    // FOR MODALS
    public imagePath: string;
    public myModal;
    public largeModal;
    public smallModal;
    public primaryModal;
    public successModal;
    public warningModal;
    public dangerModal;
    public infoModal;

    constructor(private studentsService: StudentsService, private spinnerService: Ng4LoadingSpinnerService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef, private router: Router) {
        this.toastr.setRootViewContainerRef(vcr);
        this.attendance();
    }

    ngOnInit() {
        this.leaverequest();
        this.events();
        this.getBatchId();
    }


    /*** STUDENTS ATTENDANCE  ***/
    attendance() {
        this.studentsService.fetchStudentsAttendance()
            .subscribe(response => {
                this.atten = response;
                //    console.log(this.atten.present);
                this.chart = new Chart({
                    chart: {
                        height: 300,
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        },
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false,
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 25,
                            dataLabels: {
                                enabled: false,
                                format: '{point.name}'
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Attendance',
                        data: [
                            ['Present', this.atten.present],
                            ['Absent', this.atten.absent],
                            ['Leave', this.atten.leave],
                            // ['totalCount', this.atten.totalCount]
                        ]
                    }]
                })
            }, error => {
                this.toastr.error('Error Occurred!', 'Error!');
            })
    }


    /*** LEAVE REQUEST  ***/
    leaverequest() {
        this.studentsService.LeaveRequest()
            .subscribe(response => {
                this.leavereq = response;
            }, error => {
                this.toastr.error('Error Occurred!', 'Error!');
            })
    }


    /*** EVENTS ***/
    events() {
        this.studentsService.StudentEvents()
            .subscribe(response => {
                this.stuevents = response;
            }, error => {
                this.toastr.error('Error Occurred!', 'Error!');
            })
            console.log(this.stuevents);
    }



    getBatchId() {
        this.studentsService.getStudentBatch()
            .subscribe(response => {
                this.StudentBatchId = response.batchId;
                this.getBatchCourse(this.StudentBatchId);
                this.classTimeTable(this.StudentBatchId);
            }, error => {
                this.toastr.error('Error Occurred!', 'Error!');
            })
    }

    getBatchCourse(id) {
        this.studentsService.getCourseList(id)
            .subscribe(response => {
                this.CourseList = response;
                this.getAssessment(this.CourseList);
            }, error => {
                this.toastr.error('Error Occurred!', 'Error!');
            })
    }

    getAssessment(courseList) {
        for (let i = 0; i < courseList.length; i++) {
            this.studentsService.StudentAssessment(courseList[i].id)
                .subscribe(response => {
                    for(let j=0;j<response.length;j++)
                    {
                        this.stutestrep.push(response[j])
                    }
                    //this.stutestrep = response;
                }, error => {
                    this.toastr.error('Error Occurred!', 'Error!');
                })
        }
        //console.log(this.stutestrep);
    }

    classTimeTable(batchid) {
        this.studentsService.studentSchedule(batchid)
            .subscribe(response => {
                this.GeneratedSchedule = response;
                this.Converting();
            }, error => {
                console.log(error);
            })
    }

    Converting() {
        for (let i = 0; i < 8; i++) {
            this.Monday.push(this.GeneratedSchedule[i]);
        }

        for (let i = 0; i < 8; i++) {
            this.GeneratedSchedule.splice(i, 1);
        }

        for (let i = 0; i < 8; i++) {
            this.Tuesday.push(this.GeneratedSchedule[i]);
        }

        for (let i = 0; i < 8; i++) {
            this.GeneratedSchedule.splice(i, 1);
        }

        for (let i = 0; i < 8; i++) {
            this.Wednesday.push(this.GeneratedSchedule[i]);
        }

        for (let i = 0; i < 8; i++) {
            this.GeneratedSchedule.splice(i, 1);
        }

        for (let i = 0; i < 8; i++) {
            this.Thursday.push(this.GeneratedSchedule[i]);
        }

        for (let i = 0; i < 8; i++) {
            this.GeneratedSchedule.splice(i, 1);
        }

        for (let i = 0; i < 8; i++) {
            this.Friday.push(this.GeneratedSchedule[i]);
        }
    }
}