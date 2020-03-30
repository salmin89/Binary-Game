import GameTile from "./GameTile";

export default class GoalTile {
  public value: number;
  public valid: boolean = false;
  public gameTiles: GameTile[] = [];
  
  public add(gameTile: GameTile) {
    this.gameTiles.push(gameTile);
  }

  public setValue() {
    const newValue = this.getTotalValue();
    this.value = parseInt(newValue, 2);
    if (this.value === 0) {
      this.valid = true;
    }
  }

  public validate() {
    const bin = this.getTotalValue();
    this.valid = parseInt(bin, 2) === this.value;
  }

  private getTotalValue() {
    return this.gameTiles.reduce((acc: string, curr) => {
      acc += curr.value
      return acc;
    }, "");
  }
}
