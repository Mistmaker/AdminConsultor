import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlWs } from '../../environments/environment.prod';
import { Noticia } from '../models/noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private url = urlWs;

  constructor(private http: HttpClient) { }

  getNoticias(){
    return this.http.get<Noticia[]>(`${this.url}/getNoticiasAdmin.php`);
  }

  getNoticia(id: string){
    return this.http.get<Noticia>(`${this.url}/getNoticiasAdmin.php?id=${id}`);
  }

  setNoticia(noticia: Noticia) {
    return this.http.post(`${this.url}/setNoticia.php`, noticia);
  }

  deleteNoticia(id: number) {
    return this.http.get(`${this.url}/deleteNoticia.php?id=${id}`);
  }
}
