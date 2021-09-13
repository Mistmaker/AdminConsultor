import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrupoEvaluaciones } from '../models/grupoEvaluaciones';
import { urlWs } from '../../environments/environment.prod';
import { Evaluaciones, Preguntas } from '../models/evaluaciones';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {

  private url = urlWs;

  constructor(private http: HttpClient) { }

  getGruposEvaluacion() {
    return this.http.get<GrupoEvaluaciones[]>(`${this.url}/getCategoriasCuestionario.php`);
  }

  getGrupoEvaluacion(id: string) {
    return this.http.get<GrupoEvaluaciones>(`${this.url}/getCategoriasCuestionario.php?id=${id}`);
  }

  setGrupoEvaluacion(grupo: GrupoEvaluaciones) {
    return this.http.post(`${this.url}/setCategoriaEvaluacion.php`, grupo);
  }

  deleteGrupoEvaluacion(id: number) {
    return this.http.get(`${this.url}/deleteCategoriaCuestionario.php?id=${id}`);
  }

  getEvaluaciones() {
    return this.http.get<Evaluaciones[]>(`${this.url}/getEvaluaciones.php`);
  }
  
  getEvaluacion(id: string) {
    return this.http.get<Evaluaciones>(`${this.url}/getEvaluaciones.php?id=${id}`);
  }

  getPreguntas(idCategoria: number) {
    return this.http.get<Preguntas[]>(`${this.url}/getBancoPreguntas.php?id=${idCategoria}`);
  }

}
