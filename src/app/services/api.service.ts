import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {Restaurant} from "../models/restaurant.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  // get restaurants using Get method
  getRestaurantsList(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/posts')
      .pipe(
        debounceTime(777),
        map((res: any) => {
          return res;
        })
      )
  };
  // create restaurant using Post method
  postRestaurant(data: Restaurant): Observable<any> {
    return this._http.post<any>('http://localhost:3000/posts/', data)
      .pipe(
        debounceTime(777),
        map((res: any) => {
          return res;
        })
      )
  };
  // update restaurant using Put method
  updateRestaurant(data: Restaurant, id: number | string): Observable<any> {
    return this._http.put<any>('http://localhost:3000/posts/'+id, data)
      .pipe(
        debounceTime(777),
        map((res: any) => {
          return res;
        })
      )
  };
  // delete restaurant using Delete method
  deleteRestaurant(id: number | string): Observable<any> {
    return this._http.delete<any>('http://localhost:3000/posts/'+id)
      .pipe(
        debounceTime(777),
        map((res: any) => {
          return res;
        })
      )
  };

}
