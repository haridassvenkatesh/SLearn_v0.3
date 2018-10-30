import { Component,OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Chart } from 'angular-highcharts';
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
    templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
    chart: any;
    exam1: any;
    course_completion: any;
    noticeboard: any;
    approval: any;
    certification: any;
    p: any;
    q: any;
    r: any;
    
    ngOnInit() {
        
      }

}



