import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],
})
export class MyDashboardComponent implements OnInit {
  upcomingLaunchesList: any = [];
  pastLaunchesList: any = [];
  allLaunchesList: any = [];
  allLaunchpadsList: any = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.getDashboardData();
  }

  //launches data
  getDashboardData() {
    //Upcomming
    this.commonService.getAPI(`launches/upcoming`).subscribe(
      (resp) => {
        if (resp) {
          this.upcomingLaunchesList = resp;
        }
      },
      (error) => {
        console.log(error);
      }
    );
    //Past
    this.commonService.getAPI(`launches/past`).subscribe(
      (resp) => {
        if (resp) {
          this.pastLaunchesList = resp;
        }
      },
      (error) => {
        console.log(error);
      }
    );
    //All
    this.commonService.getAPI(`launches`).subscribe(
      (resp) => {
        if (resp) {
          this.allLaunchesList = resp;
          let yearLaunch: any = {};
          this.allLaunchesList.forEach((element: any) => {
            if (yearLaunch.hasOwnProperty(element.launch_year)) {
              const val = yearLaunch[element.launch_year];
              yearLaunch[element.launch_year] = val + 1;
            } else {
              yearLaunch[element.launch_year] = 0;
            }
          });
          console.log('yearLaunch', yearLaunch);
          this.createLaunchOverTimeChart(yearLaunch);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    //All launchpads
    this.commonService.getAPI(`launchpads`).subscribe(
      (resp) => {
        if (resp) {
          this.allLaunchpadsList = resp;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDate(d: any) {
    return d;
  }

  createLaunchOverTimeChart(data) {
    const d1 = [];
    const dataObj = Object.keys(data);
    dataObj.map((itm) => {
      d1.push([itm, data[itm]]);
      return itm;
    });
    this.chartOptions = {
      title: {
        text: '',
      },
      xAxis: {
        title: {
          text: 'Year',
        },
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '10px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count',
        },
      },
      series: [
        {
          type: 'column',
          data: d1,
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#000',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '9px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
      ],
    };
  }
}
