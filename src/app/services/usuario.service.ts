import { ListaUsuariosI } from './../models/usuarios.interface';
import { CookieService } from 'ngx-cookie-service';

import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { putusuarioI } from '../models/usuarioPUT';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements OnInit{
  private urlApi  = "https://localhost:5001/api/";
 
  
 constructor(private http:HttpClient,
  private router:Router,
  private toastr:ToastrService,
  private cookies:CookieService){
  
 }
ngOnInit():void{
  
}
httpOptions = {

  headers: new HttpHeaders({

    'Content-Type': 'application/json'

  })

}
get_usuarios(): Observable<ListaUsuariosI[]> {
  return this.http.get<ListaUsuariosI[]>(this.urlApi + "Usuario");
 }

 crear_usuario(post: ListaUsuariosI): Observable<ListaUsuariosI> {

  return this.http.post<ListaUsuariosI>(this.urlApi + 'Usuario',post , this.httpOptions)

  .pipe(

    catchError(this.errorHandler)

  )

}  
errorHandler(error: { error: { message: string; }; status: any; message: any; }) {

  let errorMessage = '';

  if(error.error instanceof ErrorEvent) {

    errorMessage = error.error.message;

  } else {

    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

  }

  return throwError(errorMessage);

}
  deleteuser(usuarioid: ListaUsuariosI){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'auth_token' };
    this.http.delete(this.urlApi + `${usuarioid}`, { headers })
        .subscribe(res =>{
          console.log(res);
        },err => {
          console.log(err);
        });
  }

  putuser(form: putusuarioI,id:any):Observable<putusuarioI>{
    let url = this.urlApi + "Usuario/" + id
    return this.http.put<putusuarioI>(url,form)
  }
  get_user(id:any): Observable<putusuarioI>{
    let url = this.urlApi + "Usuario/" + id
    return this.http.get<putusuarioI>(url);
  }
  logout(){
    localStorage.removeItem("auth_token")
    this.cookies.deleteAll("auth_token")
    this.router.navigateByUrl('/inicio')
  }
  delete(form:ListaUsuariosI,id:any):Observable<ListaUsuariosI>{
    let url = this.urlApi + "Usuario/" + id
    let options = {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      }),
      body:form
    }
    return this.http.delete<ListaUsuariosI>(url,options);
    

  }
  
  
}