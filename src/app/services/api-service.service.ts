import { Injectable } from '@angular/core';

import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiListCountSubject$ = new BehaviorSubject<any>(null);
  apiListCount$ = this.apiListCountSubject$.asObservable();

  constructor(private commonService: CommonService) {}

  getUpcomingLaunches() {
    return this.commonService.getAPI(`launches/upcoming`).pipe(
      map((data) => {
        if (data) {
          return data;
        }
      }, catchError(this.handleErrorAndRethrow.bind(this)))
    );
  }

  getApiWishlist() {
    return this.commonService.getAPI(`API-url`).pipe(
      map((data) => {
        if (data) {
          return data;
        }
      }, catchError(this.handleErrorAndRethrow.bind(this)))
    );
  }

  setCount(val: any) {
    this.apiListCountSubject$.next(val);
  }

  updateCartStatus(cartId: any, status: any) {
    return this.commonService
      .putAPI(`API-URL`)
      .pipe(catchError(this.handleErrorAndRethrow.bind(this)));
  }

  createNewOrder(cartIdList: any) {
    const req = {
      cartIds: cartIdList,
    };
    return this.commonService
      .postAPI(`api-url`, req)
      .pipe(catchError(this.handleErrorAndRethrow.bind(this)));
  }

  deleteCarts(cartList: any) {
    const req = {
      carts: [cartList?.cartId],
    };
    return this.commonService
      .postAPI(`api-url`, req)
      .pipe(catchError(this.handleErrorAndRethrow.bind(this)));
  }

  handleErrorAndRethrow(err: any) {
    console.log(err);
    return throwError(err);
  }
}
