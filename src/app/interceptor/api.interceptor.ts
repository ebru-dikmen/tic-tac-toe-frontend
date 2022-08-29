import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() { }

  // intercept HTTP request and modify HTTP headers
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // check whether request header contain content-type HTTP header
    // if the request header does not contain content-type HTTP header, HTTP content-type is added into the request as JSON
    if (!request.headers.has('Content-Type')) {
      request = request && request.clone(
        { headers: request.headers.set('Content-Type', 'application/json') }
      );
    }

    // add accept HTTP header as JSON
    request = request && request.clone(
      { headers: request.headers.set('Accept', 'application/json') }
    );

    // continue with the remaining works
    return next && next.handle(request);
  }
}
