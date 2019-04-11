import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input() labels: Label[] = [];
  @Input() data: MultiDataSet = [];
  @Input() chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
