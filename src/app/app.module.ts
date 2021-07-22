

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DpDatePickerModule} from 'ng2-date-picker';
import {MatInputModule} from '@angular/material/input';


import {MatNativeDateModule} from '@angular/material/core';
//modulos
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


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
import { CrearRecursoComponent } from './components/dashboard/recursos/crear-recurso/crear-recurso.component';
import { EditarRecursoComponent } from './components/dashboard/recursos/editar-recurso/editar-recurso.component';
import { EliminarRecursoComponent } from './components/dashboard/recursos/eliminar-recurso/eliminar-recurso.component';
import { EditarLugaresComponent } from './components/dashboard/lugares/editar-lugares/editar-lugares.component';
import { UsuarioRecursoComponent} from './components/dashboard/usuario-recurso/usuario-recurso.component';
import { NuevoMovimientoComponent } from './components/dashboard/usuario-recurso/nuevo-movimiento/nuevo-movimiento.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
        BorrarusuarioComponent,
        CrearRecursoComponent,
        EditarRecursoComponent,
        EliminarRecursoComponent,
        EditarLugaresComponent,
        UsuarioRecursoComponent,
        NuevoMovimientoComponent
        
   
  ],
  imports: [
    BrowserModule,
    DpDatePickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatInputModule,
    MatNativeDateModule,
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
   HttpClientModule,
   JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ["localhost:5000"],
      blacklistedRoutes: []
    }
  }),
   NgbModule
   
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
