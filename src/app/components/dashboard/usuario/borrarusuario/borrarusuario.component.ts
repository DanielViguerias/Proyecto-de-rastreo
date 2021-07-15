import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaUsuariosI } from 'src/app/models/usuarios.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrarusuario',
  templateUrl: './borrarusuario.component.html',
  styleUrls: ['./borrarusuario.component.css']
})
export class BorrarusuarioComponent implements OnInit {

  borrarform:FormGroup;
  constructor(private router:Router,private activateroute:ActivatedRoute,
    private userservice:UsuarioService, private fb:FormBuilder) { 

    this.borrarform = this.fb.group({
      usuarioid:new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('')
    });
    this.datosusuarios=[];
  }
  datosusuarios:Array<ListaUsuariosI>;
  

  ngOnInit(): void {
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.userservice.get_user(id).subscribe(data=> {
    
      this.datosusuarios[0] = data;
      this.borrarform.setValue({
        'usuarioid':this.datosusuarios[0].usuarioid,
        'nombre':this.datosusuarios[0].nombre,
        'correo':this.datosusuarios[0].correo,
        'password':this.datosusuarios[0].password,
        'role':this.datosusuarios[0].role
      })
      console.log(this.datosusuarios);
      (err:any) => console.log(err);  
    
     }
      
     )
  }
  delete(form:ListaUsuariosI){
    Swal.fire({
      title: 'Estás seguro?',
      text: "No puedes revertir está acción!",
      icon: 'warning',
      timer: 3000,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,estoy de acuerdo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'El usuario ha sido eliminado.',
          'success'
        )
        let id = this.activateroute.snapshot.paramMap.get('id')
    this.userservice.delete(form,id).subscribe(data =>{
      console.log(data)
     
    })
    // this.router.navigate(['/dashboard/usuario'])
      }
    })
  }
  reload(){
    location.reload()
    this.borrarform.reset()
  }
closeform(){
  this.router.navigateByUrl('/dashboard/usuario')
  
}
}
