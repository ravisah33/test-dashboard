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

  constructor(
    private commonService: CommonService) { }

  ngOnInit() {
    this.getDashboardData();
  }

  //launches data
  getDashboardData() {
    //Upcomming
    this.commonService.getAPI(`launches/upcoming`).subscribe((resp) => {
      if (resp) {
        this.upcomingLaunchesList = resp;
      }
    }, (error) => {
      console.log(error);
    });
    //Past
    this.commonService.getAPI(`launches/past`).subscribe((resp) => {
      if (resp) {
        this.pastLaunchesList = resp;
      }
    }, (error) => {
      console.log(error);
    });
    //All
    this.commonService.getAPI(`launches`).subscribe((resp) => {
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
        this.chartOptions = {
          series: [
            {
              type: "line",
              data: [1,2,3,4,5,6,7]
            }
          ]
        };
      }
    }, (error) => {
      console.log(error);
    });
    //All launchpads
    this.commonService.getAPI(`launchpads`).subscribe((resp) => {
      if (resp) {
        this.allLaunchpadsList = resp;
      }
    }, (error) => {
      console.log(error);
    });
  }

  formatDate(d: any) {
    return d;
  }

  createLaunchOverTimeChart() {
    // Highcharts.chart('launchovertime', {

    //   chart: {
    //     type: 'column'
    //   },

    //   title: {
    //     text: 'Highcharts responsive chart'
    //   },

    //   subtitle: {
    //     text: 'Resize the frame or click buttons to change appearance'
    //   },

    //   legend: {
    //     align: 'right',
    //     verticalAlign: 'middle',
    //     layout: 'vertical'
    //   },

    //   xAxis: {
    //     categories: ['Apples', 'Oranges', 'Bananas'],
    //     labels: {
    //       x: -10
    //     }
    //   },

    //   yAxis: {
    //     allowDecimals: false,
    //     title: {
    //       text: 'Amount'
    //     }
    //   },

    //   series: [{
    //     name: 'Christmas Eve',
    //     data: [1, 4, 3]
    //   }, {
    //     name: 'Christmas Day before dinner',
    //     data: [6, 4, 2]
    //   }, {
    //     name: 'Christmas Day after dinner',
    //     data: [8, 4, 3]
    //   }],

    //   responsive: {
    //     rules: [{
    //       condition: {
    //         maxWidth: 500
    //       },
    //       chartOptions: {
    //         legend: {
    //           align: 'center',
    //           verticalAlign: 'bottom',
    //           layout: 'horizontal'
    //         },
    //         yAxis: {
    //           labels: {
    //             align: 'left',
    //             x: 0,
    //             y: -5
    //           },
    //           title: {
    //             text: null
    //           }
    //         },
    //         subtitle: {
    //           text: null
    //         },
    //         credits: {
    //           enabled: false
    //         }
    //       }
    //     }]
    //   }
    // });

  }
}

