import { CookieService } from 'ngx-cookie-service';
import { LugarI} from '../models/lugares.interface';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PeticionesInterceptor } from '../interceptores/peticiones.interceptor';
@Injectable({
  providedIn: 'root'
})
export class LugaresService implements OnInit{
 private urlApi  = "https://localhost:5001/api/";
 
  
 constructor(private http:HttpClient,
  private router:Router,
  private toastr:ToastrService,
  private cookies:CookieService){
  
 }
ngOnInit():void{
  
}

get_lugares(): Observable<LugarI[]> {
  return this.http.get<LugarI[]>(this.urlApi + "Lugar");
 }
}