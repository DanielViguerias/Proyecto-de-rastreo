import {Component, OnInit} from '@angular/core';
import {} from 'google.maps';
import jwtDecode from 'jwt-decode';
import {
    Lugar,
    pto,
    punto,
    sitio,
    user
} from "./mapa.interfaces"
import {MapaService} from "../../../services/mapa.service"
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';


@Component({selector: 'app-mapa', templateUrl: './mapa.component.html', styleUrls: ['./mapa.component.css']})


// --- Inicializacion despues de que se inicia la vista --- //
export class MapaComponent implements OnInit {
    lugares : Array < sitio >= []
    ide : number = 0;
    pats !: google.maps.MVCArray<any>;
    geogeo : any[] = [];
    arreglopuntos : punto[] = [];
    geo : Array < pto >= [];
    poli : google.maps.Polygon = new google.maps.Polygon;


    constructor(private map2service : MapaService) {}

    ngOnInit(): void {

        let map: google.maps.Map;
        let marcadores: google.maps.Marker[] = [];
        let geocercas: Lugar[] = [];
        let index: number = 0;
        let sitios: Observable<sitio[]>;


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
                    draggable: false,
                    paths: []


                }
            });


            if (IsAdmin()) {
                drawTools.setMap(map);
            }

            this.map2service.getLugares().subscribe((data : sitio[]) => {
                data.forEach(Lu => {
                    const contentString = 'contenido basico';

                    const infowindow = new google.maps.InfoWindow({content: contentString});

                    this.map2service.getPunto(Lu.lugarId).subscribe((res) => {
                        this.geogeo = res
                        var name = Lu.nombre;
                        var domicilio = Lu.domicilio;
                        // console.log(this.geogeo)
                        this.poli = new google.maps.Polygon({
                            fillColor: "#0008ff",
                            fillOpacity: 0.5,
                            strokeWeight: 1,
                            clickable: true,
                            editable: false,
                            zIndex: 1,
                            draggable: false,
                            paths: this.geogeo
                        });
                        this.poli.setMap(map);
                        this.geogeo = [];
                        google.maps.event.addListener(this.poli, 'mouseover', (polygon) => {
                            var contentString = "<h1>Lugar: " + name + "</h1><br><h3>" + domicilio + "</h3><br>" + polygon.latLng.toUrlValue(6);
                            infowindow.setContent(contentString);
                            infowindow.setPosition(polygon.latLng);
                            infowindow.open(map);

                        })
                        google.maps.event.addListener(this.poli, 'mouseout', function () {
                            infowindow.close();
                        });
                       
                        //let lat = new google.maps.LatLng({ lat: 21.921288447172834  ,lng: -102.29500943840667});
                        let lat = new google.maps.LatLng({ lat: 21.921266674731527 ,lng: -102.29528168260927});
                        console.log(google.maps.geometry.poly.isLocationOnEdge( lat ,this.poli,0.0001),"polii",this.poli)
                       
                       
                        google.maps.event.addListener(this.poli, "rightclick", (polygon) => {

                            const respuesta = prompt("quiere borrar el perimetro?")
                            if (respuesta ?. toLowerCase() == "si") {
                                this.map2service.deletePuntos(Lu.lugarId).subscribe(x => x);
                                this.map2service.deleteLugar(Lu.lugarId).subscribe(x => x);
                                alert("Eliminado con exito");
                                this.ngOnInit();
                            } else {
                                alert("No se Elimino el perimetro");
                            }
                        });
                    },

                        error => console.log(error));



                }, error => console.log(error))

            }, (error : any) => {
                console.log(error)
            });


            google.maps.event.addListener(drawTools, "polygoncomplete", async (polygon) => {

                var paths = polygon.getPath().getArray(); // obtiene el arreglo del poligono
                let name: string = window.prompt("Cual es el nombre del lugar") || ''; // pide el nombre
                let domicilio: string = window.prompt("Cual es el domicilio del lugar") || ''; // pide el domicilio
                let lat = paths[0].lat(); // extrae primer latitud
                let lng = paths[0].lng();
                // extrae primer longitud

                // se crea el lugar con la informacion
                let lugar22: Lugar = {
                    'nombre': name,
                    'domicilio': domicilio,
                    'geocerca': paths
                };
                this.ide = 0;
                // se registra el lugar y se registra el id del lugar
                await this.map2service.postLugar(lugar22, lat, lng).forEach((si) => {
                    this.ide = si.lugarId
                });
                // console.log(this.ide, "el ideee");
                // por cada punto de paths se sacan coordenadas
                paths.forEach((element) => {

                    let la = element.lat();
                    let ln = element.lng();
                    let id = this.ide;

                    // console.log(la,"la")
                    // console.log(ln,"ln")
                    // console.log(id,"id")

                    let punto: punto = {
                        'LugarId': id,
                        'latitud': la,
                        'longitud': ln
                    }
                    this.arreglopuntos.unshift(punto);


                });


                this.arreglopuntos.forEach(async x => {

                    await this.map2service.postPunto(x).subscribe(async (data : punto) => {
                        function sleep(ms) {
                            return new Promise(resolve => setTimeout(resolve, ms));
                        }

                        sleep(3000).then(() => {
                            console.log(data);
                        })


                    }, (error : any) => {
                        console.log(error);
                    });

                });
                delay(10000);
                this.arreglopuntos = [];

                this.ngOnInit();
            });

        };
        initMap();

        function IsAdmin() {
            let usuario: user;

            var token = localStorage.getItem('auth_token');
            var decode = jwtDecode(token !);
            var decode2 = JSON.stringify(decode);
            usuario = JSON.parse(decode2);
            if (usuario.role == "admin") {
                return true;
            } else {
                return false;
            }
        }

    }
}
