import { Injectable } from '@angular/core';
import GameTile from './GameTile';
import GoalTile from './GoalTile';

@Injectable({
  providedIn: 'root'
})
export default class GameService {
  private gameTiles = [];
  private goalTiles = [];
  private bottomGoalTiles = [];

  public setup(level: number) {
    // Empty state
    this.gameTiles = [];
    this.goalTiles = [];
    this.bottomGoalTiles = [];

    this.generateBottomGoalTiles(level);

    this.generateGameTiles(level);

    this.setRandomValues();

    this.resetActive();

    return [this.gameTiles, this.goalTiles, this.bottomGoalTiles];
  }

  private resetActive() {
    this.gameTiles.forEach(gameTile => (gameTile.active = false));
  }

  private setRandomValues() {
    this.goalTiles.forEach(g => g.setValue());
    this.bottomGoalTiles.forEach(g => g.setValue());
  }

  private generateBottomGoalTiles(level: number) {
    for (let i = 0; i < level; i++) {
      this.bottomGoalTiles.push(new GoalTile());
    }
  }

  private generateGameTiles(level: number) {
    let goalTile = new GoalTile();

    for (let i = 0; i < level * level; i++) {
      const gameTile = new GameTile(i);
      gameTile.goalTileXRef = goalTile;
      gameTile.goalTileYRef = this.bottomGoalTiles[i % level];
      this.gameTiles.push(gameTile);
      goalTile.add(gameTile);
      //update goal tile with a new one
      if (i !== 0 && (i + 1) % level === 0) {
        this.goalTiles.push(goalTile);
        goalTile = new GoalTile();
      }
      this.bottomGoalTiles[i % level].add(gameTile);
    }
  }
}
