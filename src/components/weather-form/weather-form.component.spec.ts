import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherFormComponent } from './weather-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

describe('WeatherFormComponent', () => {
  let component: WeatherFormComponent;
  let fixture: ComponentFixture<WeatherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WeatherFormComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        NoopAnimationsModule
      ],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not dispatch if city is empty', () => {
    const dispatchSpy = spyOn(component['store'], 'dispatch');
    component.weatherForm.setValue({ city: '', useFahrenheit: false });
    component.onSubmit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch loadWeather with correct payload', () => {
    const dispatchSpy = spyOn(component['store'], 'dispatch');
    component.weatherForm.setValue({ city: 'New York', useFahrenheit: true });
    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      type: '[Weather] Load Weather',
      city: 'New York',
      unit: 'imperial'
    }));
  });
});
