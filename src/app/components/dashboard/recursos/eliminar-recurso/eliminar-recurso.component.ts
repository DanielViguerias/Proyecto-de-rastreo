import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { putRecursosI } from 'src/app/models/recursoPut';
import { RecursosI } from 'src/app/models/recursos.interface';
import { RecursoService } from 'src/app/services/recursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-recurso',
  templateUrl: './eliminar-recurso.component.html',
  styleUrls: ['./eliminar-recurso.component.css']
})
export class EliminarRecursoComponent implements OnInit {

  borrarform:FormGroup;
  constructor(private router:Router,private activateroute:ActivatedRoute,
  private recursoservice:RecursoService, private fb:FormBuilder) { 
  this.borrarform = this.fb.group({
      recursoId: new FormControl(''),
      nombre: new FormControl(''),
      tipo: new FormControl(''),
    });
    this.datosrecursos=[]
  }
  datosrecursos:Array<putRecursosI>;
  

  ngOnInit(): void {
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.recursoservice.get_recurso(id).subscribe(data=> {
    
      this.datosrecursos[0] = data;
      this.borrarform.setValue({
        'recursoId':this.datosrecursos[0].recursoId,
        'nombre':this.datosrecursos[0].nombre,
        'tipo':this.datosrecursos[0].tipo
      })
      console.log(this.datosrecursos);
      (err:any) => console.log(err);  
    
     }
      
     )
  }
  delete(form:RecursosI){
    Swal.fire({
      title: 'Estás seguro?',
      text: "No puedes revertir está acción!",
      icon: 'warning',
      
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,estoy de acuerdo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'El recurso ha sido eliminado.',
          'success'
        )
        let id = this.activateroute.snapshot.paramMap.get('id')
        this.recursoservice.delete(form,id).subscribe(data =>{
          console.log(data)
     
    })
    // this.router.navigate(['/dashboard/recurso'])
    
      }
    })
  }
  reload(){
    location.reload()
    this.borrarform.reset()
  }
  closeform(){
  this.router.navigateByUrl('/dashboard/recurso')
  
  }
}

