import { Component, OnInit } from '@angular/core';
import { putRecursosI } from './../../../../models/recursoPut';
import { Router,ActivatedRoute } from '@angular/router';
import { RecursoService } from 'src/app/services/recursos.service';
import { FormGroup,Validators,FormControl, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-recurso',
  templateUrl: './editar-recurso.component.html',
  styleUrls: ['./editar-recurso.component.css']
})
export class EditarRecursoComponent implements OnInit {

 
  editarform:FormGroup;
   
  constructor(private router:Router,private activateroute:ActivatedRoute,
    private recursoservice:RecursoService, private fb:FormBuilder,
    ) {
      this.editarform = this.fb.group({
      recursoId:new FormControl(''),
      nombre: new FormControl('',[Validators.required,Validators.maxLength(30)]),
      tipo: new FormControl('',[Validators.required,Validators.maxLength(30)]),
      active: new FormControl('')

    });
   
    this.datosrecursos=[]
     }
     datosrecursos:Array<putRecursosI>;
     
    

  ngOnInit(): void {
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.recursoservice.get_recurso(id).subscribe(data=> {
    
      this.datosrecursos[0] = data;
      this.editarform.setValue({
        'recursoId':this.datosrecursos[0].recursoId,
        'nombre':this.datosrecursos[0].nombre,
        'tipo':this.datosrecursos[0].tipo,
        'active':this.datosrecursos[0].active
      })
      console.log(this.datosrecursos);
      (err:any) => console.log(err);  
    
     }
      
     )
  }
  postform(form:putRecursosI){
    Swal.fire({
      title: 'Deseas guardar los cambios?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Guardar`,
      denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       
        let id = this.activateroute.snapshot.paramMap.get('id')
        Swal.fire('Se realizó con éxito!', '', 'success')
        this.recursoservice.putRecurso(form,id).subscribe(data =>{
          console.log(data)
         
        })
        // this.router.navigate(['/dashboard/recurso'])
   

      } else if (result.isDenied) {
        Swal.fire('Los cambios no han sido guardados', '', 'info');timer:2500
        location.reload()
      }
    })
  }
closeform(){
  this.router.navigateByUrl('/dashboard/recurso')
  this.editarform.reset()
}
reload(){
  location.reload()
}
}

