import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public level = 4;

  public onLevelChange(level: number) {
    this.level = level
  }
}
