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

  updatePoint(id: any, point: Point): Observable<Point> {
    return this.http.put<Point>(`${API_CONFIG.baseUrl}/points`, point);
  }

  getTodayPoint(userId: number, workDay: string): Observable<Point | null> {
    return this.http.get<Point | null>(`${API_CONFIG.baseUrl}/user/${userId}}/date/${workDay}`);
  }
}
