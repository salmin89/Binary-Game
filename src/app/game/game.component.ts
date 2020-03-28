import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  Arr = Array;
  gameTiles: GameTileInterface[] = []
  @Input() level: number;

  // constructor() { }

  ngOnInit(): void {
    for (let i=0;i<this.level * this.level;i++) {
      this.gameTiles.push(new GameTile(i))
    }
  }

  ngOnChanges(change): void {
    const newVal = change.level.currentValue
  }

  handleClick(x) {
    console.log(x)
  }

}

interface GameTileInterface {
  index: number;
  active: boolean;
}

class GameTile {
  index: number;
  active: boolean = false;
  constructor(index: number) {
    this.index = index
  }

  toggle() {
    this.active = !this.active;
  }
}
