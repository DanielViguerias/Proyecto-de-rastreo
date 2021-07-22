import { CookieService } from 'ngx-cookie-service';
import { ListaUsuariosI} from '../models/usuarios.interface';
import { usuario } from '../models/usuario';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PeticionesInterceptor } from '../interceptores/peticiones.interceptor';
import { ResponseI } from '../models/response';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
 private urlApi  = "http://localhost:5000/api/";
 
  
 constructor(private http:HttpClient,
  private router:Router,
  private toastr:ToastrService,
  private cookies:CookieService){
  
 }
ngOnInit():void{
  
}
//Para el login hace la conexion
 login(form: usuario ):Observable<ResponseI> {
  let url = this.urlApi + "Login";
  return this.http.post<ResponseI>(url,form)
  }



logout(){
  localStorage.removeItem("auth_token")
  this.cookies.deleteAll("auth_token")
}


}
