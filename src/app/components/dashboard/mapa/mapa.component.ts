import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat = 22.150530757970497;
   lng = -102.35722068356765; 
   zoom = 10;
  


  
  constructor() { }

  ngOnInit(): void {
   
  
  }
  initmap(): void{
    let map: google.maps.Map;
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 21.884742491492943, lng:-102.29384938302277 },  
      zoom: 10,
    });

  }
}
