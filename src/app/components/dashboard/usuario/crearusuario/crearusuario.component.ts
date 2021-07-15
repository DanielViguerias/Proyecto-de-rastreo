import { ToastrModule, ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';



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
      nombre:(['',[Validators.required, Validators.maxLength(30)]]),
      password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      correo:['',[Validators.required, Validators.email]],
      role:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  enviar(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario guardado con éxito',
      showConfirmButton: false,
      timer: 3000
    })
    const user= this.newuser.value;
    console.log(user);

    this.userservice.crear_usuario(user).subscribe(data => console.log(data),err =>{
      this.toastr.error(err)
      console.log(err)
    })
   this.router.navigate(['/dashboard/usuario'])
}
reload(){
  this.newuser.reset();
}

closeform(){
  this.router.navigate(['dashboard/usuario'])
}

}