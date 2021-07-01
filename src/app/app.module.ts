

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modulos
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

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
import { UsuariosComponent} from '../app/components/dashboard/usuario/usuarios.component';
import { LugaresComponent } from './components/dashboard/lugares/lugares.component';
import { ReportesComponent } from './components/dashboard/reportes/reportes.component';
import { RecursosComponent } from './components/dashboard/recursos/recursos.component';
import { CrearusuarioComponent } from './components/dashboard/usuario/crearusuario/crearusuario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './services/data.service';
import { PeticionesInterceptor } from './interceptores/peticiones.interceptor';
import {  MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { EditarusuarioComponent } from './components/dashboard/usuario/editarusuario/editarusuario.component';
import { BorrarusuarioComponent } from './components/dashboard/usuario/borrarusuario/borrarusuario.component';
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
        CrearusuarioComponent,
        EditarusuarioComponent,
        BorrarusuarioComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MatOptionModule,
    MatSelectModule,
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
  providers: [
    CookieService,CrearusuarioComponent,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:PeticionesInterceptor,
      multi:true
    },
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
