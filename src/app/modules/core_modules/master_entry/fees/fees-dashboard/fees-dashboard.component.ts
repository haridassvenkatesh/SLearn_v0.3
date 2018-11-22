import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../../../../constant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng2-toastr';
import { Chart } from 'angular-highcharts';
import { FeesService } from '../fees.service';


@Component({
  selector: 'app-fees-dashboard',
  templateUrl: './fees-dashboard.component.html',
  styleUrls: ['./fees-dashboard.component.scss']
})
export class FeesDashboardComponent implements OnInit {

  constructor(private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastsManager, vcr: ViewContainerRef, public feesService: FeesService, ) { }

  subGroup: any = [];
  term: any = [];
  chart: any;
  chartPenalty: any = [];

  ngOnInit() {
    this.getSubGroup();
    this.chartsData();
    this.chartsDataPenalty();
  }
  getSubGroup() {
    this.spinnerService.show();
    this.feesService.fetchSubGroup()
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          this.subGroup = response;
          //console.log('data', this.subGroup);

        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }

  selectedSubgroup(id) {
    this.getTerm(id);
    //console.log(id);
  }

  getTerm(id) {
    this.spinnerService.show();
    this.feesService.manageFeesTerm(id)
      .subscribe(response => {
        if (response.length < 1) {
          this.toastr.info('Data Not Found!', 'Info!');
        } else {
          this.term = response;
          //console.log('term', this.term);

        }
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.toastr.error('An Error Occured!', 'Error!');
        this.spinnerService.hide();
      })
  }
  chartsData() {
    this.chart = new Chart({
      chart: {
        height: '210',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 55,
          beta: 0
        }
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
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Fees',
        data: [
          ['Tusion Fees', 45],
          ['Book Fees', 25],
          ['Exam Fees', 15],
          ['Bus Fees', 15]
        ]
      }]
    });
  }
  chartsDataPenalty() {
    this.chartPenalty = new Chart({
      chart: {
        height: '210',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 55,
          beta: 0
        }
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
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Fees',
        data: [
          ['Lab Breakage', 20],
          ['Library Late Return', 20],
          ['Tusion Fees: Late Payment', 60]

        ]
      }]
    });
  }

}
