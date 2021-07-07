import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PutRecursosI } from 'src/app/models/recursosPut';
import { RecursosI } from 'src/app/models/recursos.interface';
import { RecursoService } from 'src/app/services/recursos.service';

@Component({
  selector: 'app-borrarrecurso',
  templateUrl: './borrarrecurso.component.html',
  styleUrls: ['./borrarrecurso.component.css']
})
export class BorrarrecursoComponent implements OnInit {

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
  datosrecursos:Array<PutRecursosI>;
  

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
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.recursoservice.delete(form,id)
  }
  reload(){
    location.reload()
    this.borrarform.reset()
  }
  closeform(){
  this.router.navigateByUrl('/dashboard/recurso')
  
  }
}

