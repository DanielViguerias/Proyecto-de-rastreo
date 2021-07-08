import { Component, OnInit } from '@angular/core';
import { putRecursosI } from './../../../../models/recursoPut';
import { Router,ActivatedRoute } from '@angular/router';
import { RecursoService } from 'src/app/services/recursos.service';
import { FormGroup,Validators,FormControl, FormBuilder } from '@angular/forms';

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
      nombre: new FormControl(''),
      tipo: new FormControl(''),
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
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.recursoservice.putRecurso(form,id).subscribe(data =>{
      console.log(data)
      
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

