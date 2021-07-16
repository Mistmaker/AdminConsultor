import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuarios';
import { urlWs } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = urlWs;

  userToken!: string;

  constructor(private http: HttpClient) {
  }

  login(usuario: Usuario) {
    return this.http.post(`${this.url}/loginAdmin.php`, usuario).pipe(
      map((resp: any) => {
        if (resp.token) {
          this.guardarToken(resp.token);
          return resp;
        }
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userToken = token;
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  autenticado(): boolean {
    this.leerToken();
    return this.userToken.length > 2;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }

}
