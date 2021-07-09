import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaUsuariosI } from 'src/app/models/usuarios.interface';
import { ResponseI } from 'src/app/models/response';
import { CookieService } from 'ngx-cookie-service';
import { usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
    login:FormGroup;
    loading= false; 
    token : any;

 constructor(
  private fb:FormBuilder,
  private router:Router,
  public api:AuthService,
  private toastr:ToastrService,private cookies:CookieService){
  
    this.login = this.fb.group({
      correo:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
       });  
 }
 ngOnInit() {
}
   
log(form:usuario) {
  
    this.api.login(form).subscribe((data)=>{
        // let dataresponse:ResponseI =data
        // if(dataresponse.Code == "ok"){
          this.loading = true;
          setTimeout(()=>{
        
        localStorage.setItem("auth_token",data.token)
        this.cookies.set("auth_token",data.token)
        this.cookies.get("auth_token")
        this.router.navigateByUrl('/dashboard')
        this.toastr.success("Bienvenido")
          },3000)

        // }
   },err =>{
    this.loading = true
     setTimeout(()=>{
      
      console.log(err)
      this.toastr.error("Usuario o Contraseña incorrectos")
     },3000)
     this.loading = false
     
    })
    }
  }