import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseService } from './course.service';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StaffsService } from '../../people_management/staffs/staffs.service';
import { BatchService } from '../batch/batch.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DepartmentsService } from '../departments/departments.service';
import { AddAssessmentComponent } from './add-assessment/add-assessment.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    FormsModule,
    NgDatepickerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [CourseListComponent, AddCourseComponent, AddAssessmentComponent, AssessmentListComponent],
  providers: [
    CourseService,
    StaffsService,
    BatchService,
    DepartmentsService
  ]
})
export class CourseModule { }
