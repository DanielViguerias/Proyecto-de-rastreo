import { LugarI } from './../../../../models/lugares.interface';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/services/lugares.service';
import { FormGroup,Validators,FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-lugares',
  templateUrl: './editar-lugares.component.html',
  styleUrls: ['./editar-lugares.component.css']
})
export class EditarLugaresComponent implements OnInit {

  editarform:FormGroup;
   
  constructor(private router:Router,private activateroute:ActivatedRoute,
    private lugarservice:LugaresService, private fb:FormBuilder,
    ) {
      this.editarform = this.fb.group({
      lugarId:new FormControl(''),
      nombre: new FormControl(''),
      domicilio: new FormControl('')
    });
   
    this.datosLugares=[]
     }
     datosLugares:Array<LugarI>;
     
    

  ngOnInit(): void {
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.lugarservice.get_lugar(id).subscribe(data=> {
    
      this.datosLugares[0] = data;
      this.editarform.setValue({
        'lugarId':this.datosLugares[0].lugarId,
        'nombre':this.datosLugares[0].nombre,
        'domicilio':this.datosLugares[0].domicilio,
      })
      console.log(this.datosLugares);
      (err:any) => console.log(err);  
    
     }
      
     )
  }
  postform(form:LugarI){
    let id = this.activateroute.snapshot.paramMap.get('id')
    this.lugarservice.putlugar(form,id).subscribe(data =>{
      console.log(data)
      
    })
  }
closeform(){
  this.router.navigateByUrl('/dashboard/lugar')
  this.editarform.reset()
}
reload(){
  location.reload()
}
}