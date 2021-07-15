import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientosI } from '../models/movimientos';
import { putRecursosI } from '../models/recursoPut';
import { putusuarioI} from '../models/usuarioPUT';
import { RecursosI } from '../models/recursos.interface';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  urlApi = "http://localhost:5000/api/";
  constructor(private http:HttpClient) { }

  get_recurso(id:any):Observable<putRecursosI[]>{
    let url = this.urlApi + "Recurso/" + id; 
    return this.http.get<putRecursosI[]>(url);
    
  }
  get_user(id:any): Observable<putusuarioI>{
    let url = this.urlApi + "Usuario/" + id
    return this.http.get<putusuarioI>(url);
  }
  post_movi(post: MovimientosI):Observable<MovimientosI>{
    return this.http.post<MovimientosI>(this.urlApi,post)
  }
  get_movimientos(): Observable<MovimientosI[]> {
    return this.http.get<MovimientosI[]>(this.urlApi + "Movimiento");
   }
}
