import { createReducer, on } from '@ngrx/store';
import { loadWeather, loadWeatherFailure, loadWeatherSuccess } from './weather.actions';

export interface WeatherState {
  data: any;
  loading: boolean;
  error: string | null;
  coord: { lat: number; lon: number } | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  coord: null
};

export const weatherReducer = createReducer(
  initialState,
  on(loadWeather, state => ({ ...state, loading: true })),
  on(loadWeatherSuccess, (state, { data, coord }) => ({ ...state, loading: false, data, coord})),
  on(loadWeatherFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
