import { CookieService } from 'ngx-cookie-service';
import { ListaUsuariosI} from '../models/usuarios.interface';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PeticionesInterceptor } from '../interceptores/peticiones.interceptor';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements OnInit{
 private urlApi  = "https://localhost:5001/api/";
 
  
 constructor(private http:HttpClient,
  private router:Router,
  private toastr:ToastrService,
  private cookies:CookieService){
  
 }
ngOnInit():void{
  
}

get_usuarios(): Observable<ListaUsuariosI[]> {
  return this.http.get<ListaUsuariosI[]>(this.urlApi + "Usuario");
 }
}