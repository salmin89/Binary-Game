import GameTile from "./GameTile";

export default class GoalTile {
  value: number;
  valid: boolean = false;
  gameTiles: GameTile[] = [];
  add(gameTile: GameTile) {
    this.gameTiles.push(gameTile);
  }
  setValue() {
    const newValue = this.getTotalValue();
    this.value = parseInt(newValue, 2);
    if (this.value === 0) {
      this.valid = true;
    }
  }
  private getTotalValue() {
    return this.gameTiles.reduce((acc: string, curr) => {
      acc += curr.value
      return acc;
    }, "");
  }
  validate() {
    const bin = this.getTotalValue();
    this.valid = parseInt(bin, 2) === this.value;
  }
}
