import { putusuarioI } from './../../../../models/usuarioPUT';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup,Validators,FormControl, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'
import { timer } from 'rxjs';
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
      nombre: new FormControl('',[Validators.required, Validators.maxLength(30)]),
      correo: new FormControl('',[Validators.required, Validators.email, Validators.maxLength(30)]),
      password: new FormControl('',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]),
      role:new FormControl(['',[Validators.required]])
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
  postform(form:putusuarioI){
   
    Swal.fire({
      title: 'Deseas guardar los cambios?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Guardar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       
        let id = this.activateroute.snapshot.paramMap.get('id')
        Swal.fire('Se realizó con éxito!', '', 'success')
        this.userservice.putuser(form,id).subscribe(data =>{
          console.log(data)
         
        })
        // this.router.navigate(['/dashboard/usuario'])

      }
    })
  }
closeform(){
  this.router.navigateByUrl('/dashboard/usuario')
  this.editarform.reset()
}

}
