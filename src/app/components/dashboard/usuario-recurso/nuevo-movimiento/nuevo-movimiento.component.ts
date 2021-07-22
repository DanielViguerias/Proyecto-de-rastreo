import { Component, OnInit } from '@angular/core';
import { ListaUsuariosI } from 'src/app/models/usuarios.interface';
import { RecursosI } from 'src/app/models/recursos.interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MovimientoService } from 'src/app/services/movimientos';
import { UsuarioService} from 'src/app/services/usuario.service';
import { RecursoService} from 'src/app/services/recursos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css']
})
export class NuevoMovimientoComponent implements OnInit {

  asignarMovimiento:FormGroup;
  recursoId:Array<RecursosI> = [];
  activateroute: any;
  usuarioid: Array<ListaUsuariosI> = [];  
 
  constructor(private fb:FormBuilder, private movimientoservice:MovimientoService,
    private usuarioservice:UsuarioService, private recursoservice:RecursoService,
    private router:Router, private toastr:ToastrService) {
    this.asignarMovimiento = this.fb.group({
      usuarioid: new FormControl('', Validators.required),
      recursoId: new FormControl('', Validators.required),
      fInicio: new FormControl(null, Validators.required),
      fFin: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
 
    this.usuarioservice.get_usuarios().subscribe(data => {
      this.usuarioid = data;
      console.log(data);
    })
    this.recursoservice.get_recursos().subscribe(data => {
      this.recursoId = data;
      console.log(data);
    })

  }
    

  get f(){

    return this.asignarMovimiento.controls;

  }
  
  changeUsuario(e) {

    console.log(e.target.value);

  }


  enviar(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario guardado con éxito',
      showConfirmButton: false,
      timer: 3000
    })
    const asignacion = this.asignarMovimiento.value;
    console.log(asignacion);

    this.movimientoservice.crear_movimiento(asignacion).subscribe(data => 
      console.log(data),
      err =>{
      this.toastr.error(err)
      console.log(err)
      this.asignarMovimiento.reset();
      })
}
closeform(){
  this.router.navigate(['dashboard/usuarioRecurso'])
}

}
