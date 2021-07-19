import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
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

return this.http.get<sitio[]>(urlApi,this.httpOptions)
}

}

