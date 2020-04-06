import { Component, Input } from '@angular/core';
import GameService from './game.service';
import GoalTile from '../shared/GoalTile';
import GameTile from '../shared/GameTile';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent {
  gameTiles: GameTile[] = [];
  goalTiles: GoalTile[] = [];
  bottomGoalTiles: GoalTile[] = [];
  @Input() level: number;

  constructor(private gameService: GameService) {}

  ngOnChanges(): void {
    this.setup(this.level);
  }

  get gameWon() {
    return this.goalTiles.every((g) => g.valid) && this.bottomGoalTiles.every((g) => g.valid);
  }

  public handleClick(tile: GameTile) {
    tile.toggle();
  }

  public newGame() {
    this.setup(this.level);
  }

  private setup(level: number) {
    const [gameTiles, goalTiles, bottomGoalTiles] = this.gameService.setup(level);
    this.gameTiles = gameTiles;
    this.goalTiles = goalTiles;
    this.bottomGoalTiles = bottomGoalTiles;
  }
}
