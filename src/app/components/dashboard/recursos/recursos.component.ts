import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
;
=======
import { RecursoService } from 'src/app/services/recursos.service';
import {Router} from '@angular/router';
import {RecursosI} from '../../../models/recursos.interface';
>>>>>>> c8d58119f17104d5927329aa39a9e39c4b69e3d1

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {
  recursos:Array<RecursosI>

<<<<<<< HEAD
  constructor() { }

  ngOnInit(): void {
  
=======
  constructor(public recursoservice:RecursoService, private router:Router) { 
    this.recursos = [];
  }

  ngOnInit(): void {
    this.recursoservice.get_recursos().subscribe(data => {
    this.recursos = data;
    console.log(data);
  })
>>>>>>> c8d58119f17104d5927329aa39a9e39c4b69e3d1
  }
}
