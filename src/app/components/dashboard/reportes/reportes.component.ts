import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
 report:any
  constructor(public authservice:AuthService) { }

  ngOnInit(): void {
  }

  reportes(){

  }
}
