import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Router} from '@angular/router';
import { CrearusuarioComponent } from './crearusuario/crearusuario.component';
import { ListaUsuariosI } from 'src/app/models/usuarios.interface';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
 usuarios:Array<ListaUsuariosI>
  

  constructor(public usuarioservice:UsuarioService, 
    private router:Router
    ,private comp:CrearusuarioComponent) { 
    this.usuarios = [];
    
  }

  ngOnInit(): void {
    this.usuarioservice.get_usuarios().subscribe(data => {
    this.usuarios = data;
    console.log(data);

    
  })

} 
editar_usuario(id:any){
  this.router.navigate(['/dashboard/usuario/editarusuario',id])
  console.log(id)
}
  nuevo_usuario(){
    this.router.navigate(['dashboard/usuario/crearusuario'])
  }
  borrar_usuario(id:any){
    this.router.navigate(['/dashboard/usuario/borrarusuario', id])
  }
}
