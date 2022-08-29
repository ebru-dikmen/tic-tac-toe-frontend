import { Component, Input } from '@angular/core';
import { animate, group, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  animations: [
    trigger('flyInOut', [

      // state for X condition
      state('X', style({
        width: '*',
        backgroundColor: 'green',
        transform: 'translateX(0)', opacity: 1
      })),

      // state for O condition
      state('O', style({
        backgroundColor: 'red',
        transform: 'translateX(0)', opacity: 1
      })),

      // animation for state change
      transition(':enter', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: '*'
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
    ])
  ]
})

export class CellComponent {

  // value for cell state
  // initial state is X
  @Input() value = "X";
}
