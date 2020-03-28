import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameTiles: GameTile[] = []
  goalTiles: GoalTile[] = []
  bottomGoalTiles: GoalTile[] = []
  gameWon: boolean;

  Arr = Array;
  @Input() level: number;

  ngOnChanges(): void {
    this.setup(this.level)
  }

  setup(level: number) {
    this.gameTiles = []
    this.goalTiles = []
    this.bottomGoalTiles = []

    let goalTile = new GoalTile()

    for (let i = 0; i < level; i++) {
      this.bottomGoalTiles.push(new GoalTile())
    }

    for (let i = 0; i < level * level; i++) {
      const gameTile = new GameTile(i);
      gameTile.add(goalTile)
      gameTile.add(this.bottomGoalTiles[i % level])
      this.gameTiles.push(gameTile)
      goalTile.add(gameTile)

      //update goal tile with a new one
      if (i !== 0 && (i + 1) % level === 0) {
        this.goalTiles.push(goalTile)
        goalTile = new GoalTile()
      }

      this.bottomGoalTiles[i % level].add(gameTile)
    }

    // set the new random values
    this.goalTiles.forEach(g => g.setValue())
    this.bottomGoalTiles.forEach(g => g.setValue())

    // reset active
    this.gameTiles.forEach(gameTile => gameTile.active = false)
  }

  handleClick(tile: GameTile) {
    tile.toggle();
    this.checkGame()
  }

  checkGame() {
    const won = this.goalTiles.every(g => g.valid)
      && this.bottomGoalTiles.every(g => g.valid)

    this.gameWon = won;
  }

  newGame() {
    this.gameWon = false
    this.setup(this.level)
  }
}

class GameTile {
  index: number;
  active: boolean = false;
  goalTileRefs: GoalTile[] = []

  constructor(index: number) {
    this.index = index
    this.active = Math.random() > 0.5
  }

  add(goalTileRefs: GoalTile) {
    this.goalTileRefs.push(goalTileRefs)
  }

  toggle() {
    this.active = !this.active;
    this.goalTileRefs.forEach(goalTile => goalTile.validate())
  }
}

class GoalTile {
  value: number;
  valid: boolean = false;
  gameTiles: GameTile[] = [];

  add(gameTile: GameTile) {
    this.gameTiles.push(gameTile)
  }

  setValue() {
    const newValue = this.getValue()
    this.value = parseInt(newValue, 2)
    if (this.value === 0) {
      this.valid = true
    }
  }

  private getValue() {
    return this.gameTiles.reduce((acc: string, curr) => {
      acc += curr.active ? "1" : "0"
      return acc
    }, "")
  }

  validate() {
    const bin = this.getValue()
    this.valid = parseInt(bin, 2) === this.value
  }
}
