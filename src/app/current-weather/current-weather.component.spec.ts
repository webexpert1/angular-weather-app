import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { WeatherService } from '../weather/weather.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CurrentWeatherComponent } from './current-weather.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser'


describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService',['getCurrentWeather']);

    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent ],
      imports: [ HttpClientTestingModule, MaterialModule ],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy}
      ]
      //  providers: [ { provide: WeatherService, useValue: mockWeatherService } ],
    })
    .compileComponents()
    weatherServiceMock = TestBed.inject(WeatherService) as any
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())

    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });
});
