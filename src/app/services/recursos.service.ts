import { CookieService } from 'ngx-cookie-service';
import { RecursosI } from '../models/recursos.interface';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PeticionesInterceptor } from '../interceptores/peticiones.interceptor';
import { catchError } from 'rxjs/operators';
import { putRecursosI } from '../models/recursoPut';
@Injectable({
  providedIn: 'root'
})
export class RecursoService implements OnInit{
 private urlApi  = "http://localhost:5000/api/";
 
  
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

get_recursos(): Observable<RecursosI[]> {
  return this.http.get<RecursosI[]>(this.urlApi + "Recurso");
 }
 crear_recurso(post: RecursosI): Observable<RecursosI> {
  return this.http.post<RecursosI>(this.urlApi + 'Recurso',post , this.httpOptions)
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
putRecurso(form: putRecursosI,id:any):Observable<putRecursosI>{
  // form.active = true;
  let url = this.urlApi + "Recurso/" + id;
  return this.http.put<putRecursosI>(url,form)
}
get_recurso(id:any): Observable<putRecursosI>{
  let url = this.urlApi + "Recurso/" + id;
  return this.http.get<putRecursosI>(url);
}
delete(form:RecursosI,id:any):Observable<RecursosI>{
  let url = this.urlApi + "Recurso/" + id
  let options = {
    headers: new HttpHeaders({
      'Content-type':'application/json'
    }),
    body:form
  }
  return this.http.delete<RecursosI>(url,options)

}
deleterecurso(recursoId: RecursosI){
  const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'auth_token' };
  this.http.delete(this.urlApi + `${recursoId}`, { headers })
      .subscribe(res =>{
        console.log(res);
      },err => {
        console.log(err);
      });
}

}