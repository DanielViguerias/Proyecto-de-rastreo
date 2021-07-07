import { ToastrModule, ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';



interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {
  
  newuser:FormGroup;
  
 
  constructor(private fb:FormBuilder,private userservice:UsuarioService,
    private router:Router,
    private toastr:ToastrService) { 
    this.newuser = this.fb.group({
      nombre:['',[Validators.required]],
      password:['',[Validators.required,Validators.maxLength(8)]],
      correo:['',[Validators.required]],
      role:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  enviar(){
    const user= this.newuser.value;
    console.log(user);

    this.userservice.crear_usuario(user).subscribe(data => console.log(data),err =>{
      this.toastr.error(err)
      console.log(err)
      this.newuser.reset() })

}
closeform(){
  this.router.navigate(['dashboard/usuario'])
}

}