import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SIGNUP } from '../shared/feedback';
import {catchError,map,Observable} from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { baseURL } from '../shared/baseurl';
import { faClipboardUser } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class SingupService {
  user?:SIGNUP;
  users!:SIGNUP[];

  constructor(private http:HttpClient,
    private processHttpMsgService:ProcessHttpMsgService,
    ) { this.getUsers().subscribe(use=>this.users=use);}
    submitSignup(signup:SIGNUP):Observable<SIGNUP>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })};
      return this.http.post<SIGNUP>(baseURL+'signup',signup, httpOptions)
      .pipe(
        catchError(this.processHttpMsgService.handleError));
    }
    getUsers():Observable<SIGNUP[]>{
      return this.http.get<SIGNUP[]>(baseURL+'signup')
      .pipe(catchError(this.processHttpMsgService.handleError));

    }
    signupMatch(user:string){
      console.log(user)
      if( user==this.users.filter(option=>option.name.includes(user))[0]?.name){
        return true;
      }
     

      return false;
    }

  loginmatch( user:string):SIGNUP|undefined{
    
    this.user =this.users.filter(option=>option.name.includes(user))[0];
    return this.user;


  }

  getuserIds(): Observable<number[] | any> {
    return this.getUsers().pipe(map(users => users.map(user => user.id)));
  }

  grtUser(id:number):Observable<SIGNUP>{
    return this.http.get<SIGNUP>(baseURL+'signup/'+id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
  editUser(id:number,user:SIGNUP):Observable<SIGNUP>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.put<SIGNUP>(baseURL+'signup/'+id,user,httpOptions)
    .pipe(catchError(this.processHttpMsgService.handleError))
  }

  // getFeaturedDish(): Observable<Dish> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
  //   .pipe(catchError(this.ProcessHttpMsgService.handleError));
  // }

}
