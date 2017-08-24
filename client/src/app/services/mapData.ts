import { Injectable } from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class MapData {

  constructor( private http: Http) {  }

  getMarkers() {
    return new Promise(resolve => {
      this.http.get('cities.geojson')
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, () => {
        resolve(Promise.reject("Извините, что-то пошло не так"))
      })
    })
  }
  checkDistance(marker1, marker2) {
    console.log(marker1);
    console.log(marker2);
    return new Promise(resolve => {
      this.http.get('/api/checkDistance/'+marker1.lng+ '/'+ +marker1.lat + '/' + marker2.lng + '/'+ marker2.lat )
      .map(res => res.json())
      .subscribe(data => {
        if (data.status == "success") {
          resolve(data.distance);
        }
        else {
          resolve(Promise.reject(data.message))
        }
      }, () => {
        resolve(Promise.reject("Извините, что-то пошло не так"))
      })
    })
  }
}