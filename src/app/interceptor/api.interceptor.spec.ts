import { HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiInterceptor } from './api.interceptor';

describe('ApiInterceptor', () => {
  let interceptor: ApiInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiInterceptor
      ]
    });

    interceptor = TestBed.inject(ApiInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should fire to intercept function', (() => {
    spyOn(interceptor, 'intercept').and.callThrough();
    const request = {
      clone(update: {}) { },
      method: "POST",
      headers: new HttpHeaders(),
      body: {},
      url: {
        "raw": "http://localhost:3535/login",
        "protocol": "http",
        "host": [
          "localhost"
        ],
        "port": "3535",
        "path": [
          "login"
        ]
      },
    } as any;

    const next = { handle: () => { } } as any;
    interceptor.intercept(request, next);
    expect(interceptor.intercept).toHaveBeenCalled();
  }));
});
