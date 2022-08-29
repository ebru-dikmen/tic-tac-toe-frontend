import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  cells: string[] = [];
  xIsNext: boolean | undefined;
  isWin: true | false | undefined;
  counter = 0;
  gameOver: boolean | undefined;
  winner: string | null | undefined;

  constructor() { }

  // trigers new game button action
  ngOnInit() {
    this.startNewGame();
  }

  // new game button action
  startNewGame() {
    this.cells = Array(9);
    this.isWin = false;
    this.counter = 0;
    this.xIsNext = true;
    this.gameOver = false;
    this.winner = null;
  }

  // change player state
  player() {
    return this.xIsNext ? 'X' : 'O';
  }

  // apply player move in board
  makeMove(idx: any) {

    // check whether player can play
    if (!this.isWin && this.counter <= 9) {

      // apply player move
      if (!this.cells[idx]) {

        // get current player state
        let currentPlayer = this.player();

        // prevent apply already done move
        if (currentPlayer === this.cells[idx]) {
          return;
        }

        // increase score
        this.counter++;

        // update board
        this.cells.splice(idx, 1, currentPlayer);

        // change player
        this.xIsNext = !this.xIsNext;
      }

      // check whether player wins
      this.isWin = this.computeToWin();

      // check whether there is no more move
      if (this.counter === 9) {
        this.gameOver = true;
      }
    }
  }

  // check whether game is end or continue
  computeToWin() {

    // win conditions
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // check each win conditions with actual board values
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      // compare the current condition exists in win conditions and find winner
      if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
        this.winner = this.cells[a];
        return true;
      }
    }

    return false;
  }

  // close button action for win and game over modal
  onHide() {
    this.startNewGame();
  }
}
