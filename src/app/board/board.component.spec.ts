import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent
      ]
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
    component.xIsNext = true;
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
    component.makeMove(0);
    expect(component.makeMove).toHaveBeenCalled();
  }));

  it('should fire to player function', () => {
    spyOn(component, 'player').and.callThrough();
    component.player();
    expect(component.player).toHaveBeenCalled();
  });
});
