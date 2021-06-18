import { ToastrModule, ToastrService } from 'ngx-toastr';
import { usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private urlApi  = "https://localhost:5001/api/";
 
 reportes:any
 
 
  
 constructor(private http:HttpClient,
  private fb:FormBuilder,
  private router:Router,
  private toastr:ToastrService){
   this.reportes=[]
  
 }
//Para el login hace la conexion
 login(correo:string, password:string ) {
  return this.http.post<usuario>(this.urlApi + "Login",{correo,password}).subscribe(
    (resp:any) => {
      this.toastr.success("Inicio de sesión aprobado!!")
        this.router.navigateByUrl('/dashboard');
        localStorage.setItem("auth_token",resp.token)
    }
);
     
      
}

obtenerreportes(){
  return this.http.get(this.urlApi + "Movimiento").subscribe(
    res=>{
      console.log("Los reportes son," , res)
      this.reportes=res;
    },
    err=>{
      console.log(err) 
    }
  )
}
logout(){
  localStorage.removeItem("auth_token")
}
}
