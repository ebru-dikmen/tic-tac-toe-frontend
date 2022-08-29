import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {

  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fire to postRequest function', (() => {
    spyOn(service, 'postRequest').and.callThrough();
    const path = "/login";
    const data = {} as any;
    service.postRequest(path, data);
    expect(service.postRequest).toHaveBeenCalled()
  }));
});
