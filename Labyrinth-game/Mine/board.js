class Field {
  constructor(type) {
    // "wall", "exit", "free"
    this.type = type;
    this.hero = false;
    this.monster = false;
    this.hidden = true;
  }

  show() {
    this.hidden = false;
  }
  moveHero() {
    this.hero = false;
  }
  addHero() {
    this.show();
    this.hero = true;
  }
  moveMonster() {
    this.monster = false;
  }
  addMonster() {
    this.show();
    this.monster = true;
  }
}

const board1 = [
  "free",
  "free",
  "wall",
  "wall",
  "wall",
  "free",
  "wall",
  "free",
  "free",
  "free",
  "wall",
  "free",
  "wall",
  "free",
  "wall",
  "free",
  "free",
  "free",
  "wall",
  "free",
  "wall",
  "wall",
  "wall",
  "exit",
  "wall",
  "free",
  "free",
  "wall",
  "free",
];

class Board {
  constructor(boardlayot) {
    this.fields = [];
    if (boardlayot.length != 30) {
      throw new Error("Invalid board layout");
    }
    for (let i = 0; i < boardlayot.length; i++) {
      this.fields.push(new Field(boardlayot[i]));
    }
    this.herXY = [0, 0];
    this.monsterXY = [5, 0];
    this.game = game;
  }
  getField(x, y) {
    return this.fields[y * 5 + x];
  }
  getMonsterField() {
    return this.getField(this.monsterXY[0], this.monsterXY[1]);
  }
  getHeroField() {
    return this.getField(this.heroXY[0], this.heroXY[1]);
  }

  onBoard(x, y) {
    if (0 <= x && x <= 5 && 0 <= y && y <= 4) {
      return true;
    }
    return false;
  }

  moveHero(x, y) {
    if (!this.game.player() == "Hero") {
      return;
    }
    if (!this.onBoard(x, y)) {
      return;
    }
    let moveto = this.getField(x, y);
    if (moveto.isWall()) {
      moveto.show();
    } else {
      this.getHeroField().moveHero();
      moveto.addHero();
    }
    this.game.heroMove();
  }

  moveHeroRight() {
    this.moveHero(this.heroXY[0] + 1, this.heroXY[1]);
    this.moveHero(nextXY[0], nextXY[1]);
  }
  moveHeroLeft() {
    this.moveHero(this.heroXY[0] - 1, this.heroXY[1]);
    this.moveHero(nextXY[0], nextXY[1]);
  }
  moveHeroUp() {
    this.moveHero(this.heroXY[0], this.heroXY[1] - 1);
    this.moveHero(nextXY[0], nextXY[1]);
  }
  moveHeroDown() {
    this.moveHero(this.heroXY[0], this.heroXY[1] + 1);
    this.moveHero(nextXY[0], nextXY[1]);
  }

  moveMonster(x, y) {
    if (!this.game.player() == "Monster") {
      return;
    }
    if (!this.onBoard(x, y)) {
      return;
    }
    let moveto = this.getField(x, y);
    if (moveto.isWall()) {
      moveto.show();
    } else {
      this.getMonsterField().moveMonster();
      moveto.addMonster();
    }
    this.game.monsterMove();
  }

  moveMonsterRight() {
    this.moveMonster(this.monsterXY[0] + 1, this.monsterXY[1]);
    this.moveMonster(nextXY[0], nextXY[1]);
  }
  moveMonsterLeft() {
    this.moveMonster(this.monsterXY[0] - 1, this.monsterXY[1]);
    this.moveMonster(nextXY[0], nextXY[1]);
  }
  moveMonsterUp() {
    this.moveMonster(this.monsterXY[0], this.monsterXY[1] - 1);
    this.moveMonster(nextXY[0], nextXY[1]);
  }
  moveMonsterDown() {
    this.moveMonster(this.monsterXY[0], this.monsterXY[1] + 1);
    this.moveMonster(nextXY[0], nextXY[1]);
  }
}
