import { putusuarioI } from './../../../../models/usuarioPUT';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup,Validators,FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {
    editarform:FormGroup;
   
  constructor(private router:Router,private activateroute:ActivatedRoute,
    private userservice:UsuarioService, private fb:FormBuilder, private toastr:ToastrService 
    ) {
      this.editarform = this.fb.group({
      usuarioid:new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      password: new FormControl(''),
      role:new FormControl('')
    });
   
    this.datosusuarios=[]
     }
     datosusuarios:Array<putusuarioI>;
     
    

  ngOnInit(): void {
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.userservice.get_user(id).subscribe(data=> {
    
      this.datosusuarios[0] = data;
      this.editarform.setValue({
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
  async postform(form:putusuarioI){
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.userservice.putuser(form,id).subscribe(data =>{
      console.log(data)
     // this.router.navigateByUrl('/dashboard/usuario')
    })
  }
closeform(){
  this.editarform.reset()
  this.router.navigateByUrl('/dashboard/usuario')
  
}
async reload(){

this.toastr.success("El registro se ha editado con exito")
 
location.reload()
 //console.log("hola",this.router.navigateByUrl("/dashboard/usuario"));
 
 //this.router.navigateByUrl('/dashboard/usuario')
}


}
