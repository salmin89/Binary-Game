import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  level = 4;

  onChange(e) {
    this.level = e.target.value
  }
}
