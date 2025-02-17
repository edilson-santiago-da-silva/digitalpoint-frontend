import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Point } from '../models/point';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Point[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Point[]>(`${API_CONFIG.baseUrl}/points`, {headers});
  }

  createPoint(point: Point): Observable<Point> {
    return this.http.post<Point>(`${API_CONFIG.baseUrl}/points`, point);
  }

  UpdatePoint(id: any, point: Point): Observable<Point> {
    return this.http.put<Point>(`${API_CONFIG.baseUrl}/points`, point);
  }

}
