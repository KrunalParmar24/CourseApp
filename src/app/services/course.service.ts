import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private httpHeaders : HttpHeaders;

  constructor(private httpClient : HttpClient) {
    this.httpHeaders = new HttpHeaders({ 'content-type' : 'application/json'});
   }

  GetCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.apiAddress + "/Course/GetAll");
  }

  GetCourseByID(id : number): Observable<Course> {
    return this.httpClient.get<Course>(environment.apiAddress + "/Course/Get/" + id);
  }

  AddCourse(course : Course) : Observable<HttpResponse<any>>{
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress+'/Course/Add',
    course,
    {headers:this.httpHeaders, observe:'response' });
  }

  UpdateCourse(course : Course) : Observable<HttpResponse<any>>{
    return this.httpClient.put<HttpResponse<any>>(environment.apiAddress+'/Course/Update/'+course.id,
    course,
    {headers:this.httpHeaders, observe:'response' });
  }

  DeleteCourse(id : number) : Observable<HttpResponse<any>>{
    return this.httpClient.delete<HttpResponse<any>>(environment.apiAddress+'/Course/Delete/'+id,
    {headers:this.httpHeaders, observe:'response' });
  }
}
