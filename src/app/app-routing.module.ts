import { CrearusuarioComponent } from './components/dashboard/usuario/crearusuario/crearusuario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LugaresComponent } from './components/dashboard/lugares/lugares.component';
import { MapaComponent } from './components/dashboard/mapa/mapa.component';
import { RecursosComponent } from './components/dashboard/recursos/recursos.component';
import { ReportesComponent } from './components/dashboard/reportes/reportes.component';
import { UsuariosComponent} from '../app/components/dashboard/usuario/usuarios.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { AccessguardGuard } from './guards/accessguard.guard';
import { EditarusuarioComponent } from './components/dashboard/usuario/editarusuario/editarusuario.component';
import { BorrarusuarioComponent } from './components/dashboard/usuario/borrarusuario/borrarusuario.component';
import { CrearRecursoComponent } from './components/dashboard/recursos/crear-recurso/crear-recurso.component';
import { EditarRecursoComponent } from './components/dashboard/recursos/editar-recurso/editar-recurso.component';
import { EliminarRecursoComponent } from './components/dashboard/recursos/eliminar-recurso/eliminar-recurso.component';
import { EditarLugaresComponent } from './components/dashboard/lugares/editar-lugares/editar-lugares.component';
import { UsuarioRecursoComponent} from '../app/components/dashboard/usuario-recurso/usuario-recurso.component';


const routes: Routes = [
  {path:"", redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio', component: InicioComponent, children:[
    {path:'', component: BienvenidaComponent},
    {path: 'login', component: LoginComponent}
  ]},
  {path: 'dashboard',component: DashboardComponent,children:[
    {path: '',component:MapaComponent},
    {path:'home', component:MapaComponent},
    {path:'usuario', component:UsuariosComponent},
      {path:'crearusuario',component:CrearusuarioComponent},
      {path:'editarusuario/:id',component:EditarusuarioComponent},
      {path:'borrarusuario/:id',component:BorrarusuarioComponent},
    {path:'lugar', component:LugaresComponent},
    {path: 'editarLugar/:id', component: EditarLugaresComponent},
    {path:'recurso', component:RecursosComponent},
    {path: 'crearRecurso', component:CrearRecursoComponent},
    {path: 'editarRecurso/:id', component:EditarRecursoComponent},
    {path: 'eliminarRecurso/:id', component:EliminarRecursoComponent},
    {path:'reporte', component:ReportesComponent},
    {path: 'usuarioRecurso', component:UsuarioRecursoComponent}
  ]}
  ,
  {path:'**', redirectTo:'/inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
