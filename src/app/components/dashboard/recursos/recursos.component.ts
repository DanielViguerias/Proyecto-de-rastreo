import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  constructor(public authservice:AuthService) { }

  ngOnInit(): void {
  this.authservice.get_recursos().subscribe(data => console.log(data));
  }

}
