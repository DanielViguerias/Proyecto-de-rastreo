

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modulos
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatGridListModule} from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {CookieService} from "ngx-cookie-service";

//componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { MapaComponent } from './components/dashboard/mapa/mapa.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { AgmCoreModule } from '@agm/core';
import { UsuariosComponent } from './components/dashboard/usuarios/usuarios.component';
import { LugaresComponent } from './components/dashboard/lugares/lugares.component';
import { ReportesComponent } from './components/dashboard/reportes/reportes.component';
import { RecursosComponent } from './components/dashboard/recursos/recursos.component';
import { CrearusuarioComponent } from './components/dashboard/crearusuario/crearusuario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './services/login.service';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BienvenidaComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    MapaComponent,
   
    LoadingComponent,
        UsuariosComponent,
        LugaresComponent,
        ReportesComponent,
        RecursosComponent,
        CrearusuarioComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatGridListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCIl1tt4ATvtVLkyvPLC96PwQZCsKf6tWo'    
   }),
   HttpClientModule,
   JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ["localhost:5000"],
      blacklistedRoutes: []
    }
  })
   
  ],
  providers: [CookieService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
