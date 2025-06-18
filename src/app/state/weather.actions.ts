import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction(
  '[Weather] Load Weather',
  props<{ city: string; unit: string }>()
);

export const loadWeatherSuccess = createAction(
  '[Weather] Load Weather Success',
  props<{ data: any, coord: any }>()
);

export const loadWeatherFailure = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: string }>()
);
