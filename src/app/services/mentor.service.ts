import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mentor } from '../models/mentor';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private httpClient : HttpClient) { }

  GetMentors(): Observable<HttpResponse<Mentor[]>> {
    return this.httpClient.get<Mentor[]>(environment.apiAddress + "/Mentor/GetAll", {observe : 'response'});
  }
}
