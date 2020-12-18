import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const url = "https://localhost:44331/api/usuarios"; //conecction 
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  verUsuario():Observable<any>{
    return this.http.get(url);
  }
  InsertarUsuario(alumno):Observable<any>{
    return this.http.post(url, alumno);
  }
}
