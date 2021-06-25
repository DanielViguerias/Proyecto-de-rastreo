import { putusuarioI } from './../../../../models/usuarioPUT';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup,Validators,FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {
    editarform:FormGroup;
   
  constructor(private router:Router,private activateroute:ActivatedRoute,
    private userservice:UsuarioService, private fb:FormBuilder,
    ) {
      this.editarform = this.fb.group({
      usuarioid:new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      password: new FormControl(''),
      role:new FormControl('')
    });
   
    this.datosusuarios = []
     }
     datosusuarios:Array<putusuarioI>;
     
    

  ngOnInit(): void {
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.userservice.get_user(id).subscribe( (data:any) => {
    
      this.datosusuarios = data[0];
      console.log(this.datosusuarios);
      (err:any) => console.log(err);  
    
     }
      
     )
  }

}
