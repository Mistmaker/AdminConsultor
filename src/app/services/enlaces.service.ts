import { Injectable } from '@angular/core';
import { urlWs } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Enlaces } from '../models/enlaces';

@Injectable({
  providedIn: 'root'
})
export class EnlacesService {

  private url = urlWs;

  constructor(private http: HttpClient) { }

  getEnlaces() {
    return this.http.get<Enlaces[]>(`${this.url}/getEnlacesAdmin.php`);
  }

  getEnlace(id: string) {
    return this.http.get<Enlaces>(`${this.url}/getEnlacesAdmin.php?id=${id}`);
  }

  setEnlace(enlace: Enlaces) {
    return this.http.post(`${this.url}/setEnlace.php`, enlace);
  }

  deleteEnlace(id: number) {
    return this.http.get(`${this.url}/deleteEnlace.php?id=${id}`);
  }

}
