import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { ProcessHttpMsgService } from './process-http-msg.service';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,
    private ProcessHttpMsgService:ProcessHttpMsgService) { }
    submitFeedback(feedback:Feedback):Observable<Feedback>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })};
      return this.http.post<Feedback>(baseURL+'feedback',feedback, httpOptions)
      .pipe(
        catchError(this.ProcessHttpMsgService.handleError));
    }
  }
