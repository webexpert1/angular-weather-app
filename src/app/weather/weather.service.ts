import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { ICurrentWeather } from '../interfaces';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

export interface IWeatherService {
  // getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather>
  getCurrentWeatherByCoords(coords: any): Observable<ICurrentWeather>
}

// https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  // getCurrentWeather(city: string, country: string) {
  //   return this.httpClient
  //   .get<ICurrentWeatherData>(
  //   `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
  //   `q=${city},${country}&appid=${environment.appId}`
  //   )
  // }

  // getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
  //   const uriParams = new HttpParams()
  //     .set('q', `${city},${country}`)
  //     .set('appid', environment.appId);

  //   return this.httpClient
  //     .get<ICurrentWeatherData>(
  //       `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
  //       { params: uriParams }
  //     ).pipe(map(data => this.transformToICurrentWeather(data)))
  // }

  getCurrentWeatherByCords(coords: any): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString())

    return this.getCurentWeatherHelper(uriParams);
  }

  getCurrentWeather(search: string | number, country: string): Observable<ICurrentWeather> {
    let uriParams = new HttpParams()
    if(typeof search === 'string') {
      uriParams = uriParams.set('q',
        country ? `${search},${country}` : search
      )
    } else {
      uriParams = uriParams.set('zip', 'search')
    }
     return this.getCurentWeatherHelper(uriParams);
  }

  getCurentWeatherHelper(uriParams: HttpParams): Observable<ICurrentWeather> {
    uriParams = uriParams.set('appid', environment.appId)
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`, { params: uriParams }
      )
      .pipe(map(data => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: ICurrentWeatherData) : ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000 as any,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return kelvin * 9/ 5 - 459.67;
  }

}
