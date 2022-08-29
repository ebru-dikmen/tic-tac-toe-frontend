import { HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth/auth.service';
import { ApiInterceptor } from './api.interceptor';

let mockAuthSerice: any = {
  save: () => null,
  get: () => null,
  clear: () => undefined
};

describe('ApiInterceptor', () => {

  let interceptor: ApiInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiInterceptor,
        { provide: AuthService, useValue: mockAuthSerice }
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
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      }),
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
