import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cells: string[] = [];
  xIsNext: boolean | undefined;

  constructor() { }

  // trigers new game button action
  ngOnInit() {
    this.startNewGame();
  }

  // new game button action
  startNewGame() {
    this.cells = Array(9);
    this.xIsNext = true;
  }

  // change player state
  player() {
    return this.xIsNext ? 'X' : 'O';
  }

  // apply player move in board
  makeMove(idx: any) {

    // apply player move
    if (!this.cells[idx]) {

      // get current player state
      let currentPlayer = this.player();

      // prevent apply already done move
      if (currentPlayer === this.cells[idx]) {
        return;
      }

      // update board
      this.cells.splice(idx, 1, currentPlayer);

      // change player
      this.xIsNext = !this.xIsNext;
    }
  }
}
