import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';

let mockAuthSerice: any = {
  save: () => null,
  get: () => true,
  clear: () => undefined
};

describe('AuthGuard', () => {

  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: 'login', component: LoginComponent }
          ]
        )],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthSerice }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should fire to canActivate function', (() => {
    spyOn(guard, 'canActivate').and.callThrough();
    const next = {} as any;
    const state = {} as any;
    guard.canActivate(next, state);
    expect(guard.canActivate).toHaveBeenCalled();
  }));
});
