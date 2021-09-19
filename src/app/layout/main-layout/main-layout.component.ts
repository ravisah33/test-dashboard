import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  upcomingLaunchesList: any = [];
  pastLaunchesList: any = [];
  allLaunchesList: any = [];
  allLandpadsList: any = [];

  constructor(private commonService: CommonService) { }

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
      }
    }, (error) => {
      console.log(error);
    });
    //All landpads
    this.commonService.getAPI(`landpads`).subscribe((resp) => {
      if (resp) {
        this.allLandpadsList = resp;
      }
    }, (error) => {
      console.log(error);
    });
  }

  formatDate(d: any) {
    console.log(d);
    return d;
  }
}
