import { Component, OnInit } from '@angular/core';
import {FormArray,FormGroup , FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-fees',
  templateUrl: './edit-fees.component.html',
  styleUrls: ['./edit-fees.component.scss']
})
export class EditFeesComponent implements OnInit {
  user:FormGroup;
  
  constructor() { 
    this.user = new FormGroup({      
      name:new FormControl(),      
      steps: new FormArray([
        this.initSteps(), 
      ]),
      
    });

  }

  ngOnInit() {
  }

  initSteps(){
    return new FormGroup({
      // stepNumber : new FormControl(this.i),
      stepNumber : new FormControl(''),
      workflowPhaseId : new FormControl('')
    });
  }
  addSteps(){
    const control = <FormArray>this.user.controls['steps'];
    control.push(this.initSteps());
    // this.i=1;
    
  }
  getSteps(form){
    return form.get('steps').controls;
  }

  removeStep(i: number){
    alert(i);
    const control = <FormArray>this.user.controls['steps'];
    control.removeAt(i);
  }
}
