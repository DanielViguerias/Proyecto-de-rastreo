import { CookieService } from 'ngx-cookie-service';
import { RecursosI } from '../models/recursos';
import { usuario } from '../models/usuario';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PeticionesInterceptor } from '../interceptores/peticiones.interceptor';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
 private urlApi  = "https://localhost:5001/api/";
 
  
 constructor(private http:HttpClient,
  private router:Router,
  private toastr:ToastrService,
  private cookies:CookieService){
  
 }
ngOnInit():void{
  
}
//Para el login hace la conexion
 login(correo:string, password:string ) {
  return this.http.post<usuario>(this.urlApi + "Login",{correo,password}).subscribe(
    (resp:any) => {
      this.toastr.success("Inicio de sesión aprobado!!")
        this.router.navigateByUrl('/dashboard');
        localStorage.setItem("auth_token",resp.token)
       this.cookies.set('auth_token',resp.token)
       this.cookies.get('auth_token')
    }
);
     
      
}

logout(){
  localStorage.removeItem("auth_token")
  this.cookies.delete("auth_token")
}

get_recursos(): Observable<RecursosI[]> {
 return this.http.get<RecursosI[]>(this.urlApi + "Recurso");
}
}
