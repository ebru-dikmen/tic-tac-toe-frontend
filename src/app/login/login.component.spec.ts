import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from '../register/register.component';
import { BoardComponent } from '../board/board.component';

let mockAuthSerice: AuthService = {
  save: () => null,
  get: () => '',
  clear: () => undefined
};

const fakeApiService = jasmine.createSpyObj<ApiService>(
  'ApiService', {
  postRequest: of({} as any)
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: 'register', component: RegisterComponent },
            { path: 'board', component: BoardComponent }
          ]
        )],
      declarations: [
        LoginComponent,
        NgForm
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthSerice },
        { provide: ApiService, useValue: fakeApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fired goToRegisterPage function', () => {
    spyOn(component, 'goToRegisterPage').and.callThrough();
    component.goToRegisterPage();
    expect(component.goToRegisterPage).toHaveBeenCalled();
  });

  it('should fired onSubmit function-1', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const form = { value: { userName: 'ebru', password: 'kader ' } } as any;
    fakeApiService.postRequest.and.returnValue(of(null));
    component.onSubmit(form);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should fired onSubmit function-2', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const form = { value: { userName: 'ebru', password: 'kader ' } } as any;
    fakeApiService.postRequest.and.returnValue(of({ token: "12345" }));
    component.onSubmit(form);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should fired onSubmit function-3', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const form = { value: { userName: 'ebru', password: 'kader ' } } as any;
    fakeApiService.postRequest.and.returnValue(of({ message: "Error" }));
    component.onSubmit(form);
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
