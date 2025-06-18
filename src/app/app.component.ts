import { Component, ViewChild } from '@angular/core';
import { WeatherFormComponent } from '../components/weather-form/weather-form.component';
import { WeatherDashboardComponent } from '../components/weather-dashboard/weather-dashboard.component';
import { MapViewComponent } from '../components/map-view/map-view.component';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './state/app.state.interface';
import { loadWeather } from './state/weather.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    WeatherFormComponent,
    WeatherDashboardComponent,
    MapViewComponent,
    ChatbotComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild(MapViewComponent) mapView!: MapViewComponent;
  weather$!: Observable<any>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  coord$!: Observable<any>;
  mapCenter: { lat: number; lon: number } | null = null;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.weather$ = this.store.select(state => state.weather.data);
    this.coord$ = this.store.select(state => state.weather.coord);
    this.loading$ = this.store.select(state => state.weather.loading);
    this.error$ = this.store.select(state => state.weather.error);
  }

  onMapClick(coords: { lat: number; lon: number }) {
    const city = `${coords.lat},${coords.lon}`;
    this.mapCenter = coords;
    this.store.dispatch(loadWeather({ city, unit: 'metric' }));
  }

  onChatCityRequest(event: { city: string }) {
    this.store.dispatch(loadWeather({ city: event.city, unit: 'metric' }));
  }
}
