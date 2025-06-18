import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../environment';
import {
  loadWeather,
  loadWeatherSuccess,
  loadWeatherFailure,
} from './weather.actions';

@Injectable()
export class WeatherEffects {
  loadWeather$;
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {

    this.loadWeather$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadWeather),
        mergeMap(({ city, unit }) =>
          this.http
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${environment.weatherApiKey}`
            )
            .pipe(
              map((data: any) => loadWeatherSuccess({ data, coord: data.coord })),
              catchError((error) =>
                of(loadWeatherFailure({ error: error.message }))
              )
            )
        )
      )
    );
  }
}
