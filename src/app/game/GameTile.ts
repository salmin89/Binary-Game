import GoalTile from './GoalTile';
import { Component } from '@angular/core';

export default class GameTile {
  index: number;
  active: boolean = false;
  goalTileRefs: GoalTile[] = [];
  constructor(index: number) {
    this.index = index;
    this.active = Math.random() > 0.5;
  }
  add(goalTileRefs: GoalTile) {
    this.goalTileRefs.push(goalTileRefs);
  }
  toggle() {
    this.active = !this.active;
    this.goalTileRefs.forEach(goalTile => goalTile.validate());
  }
}
