import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { loadWeather } from '../../app/state/weather.actions';

@Component({
  selector: 'app-weather-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss']
})
export class WeatherFormComponent {
  weatherForm = new FormGroup({
    city: new FormControl(''),
    useFahrenheit: new FormControl(false)
  });

  constructor(private store: Store) {}

  onSubmit() {
    const city = this.weatherForm.value.city || '';
    const unit = this.weatherForm.value.useFahrenheit ? 'imperial' : 'metric';
    if (city.trim()) {
      this.store.dispatch(loadWeather({ city, unit }));
    }
  }

  get isFahrenheit(): boolean {
    return this.weatherForm.get('useFahrenheit')?.value ?? false;
  }
}
