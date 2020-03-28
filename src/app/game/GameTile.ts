import GoalTile from './GoalTile';
import { Component } from '@angular/core';

export default class GameTile {
  index: number;
  active: boolean = false;
  goalTileXRef: GoalTile;
  goalTileYRef: GoalTile;

  constructor(index: number) {
    this.index = index;
    this.active = Math.random() > 0.5;
  }
 
  toggle() {
    this.active = !this.active;
    this.goalTileXRef.validate()
    this.goalTileYRef.validate()
  }

  get value() {
    return this.active ? "1" : "0"
  }
}
