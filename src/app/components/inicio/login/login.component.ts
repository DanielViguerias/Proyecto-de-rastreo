import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private toastr:ToastrService){
  
    this.login = this.fb.group({
      correo:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
       });  
 }
 ngOnInit() {
}
   
log() {
  const val = this.login.value;
  this.loading = true;
 setTimeout(()=>{
  
  if (val.correo && val.password) {
      this.api.login(val.correo, val.password)
          
          
  }else{
    this.toastr.error("Usuario o Contraseña incorrecto","Error")
  this.login.reset();
  
  }
  this.loading = false;
},3000);
 

  
}
    }

  
 


//   log(){
//     console.log(this.login);
//     const usuario: usuario = {
//       nombreUsuario: this.login.value.usuario,
//       password: this.login.value.password,
//     }
// this.loading = true;
    // setTimeout(()=>{
    //   if (usuario.nombreUsuario==='carla@nexus.com' && usuario.password ==='12345678') {
    //   this.login.reset();
      
    //   this.router.navigate(['/dashboard']);

    // } else {
    //   this.toastr.error("Usuario o Contraseña incorrecto",'Error');
    //   this.login.reset();
    // }
    // this.loading = false;
    // console.log(usuario); 
    // },3000)

    
//   }


