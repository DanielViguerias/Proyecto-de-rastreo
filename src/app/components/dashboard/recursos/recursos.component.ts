import { Component, OnInit } from '@angular/core';
import { RecursoService } from 'src/app/services/recursos.service';
import {Router} from '@angular/router';
import {RecursosI} from '../../../models/recursos.interface';

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
}
