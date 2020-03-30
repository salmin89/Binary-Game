import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'level-selector',
    templateUrl: './level-selector.component.html'
})
export class LevelSelectorComponent {
    @Output() levelChange = new EventEmitter<number>()
    @Input() level: number;

    public onChange(level: string) {
        const num = Number.parseInt(level)
        if (Number.isNaN(num)) return
        this.levelChange.emit(num)
    }
}
