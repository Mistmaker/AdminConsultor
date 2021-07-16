import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlWs } from '../../environments/environment.prod';
import { TipoExtension } from '../models/tipoExtension';
import { TipoRepositorio } from '../models/tipoRepositorio';
import { GrupoEnlace } from '../models/grupo-enlace';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = urlWs;
  constructor(private http: HttpClient) { }

  getDatosDashboard() {
    return this.http.get(`${this.url}/getDatosDashboard.php`);
  }

  getTipoExtension() {
    return this.http.get<TipoExtension[]>(`${this.url}/getTipoExtension.php`);
  }
  getTipoRepositorio() {
    return this.http.get<TipoRepositorio[]>(`${this.url}/getTipoRepositorio.php`);
  }
  getGrupoEnlaces(){
    return this.http.get<GrupoEnlace[]>(`${this.url}/getGrupoEnlaces.php`);
  }

}
