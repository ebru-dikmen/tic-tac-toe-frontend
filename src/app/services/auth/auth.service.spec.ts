import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fire to save function', (() => {
    spyOn(service, 'save').and.callThrough();
    const key = "key";
    const value = "value"
    service.save(key, value);
    expect(service.save).toHaveBeenCalled()
  }));

  it('should fire to get function', (() => {
    spyOn(service, 'get').and.callThrough();
    const key = "key";
    service.get(key);
    expect(service.get).toHaveBeenCalled()
  }));

  it('should fire to clear function', (() => {
    spyOn(service, 'clear').and.callThrough();
    service.clear();
    expect(service.clear).toHaveBeenCalled()
  }));
});
