import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = "https://localhost:44331/api/ciudads"; //conecction 
@Injectable({
  providedIn: 'root'
})
export class CityServiceService {

  constructor(private http: HttpClient) {}

  verCiudad():Observable<any>{
    return this.http.get(url);
  }
}
