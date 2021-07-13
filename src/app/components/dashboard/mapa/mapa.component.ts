import { AfterViewInit, Component } from '@angular/core';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { } from 'google.maps';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  /* lat = 22.150530757970497;
   lng = -102.35722068356765;
   zoom = 10; */
  
 




  constructor() {

  }
  ngAfterViewInit(): void {

    let map: google.maps.Map;
   
    var locations = [
      { lat: -31.56391, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
      { lat: -33.727111, lng: 150.371124 },
      { lat: -33.848588, lng: 151.209834 },
      { lat: -33.851702, lng: 151.216968 },
      { lat: -34.671264, lng: 150.863657 },
      { lat: -35.304724, lng: 148.662905 },
      { lat: -36.817685, lng: 175.699196 },
      { lat: -36.828611, lng: 175.790222 },
      { lat: -37.75, lng: 145.116667 },
      { lat: -37.759859, lng: 145.128708 },
      { lat: -37.765015, lng: 145.133858 },
      { lat: -37.770104, lng: 145.143299 },
      { lat: -37.7737, lng: 145.145187 },
      { lat: -37.774785, lng: 145.137978 },
      { lat: -37.819616, lng: 144.968119 },
      { lat: -38.330766, lng: 144.695692 },
      { lat: -39.927193, lng: 175.053218 },
      { lat: -41.330162, lng: 174.865694 },
      { lat: -42.734358, lng: 147.439506 },
      { lat: -42.734358, lng: 147.501315 },
      { lat: -42.735258, lng: 147.438 },
      { lat: -43.999792, lng: 170.463352 }
    ];



    const center: google.maps.LatLngLiteral = { lat: 21.921427882183703 , lng: -102.29496958768634 };
    function initMap(): void {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center,
        zoom: 18,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeId: "satellite"
      });
      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      const markers = locations.map((location, i) => {
        return new google.maps.Marker({
          position: location,
          label: labels[i % labels.length],
        });
      });
     new MarkerClusterer(map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });    
      //-- poligonos--//
      
      const mytrip = [
        { lat:  29.82427726324196 , lng: -110.2277761270849 },
        { lat: 29.92437726324196, lng: -110.3287761270849 },
        { lat: 29.72447726324196, lng: -110.4297761270849 },]
      const flightpath = new google.maps.Polygon({
        paths: mytrip,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.8
      })
      flightpath.addListener('mouseover',()=>{
        console.log("paso por la figura");
      });
      flightpath.setMap(map);
      
      // --- asignar variables de dibujo --- 
      const drawTools = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.POLYGON
          ],
        },
        markerOptions: {
          icon: "../../../../assets/img/building.png",
          draggable: true

        },
        polygonOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 1,
          clickable: true,
          editable: true,
          zIndex: 1,
          draggable: false

        },
      });



      drawTools.setMap(map);
    }

    initMap();


  }


}
