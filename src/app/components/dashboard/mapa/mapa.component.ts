import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {} from 'google.maps';
import jwtDecode from 'jwt-decode';
import {Lugar, sitio, user} from "./mapa.interfaces"
import {MapaService} from "../../../services/mapa.service"
import {urlApi} from 'src/environments/environment';
import {Observable} from 'rxjs';


@Component({selector: 'app-mapa', templateUrl: './mapa.component.html', styleUrls: ['./mapa.component.css']})


// --- Inicializacion despues de que se inicia la vista --- //
export class MapaComponent implements OnInit {
    lugares : Array < sitio >= []


    constructor(private map2service : MapaService) {}

    ngOnInit(): void {


        this.map2service.getLugares().subscribe(data => {
            this.lugares = data;
            console.log(data);


        })


        let map: google.maps.Map;
        let marcadores: google.maps.Marker[] = [];
        let geocercas: Lugar[] = [];
        let index: number = 0;
        let sitios: Observable<sitio[]>;

        var addListenersOnPolygon = function (polygon) {
            google.maps.event.addListener(polygon, 'click', function (event) {});
        }
        // --- Centrar en Arkus Nexus Aguascalientes --- //
        const center: google.maps.LatLngLiteral = {
            lat: 21.921427882183703,
            lng: -102.29496958768634
        };
        const initMap = () : void => { // --- inicializar el mapa --- //
            map = new google.maps.Map(document.getElementById("map")as HTMLElement, {
                center,
                zoom: 18,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeId: "terrain"
            });

            // --- asignar variables de dibujo ---

            const drawTools = new google.maps.drawing.DrawingManager({
                drawingMode: null,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.POLYGON]
                },

                markerOptions: {
                    icon: "../../../../assets/img/building.png",
                    draggable: true,
                    clickable: true

                },
                polygonOptions: {
                    fillColor: "#0008ff",
                    fillOpacity: 0.5,
                    strokeWeight: 1,
                    clickable: true,
                    editable: false,
                    zIndex: 1,
                    draggable: false


                }
            });


            if (IsAdmin()) {
                drawTools.setMap(map);
            }


            if (cargargeocercas()) {


                let cargageo = cargargeocercas();
                cargageo.forEach(element => {

                    const contentString = 'contenido basico';

                    const infowindow = new google.maps.InfoWindow({content: contentString});


                    // console.log(element);

                    var pats = element.geocerca;
                    var name = element.nombre;
                    var domicilio = element.domicilio;

                    let poli = new google.maps.Polygon({
                        fillColor: "#0008ff",
                        fillOpacity: 0.5,
                        strokeWeight: 1,
                        clickable: true,
                        editable: false,
                        zIndex: 1,
                        draggable: false,
                        paths: pats

                    });


                    geocercas.push({'id': index, 'nombre': name, 'domicilio': domicilio, 'geocerca': pats})

                    index++;
                    poli.setMap(map);
                    google.maps.event.addListener(poli, 'mouseover', (polygon) => {
                        var contentString = "<h1>Lugar: " + name + "</h1><br><h3>" + domicilio + "</h3><br>" + polygon.latLng.toUrlValue(6);
                        infowindow.setContent(contentString);
                        infowindow.setPosition(polygon.latLng);
                        infowindow.open(map);

                    })
                    google.maps.event.addListener(poli, 'mouseout', function () {
                        infowindow.close();
                    });


                });
            }


            google.maps.event.addListener(drawTools, "polygoncomplete", (polygon) => { // console.log(polygon.latLngs.we[0].we);
                var paths = polygon.latLngs.we[0].we;
                let name: string = window.prompt("Cual es el nombre del lugar") || '';
                let domicilio: string = window.prompt("Cual es el domicilio del lugar") || '';
                let lati = paths[0].lat;
                let longi = paths[0].lng;


                let lugar22: Lugar = {
                    'nombre': name,
                    'domicilio': domicilio
                };
                const nueva = () => {
                    this.map2service.getLugares().subscribe(data => {
                        let sitios: sitio[];
                        sitios = data;
                        console.log(data);


                    })
                } 
                
                nueva();


                geocercas.push({'id': index, 'nombre': name, 'domicilio': domicilio, 'geocerca': paths})

                index++;

                // console.log(lati(), longi())
                addListenersOnPolygon(geocercas);

                guardageocercas(JSON.stringify(geocercas));


            });


        } 
        initMap();


    }

}


function guardageocercas(guardar: string) {
    localStorage.setItem('geocercas', guardar);
}

function cargargeocercas() {

    if (verificageocercas() != null) {
        return verificageocercas()
    }
    return
}

function verificageocercas() {
    if (localStorage.getItem('geocercas')) {
        return JSON.parse(localStorage.getItem('geocercas')!)
    }
    return null
}

function IsAdmin() {
    let usuario: user;

    var token = localStorage.getItem('auth_token');
    var decode = jwtDecode(token !);
    var decode2 = JSON.stringify(decode);
    usuario = JSON.parse(decode2);
    // console.log("d", decode)
    // console.log("d2", decode2)
    // console.log("usuario", usuario)
    // usuario = JSON.parse(decode);
    // console.log(usuario.role);
    if (usuario.role == "admin") {
        return true;
    } else {
        return false;
    }


}
