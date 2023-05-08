import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  private _ejeX: Array<any> = [];
  private _data: Array<any> = [{ data: [], label: '' }];
  @Input()
  get ejeX(): Array<any> {
    return this._ejeX;
  }
  set ejeX(value: Array<any>) {
    console.log('entradax', value);
    this._ejeX = value;
  }
  @Input()
  get data(): Array<any> {
    return this._data;
  }
  set data(value: Array<any>) {
    console.log('data', value);
    this._data = value;
    this.onStart();
  }

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
        max: 400,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  barChartType: ChartType = 'bar';
  barChartPlugins = [DataLabelsPlugin];

  barChartData: ChartData<'bar'> = {
    labels: this._ejeX,
    datasets: this.data,
  };
  constructor() {}

  ngOnInit(): void {
    this.onStart();
  }
  //https://valor-software.com/ng2-charts/#BarChart
  onStart() {
    this.barChartData = {
      labels: this._ejeX,
      datasets: this.data,
    };
  }

  // events
  chartClicked({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event, active);
  }
  /*
  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
*/
}
