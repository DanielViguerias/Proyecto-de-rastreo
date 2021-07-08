import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecursoService } from 'src/app/services/recursos.service';
@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent implements OnInit {

 
  newRecurso:FormGroup;
  
 
  constructor(private fb:FormBuilder,private recursoservice:RecursoService,
    private router:Router,
    private toastr:ToastrService) { 
    this.newRecurso = this.fb.group({
      nombre:['',[Validators.required]],
      tipo:['',[Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  enviar(){
    const recurso= this.newRecurso.value;
    console.log(recurso);

    this.recursoservice.crear_recurso(recurso).subscribe(data => console.log(data),err =>{
      this.toastr.error(err)
      console.log(err)
      this.newRecurso.reset()  })

}
closeform(){
  this.router.navigate(['dashboard/recurso'])
}

}
