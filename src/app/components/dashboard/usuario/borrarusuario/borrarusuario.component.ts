import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaUsuariosI } from 'src/app/models/usuarios.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.userservice.delete(form,id).subscribe(data =>{
      console.log(data)
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
