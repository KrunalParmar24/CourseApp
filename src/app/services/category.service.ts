import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }

  GetCategories(): Observable<HttpResponse<Category[]>> {
    return this.httpClient.get<Category[]>(environment.apiAddress + "/Category/GetAll", {observe : 'response'});
  }
  // GetCategoryByID(id : number): Observable<Category> {
  //   return this.httpClient.get<Category>(environment.apiAddress + "/Category/GetCategoryByID");
  // }
}
