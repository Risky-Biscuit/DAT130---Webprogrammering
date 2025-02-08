class Game {
  constructor() {
    this.turn = 0;
    this.player = ["Monster", "Hero"];
    this.heroMoves = 2;
    this.monsterMoves = 1;
    this.finished = false;
    this.winner = "";
  }
  player() {
    return this.player[this.turn];
  }
  heroMove() {
    if (this.turn != 1) {
      return;
    }
    this.heroMoves--;
    if (this.heroMoves == 0) {
      this.turn = 0;
      this.monsterMoves = 1;
    }
  }
  monsterMove() {
    if (this.turn != 0) {
      return;
    }
    this.monsterMoves--;
    this.turn = 1;
    this.heroMoves = 2;
  }
  exit() {
    this.winner = this.player();
    this.finished = true;
    alert("The &{this.player()} found the exit and won!");
  }
  eat() {
    this.winner = this.player();
    this.finished = true;
    alert("The Monster ate the hero and won!");
  }
}
