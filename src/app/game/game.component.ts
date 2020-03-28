import { Component, OnInit, Input } from '@angular/core';
import GameService from './game.service';
import GoalTile from './GoalTile';
import GameTile from './GameTile';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameTiles: GameTile[] = [];
  goalTiles: GoalTile[] = [];
  bottomGoalTiles: GoalTile[] = [];
  gameWon: boolean;
  @Input() level: number;

  constructor(private gameService: GameService) {}

  ngOnChanges(): void {
    this.setup(this.level);
  }

  public handleClick(tile: GameTile) {
    tile.toggle();
    this.checkGame();
  }

  public newGame() {
    this.gameWon = false;
    this.setup(this.level);
  }

  private setup(level: number) {
    const [gameTiles, goalTiles, bottomGoalTiles] = this.gameService.setup(
      level
    );
    this.gameTiles = gameTiles;
    this.goalTiles = goalTiles;
    this.bottomGoalTiles = bottomGoalTiles;
  }

  private checkGame() {
    const won =
      this.goalTiles.every(g => g.valid) &&
      this.bottomGoalTiles.every(g => g.valid);

    this.gameWon = won;
  }
}
