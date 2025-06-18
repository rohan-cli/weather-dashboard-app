import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss']
})
export class WeatherDashboardComponent implements OnChanges, AfterViewInit {
  @Input() weather: any;
  @Input() forecast: any[] = [];
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  private isViewInitialized = false;

  ngAfterViewInit() {
    this.isViewInitialized = true;
    if (this.forecast?.length) {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isViewInitialized && changes['forecast'] && this.forecast?.length) {
      this.renderChart();
    }
  }

  renderChart() {
    if (!this.chartContainer) return;

    Highcharts.chart(this.chartContainer.nativeElement, {
      chart: { type: 'line' },
      title: { text: '3-Day Forecast' },
      xAxis: {
        categories: this.forecast.map(day => day.date),
        title: { text: 'Day' }
      },
      yAxis: {
        title: { text: 'Temperature (°C/°F)' }
      },
      series: [{
        type: 'line',
        name: 'Temp',
        data: this.forecast.map(day => day.temp)
      }]
    });
  }
}
