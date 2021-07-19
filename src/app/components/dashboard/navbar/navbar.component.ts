import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import jwtDecode from 'jwt-decode';
import {UsuarioService} from 'src/app/services/usuario.service';

interface user {
    aud: string,
    ​ exp: number,
    idUsuario: number,
    ​iss: string,
    ​ role: string,
    ​ sub: string
}

@Component({selector: 'app-navbar', templateUrl: './navbar.component.html', styleUrls: ['./navbar.component.css']})
export class NavbarComponent implements OnInit {


    constructor(private observer : BreakpointObserver, public usuarioservice : UsuarioService) {}
    @ViewChild(MatSidenav)
    sidenav !: MatSidenav;
    ngOnInit(): void {}
    ngAfterViewInit() {

      

        this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
            if (res.matches) {
                this.sidenav.mode = 'over';
                this.sidenav.close();
            } else {
                this.sidenav.mode = 'over';
                this.sidenav.open();
            }
        });


    }

    public IsAdmin() {
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
