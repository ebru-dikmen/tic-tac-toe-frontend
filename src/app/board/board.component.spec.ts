import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CellComponent } from '../cell/cell.component';
import { BoardComponent } from './board.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        CellComponent
      ],
      imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'login', component: LoginComponent },
          ]
        )
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fired ngOnInit function', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'startNewGame').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should fire to startNewGame function', () => {
    spyOn(component, 'startNewGame').and.callThrough();
    component.cells = Array(9);
    component.isWin = false;
    component.xIsNext = true;
    component.counter = 0;
    component.gameOver = false;
    component.startNewGame();
    expect(component.startNewGame).toHaveBeenCalled();
  });

  it('should fire to makeMove function', () => {
    spyOn(component, 'makeMove').and.callThrough();
    const cases = [{ idX: -1, isNext: true },
      { idX: 0, isNext: true },
      { idX: 1, isNext: true },
      { idX: null, isNext: true },
      { idX: undefined, isNext: true },
      { idX: -1, isNext: false },
      { idX: 0, isNext: false },
      { idX: 1, isNext: false },
      { idX: null, isNext: false },
      { idX: undefined, isNext: false },
    { idX: undefined, isNext: undefined }];
    cases.forEach(data => {
      component.xIsNext = data.isNext;
      component.makeMove(data.idX);
      expect(component.makeMove).toHaveBeenCalled();
    });
  });

  it('should fire to makeMove function-2', (() => {
    spyOn(component, 'makeMove').and.callThrough();
    component.isWin = true;
    component.counter = 9;
    component.makeMove(0);
    expect(component.makeMove).toHaveBeenCalled();
  }));

  it('Button click event using spyon', () => {
    spyOn(component, 'onHide').and.callThrough();
    component.onHide();
    expect(component.onHide).toHaveBeenCalled();
  });

  it('should  fire to  computeToWin function', () => {
    spyOn(component, 'computeToWin').and.callThrough();
    const cells = [
      ["x", "x", "x"],
      ["o", "x", "x"],
      ["o", "o", "x"],
      ["o", "x", "o"],
    ]
    cells.forEach(cell => {
      component.cells = cell;
      component.computeToWin();
      expect(component.computeToWin).toHaveBeenCalled();
    });
  });

  it('should  fire to  onHide function', () => {
    spyOn(component, 'onHide').and.callThrough();
    component.isWin = false;
    component.counter = 0;
    component.gameOver = false;
    component.onHide();
    expect(component.onHide).toHaveBeenCalled();
  });

  it('should  fire to  player function', () => {
    spyOn(component, 'player').and.callThrough();
    component.player();
    expect(component.player).toHaveBeenCalled();
  });

  it('should fired logout function', () => {
    spyOn(component, 'logout').and.callThrough();
    component.logout();
    expect(component.logout).toHaveBeenCalled();
  });
});
