import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { WeatherEffects } from './app/state/weather.effects';
import { weatherReducer } from './app/state/weather.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ weather: weatherReducer }),
    provideEffects([WeatherEffects])
  ],
});
