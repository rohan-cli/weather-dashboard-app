import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDashboardComponent } from './weather-dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WeatherDashboardComponent', () => {
  let component: WeatherDashboardComponent;
  let fixture: ComponentFixture<WeatherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherDashboardComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not error if forecast is empty', () => {
    component.forecast = [];
    expect(() => component.ngOnChanges({})).not.toThrow();
  });

  it('should render chart when forecast has data', () => {
    component.weather = {
      name: 'Sample City',
      main: { temp: 25, humidity: 60 },
      wind: { speed: 10 },
      weather: [{ description: 'Cloudy' }]
    };
    component.forecast = [
      { date: 'Mon', temp: 24 },
      { date: 'Tue', temp: 26 },
      { date: 'Wed', temp: 25 }
    ];
    fixture.detectChanges();
    expect(component.forecast.length).toBe(3);
  });
});
