import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private httpHeader = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  getAPI(path: string, requestObj?: any, config?: any): Observable<any> {
    let url = config?.externalURL ? path : `https://api.spacexdata.com/v3/${path}`;
    if (Array.isArray(requestObj?.params)) {
      requestObj.params.forEach((urlParam: any) => {
        url += `/${urlParam}`;
      });
    }
    return this.http.get(url).pipe(
      map((data) => {
        return data;
      }, catchError(this.handleError))
    );
  }

  postAPI(path: string, requestObj?: any, config?: any): Observable<any> {
    const url = config?.externalURL ? path : `https://api.spacexdata.com/v3/${path}`;

    if (config?.headers) {
      this.httpHeader = new HttpHeaders(config?.headers);
    }

    return this.http
      .post<any>(url, requestObj, {
        headers: this.httpHeader,
        observe: 'response',
      })
      .pipe(
        map((data) => {
          
          return data;
        }, catchError(this.handleError))
      );
  }


  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
