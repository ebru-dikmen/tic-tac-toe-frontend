
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, subscribeOn } from 'rxjs';
import { BoardComponent } from '../board/board.component';
import { LoginComponent } from '../login/login.component';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';
import { RegisterComponent } from './register.component';

let mockAuthSerice: AuthService = {
  save: () => null,
  get: () => 'result',
  clear: () => undefined
};

const fakeApiService = jasmine.createSpyObj<ApiService>(
  'ApiService', {
  postRequest: of(null)
});

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: 'login', component: LoginComponent },
            { path: 'board', component: BoardComponent }
          ]
        )
      ],
      declarations: [
        RegisterComponent,
        NgForm
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthSerice },
        { provide: ApiService, useValue: fakeApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fired ngOnInit function', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should fired onSubmit function-1', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const form = { value: { userName: 'ebru', password: 'kader ' } } as any;
    fakeApiService.postRequest.and.returnValue(of({ token: "12345" }));
    component.onSubmit(form);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should fired onSubmit function-2', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const form = { value: { userName: 'ebru', password: 'kader ' } } as any;
    fakeApiService.postRequest.and.returnValue(of(null));
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

  it('should fired checkPlayerAlreadyLogin function', () => {
    spyOn(component, 'checkPlayerAlreadyLogin').and.callThrough();
    component.checkPlayerAlreadyLogin();
    expect(component.checkPlayerAlreadyLogin).toHaveBeenCalled();
  });

  it('should fired goToLoginPage function', () => {
    spyOn(component, 'goToLoginPage').and.callThrough();
    component.goToLoginPage();
    expect(component.goToLoginPage).toHaveBeenCalled();
  });
});
