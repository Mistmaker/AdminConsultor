import { Injectable } from '@angular/core';
import { urlWs } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { RepositorioArchivos } from '../models/repositorioArchivos';

@Injectable({
  providedIn: 'root'
})
export class RepositorioService {

  private url = urlWs;

  constructor(private http: HttpClient) { }

  getRespositorioArchivos() {
    return this.http.get<RepositorioArchivos[]>(`${this.url}/getRepositorioArchivos.php`);
  }
  getArchivo(id: string) {
    return this.http.get<RepositorioArchivos>(`${this.url}/getRepositorioArchivos.php?id=${id}`);
  }

  setRepositorioArchivo(archivo: RepositorioArchivos) {
    return this.http.post(`${this.url}/setRepositorioArchivo.php`, archivo);
  }

  uploadFile(fielToUpload: any) {
    // let _headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    let _headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=' + Math.random().toString().substr(2),
      'Accept': 'application/json'
    });
    // return this.http.post(`${this.url}/uploadFile.php`, fielToUpload, { headers: _headers });
    return this.http.post(`http://localhost/test/uploadFile.php`, fielToUpload, { headers: _headers });
    // return this.http.post(`http://144.91.73.120/documentosConsultor/uploadFile.php`, fielToUpload, { headers: _headers });
  }

  uploadFile2(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.url}/uploadFile.php`, formdata, {
      // const req = new HttpRequest('POST', `http://localhost/test/uploadFile.php`, formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadImg(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.url}/uploadImg.php`, formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadFileCurso(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.url}/uploadFileCurso.php`, formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteArchivo(id: number) {
    return this.http.get(`${this.url}/deleteArchivo.php?id=${id}`);
  }

}
