import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
 report:any
  constructor() { }

  ngOnInit(): void {
  }

  reportes(){

  }
}
