import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecursosI } from 'src/app/models/recursos.interface';
import { RecursoService } from 'src/app/services/recursos.service';
;

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {
  recursos:Array<RecursosI>

  constructor(public recursoservice:RecursoService, private router:Router) { 
    this.recursos = [];
  }

  ngOnInit(): void {
    this.recursoservice.get_recursos().subscribe(data => {
    this.recursos = data;
    console.log(data);
  })
  }
  nuevo_recurso(){
    this.router.navigate(['dashboard/crearRecurso'])
  }
  editar_recurso(id:any){
    this.router.navigate(['/dashboard/editarRecurso',id]);
    console.log(id)
  }
  borrar_recurso(id:any){
    this.router.navigate(['/dashboard/eliminarRecurso', id]);
  }
}
