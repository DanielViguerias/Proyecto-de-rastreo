import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/services/lugares.service';
import {Router} from '@angular/router';
import {LugarI} from '../../../models/lugares.interface';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  lugares:Array<LugarI>

  constructor(public lugaresservice:LugaresService, private router:Router) { 
    this.lugares = [];
  }

  ngOnInit(): void {
    this.lugaresservice.get_lugares().subscribe(data => {
    this.lugares = data;
    console.log(data);
  })
  }
  editar_lugar(id:any){
    this.router.navigate(['dashboard/editarLugar',id])
    console.log(id)
  }
}
