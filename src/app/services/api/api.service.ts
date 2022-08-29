import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // backend REST API URL
  private baseUrl: string = 'http://localhost:3535';

  constructor(private _http: HttpClient) { }

  // send an HTTP POST request with path and data
  postRequest(path: any, data: any): Observable<any> {

    // generate URL
    let url = this.baseUrl + path;

    return this._http.post(url, data).pipe(

      // map response data
      map(res => res),

      // catch error
      // if the response has not ok status, the method does not act as an error to get the error message
      catchError(err => {
        if (err.status != 200 && err.error && err.error.message) {
          const errorResponse = {
            message: err.error.message
          }
          return of(errorResponse);
        } else {
          return throwError(err);
        }
      })
    );
  }
}
