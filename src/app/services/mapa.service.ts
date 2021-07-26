import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { urlApi } from 'src/environments/environment';
import { Lugar,punto, sitio } from '../components/dashboard/mapa/mapa.interfaces';



@Injectable({
  providedIn: 'root'
})
export class MapaService {
 

constructor(private http: HttpClient){}

httpOptions = {

  headers: new HttpHeaders({

    'Content-Type': 'application/json'
  })

}

getLugares(): Observable<sitio[]>{

return this.http.get<sitio[]>(urlApi+"/lugar",this.httpOptions)
}

postLugar(post: Lugar,lat: number,lng: number): Observable<sitio>{

 return this.http.post<sitio>(urlApi+"/lugar",{'nombre':post.nombre,'domicilio':post.domicilio,'latitud':lat,'longitud':lng},this.httpOptions).pipe(catchError(this.errorHandler)

)}

postPunto(punto:punto):Observable<punto>{
return this.http.post<punto>(urlApi+"/punto",{'LugarId':punto.LugarId,'latitud':punto.latitud,'longitud':punto.longitud},this.httpOptions).pipe(catchError(this.errorHandler)
)}

getPunto(id:number):Observable<any>{
  return this.http.get<punto>(urlApi+"/punto/geo/"+id,this.httpOptions).pipe(catchError(this.errorHandler)
)};


deletePuntos(id:number):Observable<any>{
  return this.http.delete<punto>(urlApi+"/punto/"+id,this.httpOptions).pipe(catchError(this.errorHandler)
)};


deleteLugar(id:number): Observable<any>{
  return this.http.delete<Lugar>(urlApi+"/lugar/"+id,this.httpOptions).pipe(catchError(this.errorHandler)
)};


errorHandler(error: { error: { message: string; }; status: any; message: any; }) {

  let errorMessage = '';

  if(error.error instanceof ErrorEvent) {

    errorMessage = error.error.message;

  } else {

    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

  }

  return throwError(errorMessage);

}

}

