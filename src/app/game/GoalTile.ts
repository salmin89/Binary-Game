import GameTile from "./GameTile";

export default class GoalTile {
  value: number;
  valid: boolean = false;
  gameTiles: GameTile[] = [];
  add(gameTile: GameTile) {
    this.gameTiles.push(gameTile);
  }
  setValue() {
    const newValue = this.getValue();
    this.value = parseInt(newValue, 2);
    if (this.value === 0) {
      this.valid = true;
    }
  }
  private getValue() {
    return this.gameTiles.reduce((acc: string, curr) => {
      acc += curr.active ? "1" : "0";
      return acc;
    }, "");
  }
  validate() {
    const bin = this.getValue();
    this.valid = parseInt(bin, 2) === this.value;
  }
}
