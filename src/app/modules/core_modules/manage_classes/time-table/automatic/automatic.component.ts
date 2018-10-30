import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../../master_entry/batch/batch.service';
import { ConstantService } from '../../../../../constant.service';
import { TimeTableService } from '../time-table.service';

@Component({
  selector: 'app-automatic',
  templateUrl: './automatic.component.html',
  styleUrls: ['./automatic.component.scss']
})
export class AutomaticComponent implements OnInit {

  batchIds: any = [];
  Batchs: any[];
  constraints: any = [
    {
      "priority": -1,
      "name": -1
    }
  ];

  TTconstraint: any = [];
  TTconstraintPriority: any = [];

  GeneratedSchedule: any = [];

  Monday: any = [];
  Tuesday: any = [];
  Wednesday: any = [];
  Thursday: any = [];
  Friday: any = [];


  constructor(private ttservice: TimeTableService, private batchService: BatchService, private constService: ConstantService) { }

  ngOnInit() {
    this.fetchBatch();
    this.constService.getTTContraint().subscribe(response => { console.log(response); this.TTconstraint = response });
    this.constService.getTTContraintPriority().subscribe(response => { console.log(response); this.TTconstraintPriority = response })
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
    console.log(this.batchIds);
  }

  generate() {
    this.ttservice.submitTTConstraints(this.batchIds, this.constraints)
      .subscribe(response => {
        console.log(response.batchWiseScheduleList);
        this.GeneratedSchedule = response.batchWiseScheduleList[0].schedules;
        this.Converting();
      })
  }

  Converting() {
    for(let i = 0; i < 8; i++ ) {
      this.Monday.push(this.GeneratedSchedule[i]);
    }

    for(let i = 0; i < 8; i++ ) {
      this.GeneratedSchedule.splice(i,1);
    }

    for(let i = 0; i < 8; i++ ) {
      this.Tuesday.push(this.GeneratedSchedule[i]);
    }

    for(let i = 0; i < 8; i++ ) {
      this.GeneratedSchedule.splice(i,1);
    }

    for(let i = 0; i < 8; i++ ) {
      this.Wednesday.push(this.GeneratedSchedule[i]);
    }

    for(let i = 0; i < 8; i++ ) {
      this.GeneratedSchedule.splice(i,1);
    }

    for(let i = 0; i < 8; i++ ) {
      this.Thursday.push(this.GeneratedSchedule[i]);
    }

    for(let i = 0; i < 8; i++ ) {
      this.GeneratedSchedule.splice(i,1);
    }

    for(let i = 0; i < 8; i++ ) {
      this.Friday.push(this.GeneratedSchedule[i]);
    }
  }

  flushSettings()
  {
this.GeneratedSchedule = [];
this.Monday = [];
this.Tuesday = [];
this.Wednesday = [];
this.Thursday = [];
this.Friday = [];
this.TTconstraint = [];
this.TTconstraintPriority =[];
this.batchIds = [];
  }
}
