import { PortalInjector } from '@angular/cdk/portal';
import { AfterViewInit, Component } from '@angular/core';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { } from 'google.maps';
import { map } from 'rxjs/operators';
import { tokenGetter } from '../../../app.module';
import { stringify } from '@angular/compiler/src/util';
import { GuardsCheckStart } from '@angular/router';

interface Lugar{

  nombre:string,
  geocerca: google.maps.Polygon
}
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {



 
  constructor() { }

  ngAfterViewInit(): void {

    let map: google.maps.Map;
    let marcadores: google.maps.Marker[] = [];
    let geocercas: Lugar[]=[];
    
  
    
    

    // for(let i=0;cargageo.lengh<i;i++){
    //   for(let j=0;cargageo[i].length;j++){
    //     console.log(cargageo[0])    
    //   }
    // }

    //console.log(cargageo)

    
    
    
    const center: google.maps.LatLngLiteral = { lat: 21.921427882183703 , lng: -102.29496958768634 };
    function initMap(): void {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center,
        zoom: 18,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeId: "terrain"
      });
      let poligono = new google.maps.Polygon({
        fillColor: "#f43f01",
          fillOpacity: 0.5,
          strokeWeight: 1,
          clickable: true,
          editable: true,
          zIndex: 1,
          draggable: false,
          paths:geocercas? geocercas:[]
      });
     // let cargageo = cargargeocercas();

     

      
      
      //const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /*   var geocerca = new google.maps.Polygon({
        paths: [],
        editable: true
      }); */
      
      /* const markers = locations.map((location, i) => {
        return new google.maps.Marker({
          position: location,
          label: labels[i % labels.length],
        });
      }); */
    /*  new MarkerClusterer(map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });     */
      //-- poligonos--//
      
      //  const paths = [
      //   { lat:  29.82427726324196 , lng: -110.2277761270849 },
      //   { lat: 29.92437726324196, lng: -110.3287761270849 },
      //   { lat: 29.72447726324196, lng: -110.4297761270849 },]
     /* const flightpath = new google.maps.Polygon({
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
      flightpath.setMap(map); */
      
      // --- asignar variables de dibujo --- 
      const drawTools = new google.maps.drawing.DrawingManager({
        drawingMode: null,
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
          draggable: true,
          clickable:true

        },
        polygonOptions: {
          fillColor: "#f43f01",
          fillOpacity: 0.5,
          strokeWeight: 1,
          clickable: true,
          editable: false,
          zIndex: 1,
          draggable: false
          

        },
      });

      /* google.maps.event.addListener(drawTools, 'polygoncomplete', function(polygon) {
        console.log(polygon.type)
          
        });  */
       drawTools.setMap(map);


       if(cargargeocercas()){
        let cargageo = cargargeocercas();
         cargageo.forEach(element => {
         
          console.log(element);
          
          var pats = element.geocerca
          
          let poli = new google.maps.Polygon({
             fillColor: "#f43f01",
               fillOpacity: 0.5,
               strokeWeight: 1,
               clickable: true,
               editable: false,
               zIndex: 1,
               draggable: false,
               paths: pats
           });
           
           geocercas.push({'nombre':'nombre','geocerca':pats})
           //console.log(element);
          // console.log(poli);
           poli.setMap(map);
     
     
         });
       }
       
       google.maps.event.addListener(drawTools, "polygoncomplete", function(polygon) {
        
       // console.log(polygon.latLngs.we[0].we);
        var paths = polygon.latLngs.we[0].we;
        
        geocercas.push({
       'nombre':'nuevo',
       'geocerca':paths})
       //console.log(geocercas)
          console.log(geocercas)
       guardageocercas(JSON.stringify(geocercas));
        
        /* 
            poligono.setPaths = event.latLngs.we[0].we;
            console.log(event);
          console.log(poligono.getPaths);
          console.log(event.latLngs.we[0].we) */
			});
        
     /*  google.maps.event.addListener(drawTools, "click", function(polygon) {
				
        geocercas.slice(polygon)
        console.log(geocercas)
       });
 */
      
      
      


     

     
    }

    
    initMap();


  }
  
  

}
function guardageocercas(guardar: string) {
  localStorage.setItem('geocercas',guardar);
}

function cargargeocercas(){
  
  if (verificageocercas()!= null) {
   return verificageocercas()
  }
  return
}

function verificageocercas(){
  if(localStorage.getItem('geocercas')) {
    return JSON.parse(localStorage.getItem('geocercas')!)
  }
  return null
}