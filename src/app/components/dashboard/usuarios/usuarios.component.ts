import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Router} from '@angular/router';
import {ListaUsuariosI} from '../../../models/usuarios.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
 usuarios:Array<ListaUsuariosI>

  constructor(public usuarioservice:UsuarioService, private router:Router) { 
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.usuarioservice.get_usuarios().subscribe(data => {
    this.usuarios = data;
    console.log(data);
  })
  }
}
