import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Noticia } from '../../models/noticias';

import Swal from 'sweetalert2';
import { NoticiasService } from '../../services/noticias.service';
import { RepositorioService } from '../../services/repositorio.service';
import { HttpResponse } from '@angular/common/http';
import { urlWs } from 'src/environments/environment.prod';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  noticia = new Noticia();
  files: FileList | undefined;
  cargando = false;
  cargado = false;
  nombreArchivo: string | undefined;

  constructor(private noticiasService: NoticiasService, private repositorioService: RepositorioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {
      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();
      this.noticiasService.getNoticia(id).subscribe(resp => {
        this.noticia = resp;
        Swal.close();
      }, (error) => {
        Swal.fire({ title: 'Error', text: 'No se pudo obtener los datos' })
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if ((this.noticia.FUENTE_LINK && this.noticia.FUENTE_LINK !== '') && this.noticia.TEXTO_BOTON1 === '') { Swal.fire({ title: 'Advertencia', text: `Agregue una descripción para el enlace`, icon: 'warning', }); return; }
    if ((this.noticia.LINK_BOTON2 && this.noticia.LINK_BOTON2 !== '') && this.noticia.TEXTO_BOTON2 === '') { Swal.fire({ title: 'Advertencia', text: `Agregue una descripción para el 2do enlace`, icon: 'warning', }); return; }

    Swal.fire({ title: 'Espere', text: 'Guardando información', allowOutsideClick: false, icon: 'info', });
    Swal.showLoading();

    this.noticiasService.setNoticia(this.noticia).subscribe((resp: any) => {
      console.log(resp);

      if (resp['err']) {
        Swal.fire({ title: 'Error', text: resp['mensaje'], icon: 'error', });
      } else {
        Swal.fire({ title: 'Listo', text: 'Realizado exitozamente', icon: 'success', }).then(r => {
          this.router.navigateByUrl('noticias');
        });
      }

    }, error => {
      console.log(error);
      Swal.fire({ title: 'Error', text: 'Ocurrió un error al guardar la Información ', icon: 'error', });
    });

  }

  eliminarNoticia() {
    let eliminar = false;
    Swal.fire({
      title: 'Confirmación', text: 'Desea eliminar esta noticia?', icon: 'warning', showDenyButton: true, confirmButtonText: `Eliminar`, denyButtonText: `No eliminar`, denyButtonColor: '#3085d6', confirmButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar = true;
        if (eliminar) {
          Swal.fire({
            title: 'Espere',
            text: 'Eliminando información',
            allowOutsideClick: false,
            icon: 'info',
          });
          Swal.showLoading();

          this.noticiasService.deleteNoticia(this.noticia.id!).subscribe(resp => {
            Swal.fire('Eliminado!', 'Se eliminó la noticia', 'success').then(r => {
              this.router.navigateByUrl('noticias');
            });
          }, error => {
            console.log(error);
            Swal.fire('Error!', 'Ocurrió un error al eliminar', 'error'
            );
          })
        }
      }
    });
  }

  cargaArchivo(event: any, tipo = 'img') {
    this.files = event.target.files;

    if (tipo == 'img') {
      const currentFile = this.files!.item(0);
      // console.log(currentFile);
      this.repositorioService.uploadImg(currentFile!).subscribe((response: any) => {
        // this.files!.value = '';
        if (response instanceof HttpResponse) {
          // this.msg = response.body;
          // console.log(response.body);
          if (response.body.resultado === true) {
            // console.log('cargado con exito')
            this.noticia.IMAGEN_LINK = `${urlWs}/img/noticias/${currentFile?.name}`;
            // console.log(this.noticia.IMAGEN_LINK);
          } else {
            Swal.fire({ title: 'Error', text: 'No se puede cargar el archivo, intente nuevamente', icon: 'error', });
          }
        }
      });
    } else {
      this.cargado = false;
      this.cargando = true;
      const currentFile = this.files!.item(0);
      this.repositorioService.uploadFileCurso(currentFile!).subscribe((response: any) => {
        if (response instanceof HttpResponse) {
          if (response.body.resultado === true) {
            this.noticia.LINK_BOTON2 = `${urlWs}/documentos/materialcursos/${currentFile?.name}`;
            this.cargando = false;
            this.cargado = true;
            this.nombreArchivo = currentFile?.name;
            // console.log(this.noticia.LINK_BOTON2);
          } else {
            Swal.fire({ title: 'Error', text: 'No se puede cargar el archivo, intente nuevamente', icon: 'error', });
          }
        }
      });
    }

  }

}
