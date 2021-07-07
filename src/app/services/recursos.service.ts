import { CookieService } from 'ngx-cookie-service';
import { RecursosI } from '../models/recursos.interface';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PeticionesInterceptor } from '../interceptores/peticiones.interceptor';
import { catchError } from 'rxjs/operators';
import { PutRecursosI } from '../models/recursosPut';
@Injectable({
  providedIn: 'root'
})
export class RecursoService implements OnInit{
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
  deleterecurso(recursoId: RecursosI){
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'auth_token' };
    this.http.delete(this.urlApi + `${recursoId}`, { headers })
        .subscribe(res =>{
          console.log(res);
        },err => {
          console.log(err);
        });
  }

  putrecurso(form: PutRecursosI,id:any):Observable<PutRecursosI>{
    form.active = true;
    let url = this.urlApi + "Recurso/" + id
    return this.http.put<PutRecursosI>(url,form)
  }
  get_recurso(id:any): Observable<PutRecursosI>{
    let url = this.urlApi + "Recurso/" + id
    return this.http.get<PutRecursosI>(url);
  }
  logout(){
    localStorage.removeItem("auth_token")
    this.cookies.deleteAll("auth_token")
    this.router.navigateByUrl('/inicio')
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
  
}