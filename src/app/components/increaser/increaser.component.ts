import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @ViewChild('inputProgress') inputProgress: ElementRef;

  @Input() legend = "Legend";
  @Input() progress = 50;

  @Output() changeValue: EventEmitter<number> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  onChange(event: number) {
    if (event >= 100) {
      this.progress = 100;
    } else if (event <= 0) {
      this.progress = 0;
    } else {
      this.progress = event;
    }
    console.log(this.inputProgress);
    this.inputProgress.nativeElement.value = this.progress;
    this.changeValue.emit(this.progress);
  }

  cambiar(valor: number) {
    if (this.progress <= 0 && valor < 0) {
      return;
    }
    if (this.progress >= 100 && valor > 0) {
      return;
    }
    this.progress += valor;
    this.changeValue.emit(this.progress);
    this.inputProgress.nativeElement.focus();
  }
}
