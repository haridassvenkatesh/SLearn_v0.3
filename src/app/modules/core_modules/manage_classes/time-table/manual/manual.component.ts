import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BatchService } from '../../../master_entry/batch/batch.service';
import { ConstantService } from '../../../../../constant.service';
import { TimeTableService } from '../time-table.service';
import { ToastsManager } from '../../../../../../../node_modules/ng2-toastr';

@Component({
    selector: 'app-manual',
    templateUrl: './manual.component.html',
    styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {
    batchIds: any = [];
    Batchs: any[];
    timetbl: any[];

    monday = [];
    tuesday = [];
    wednesday = [];
    thursday = [];
    friday = [];

    monday_sub = [];
    tuesday_sub = [];
    wednesday_sub = [];
    thursday_sub = [];
    friday_sub = [];

    courseList: any = [];

    ngOnInit() {
        this.fetchBatch();
    }

    finishFunction() {
        this.tt_Submit();
        this.fetchBatch();
    }
    constructor(private toastr: ToastsManager, vcr: ViewContainerRef, private ttservice: TimeTableService, private batchService: BatchService) {
        this.toastr.setRootViewContainerRef(vcr);
        this.createRange();
    }

    fetchBatch() {
        this.batchService.fetchBatchDetails()
            .subscribe(response => {
                console.log(response);
                this.Batchs = response;
            })
    }

    filterBatch(batchID, event) {
        if (event.target.checked) {
            this.batchIds.push(batchID);
        } else if (!event.target.checked) {
            const index = this.batchIds.indexOf(batchID);
            this.batchIds.splice(index, 1);
        }
        this.fetchthesubj(this.batchIds[0]);
        console.log(this.batchIds);
    }

    /*** Manual Time Table  ***/
    fetchthesubj(id) {
        this.ttservice.fetchcourse_tt(id)
            .subscribe(response => {
                if (response.length < 1) {
                    this.toastr.info('Subject Not Found!', 'Info!');
                } else {
                    this.timetbl = response;
                }
            }, () => {
                this.toastr.error('Error Occurred!', 'Error!');
            })
    }

    trimSessionsPerWeek(subname, position): boolean {
        if (this.timetbl[position].name === subname) {
            if (this.timetbl[position].sessionsPerWeek === 0) {
                return false;
            }
            else {
                this.timetbl[position].sessionsPerWeek = this.timetbl[position].sessionsPerWeek - 1;
                return true;
            }
        }
    }

    appendSessionsPerWeek(subname) {
        let position = this.timetbl.findIndex(obj => obj.name == subname.name);
        this.timetbl[position].sessionsPerWeek = this.timetbl[position].sessionsPerWeek + 1;
    }

    getPosition(subname) {
        let position = this.courseList.findIndex(obj => obj.name == subname.name && obj.sessionNumber == subname.sessionNumber && obj.dayOfWeek == subname.dayOfWeek);
        this.courseList.splice(position, 1);
    }

    createRange() {
        for (let i = 0; i <= 7; i++) {
            this.monday.push(i);
        }

        for (let i = 0; i <= 7; i++) {
            this.tuesday.push(i);
        }
        for (let i = 0; i <= 7; i++) {
            this.wednesday.push(i);
        }
        for (let i = 0; i <= 7; i++) {
            this.thursday.push(i);
        }
        for (let i = 0; i <= 7; i++) {
            this.friday.push(i);
        }
    }

    /** MONDAY **/
    dropdata_mon($event: any, id) {
        // tslint:disable-next-line:prefer-const
        let mondat: any = [{ courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 1, type: 'Manual' }];
        let mondatt: any = { courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 1, type: 'Manual' };
        if (this.trimSessionsPerWeek($event.dragData[0], $event.dragData[2])) {
            if (this.monday_sub[id] == null) {
                this.monday_sub[id] = mondat;
                this.courseList.push(mondatt);
            }
            else {
                this.appendSessionsPerWeek(this.monday_sub[id][0]);
                this.getPosition(this.monday_sub[id][0]);
                this.monday_sub[id] = mondat;
                this.courseList.push(mondatt);
            }
        }
    }

    /** TUESDAY **/
    dropdata_tue($event: any, id) {
        // tslint:disable-next-line:prefer-const
        let tuedat: any = [{ courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 2, type: 'Manual' }];
        let tuedatt: any = { courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 2, type: 'Manual' };
        if (this.trimSessionsPerWeek($event.dragData[0], $event.dragData[2])) {
            if (this.tuesday_sub[id] == null) {
                this.tuesday_sub[id] = tuedat;
                this.courseList.push(tuedatt);
            }
            else {
                this.appendSessionsPerWeek(this.tuesday_sub[id][0]);
                this.getPosition(this.tuesday_sub[id][0]);
                this.tuesday_sub[id] = tuedat;
                this.courseList.push(tuedatt);
            }
        }
    }

    /** WEDNESDAY **/
    dropdata_wed($event: any, id) {
        // tslint:disable-next-line:prefer-const
        let weddat: any = [{ courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 3, type: 'Manual' }];
        let weddatt: any = { courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 3, type: 'Manual' };
        if (this.trimSessionsPerWeek($event.dragData[0], $event.dragData[2])) {
            if (this.wednesday_sub[id] == null) {
                this.wednesday_sub[id] = weddat;
                this.courseList.push(weddatt);
            }
            else {
                this.appendSessionsPerWeek(this.wednesday_sub[id][0]);
                this.getPosition(this.wednesday_sub[id][0]);
                this.wednesday_sub[id] = weddat;
                this.courseList.push(weddatt);
            }
        }
    }

    /** THURSDAY  **/
    dropdata_thu($event: any, id) {
        // tslint:disable-next-line:prefer-const
        let thudat: any = [{ courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 4, type: 'Manual' }];
        let thudatt: any = { courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 4, type: 'Manual' };
        if (this.trimSessionsPerWeek($event.dragData[0], $event.dragData[2])) {
            if (this.thursday_sub[id] == null) {
                this.thursday_sub[id] = thudat;
                this.courseList.push(thudatt);
            }
            else {
                this.appendSessionsPerWeek(this.thursday_sub[id][0]);
                this.getPosition(this.thursday_sub[id][0]);
                this.thursday_sub[id] = thudat;
                this.courseList.push(thudatt);
            }
        }
    }

    /** FRIDAY  **/
    dropdata_fri($event: any, id) {
        // tslint:disable-next-line:prefer-const
        let fridat: any = [{ courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 5, type: 'Manual' }];
        let fridatt: any = { courseId: $event.dragData[1], name: $event.dragData[0], courseName: $event.dragData[0], sessionNumber: id + 1, dayOfWeek: 5, type: 'Manual' };
        if (this.trimSessionsPerWeek($event.dragData[0], $event.dragData[2])) {
            if (this.friday_sub[id] == null) {
                this.friday_sub[id] = fridat;
                this.courseList.push(fridatt);
            }
            else {
                this.appendSessionsPerWeek(this.friday_sub[id][0]);
                this.getPosition(this.friday_sub[id][0]);
                this.friday_sub[id] = fridat;
                this.courseList.push(fridatt);
            }
        }
    }

    tt_Submit() {
        this.ttservice.tt_add(this.courseList, this.batchIds[0])
            .subscribe(response => {
                this.timetbl = response;
                this.fetchthesubj(this.batchIds[0])
                this.toastr.success('Timetable Updated', 'Success!');
            }, () => {
                this.toastr.error('Error Occurred!', 'Error!');
            })
    }

    flushSessions() {
        this.monday_sub = [];
        this.tuesday_sub = [];
        this.wednesday_sub = [];
        this.thursday_sub = [];
        this.friday_sub = [];
    }
    ngOnDestroy() {
        //this.subs.unsubscribe();
    }
}
