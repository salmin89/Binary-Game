import GoalTile from './GoalTile';

export default class GameTile {
  public index: number;
  public goalTileXRef: GoalTile;
  public goalTileYRef: GoalTile;
  private active: boolean = false;

  constructor(index: number) {
    this.index = index;
    this.active = Math.random() > 0.5;
  }
 
  public toggle() {
    this.active = !this.active;
    this.goalTileXRef.validate()
    this.goalTileYRef.validate()
  }

  public get value() {
    return this.active ? "1" : "0"
  }
}
