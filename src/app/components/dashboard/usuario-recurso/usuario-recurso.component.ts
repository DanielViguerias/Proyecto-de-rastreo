import { Component, OnInit } from '@angular/core';
import { MovimientosI } from 'src/app/models/movimientos';
import { MovimientoService } from 'src/app/services/movimientos';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'app-usuario-recurso',
  templateUrl: './usuario-recurso.component.html',
  styleUrls: ['./usuario-recurso.component.css']
})
export class UsuarioRecursoComponent implements OnInit {
  movimientos:Array<MovimientosI>
  

  constructor(public movimientoservice:MovimientoService, 
    private router:Router) { 
    this.movimientos = [];
    
  }

  ngOnInit(): void {
    this.movimientoservice.get_movimientos().subscribe(data => {
    this.movimientos = data;
    console.log(data);
  })

} 
  nuevo_movimiento(){
    this.router.navigate(['dashboard/movimiento'])
  }
}