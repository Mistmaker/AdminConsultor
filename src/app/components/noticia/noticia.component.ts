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

  eliminarNoticia(){
    let eliminar = false;
    Swal.fire({
      title: 'Confirmación',text: 'Desea eliminar esta noticia?',icon: 'warning',showDenyButton: true,confirmButtonText: `Eliminar`,denyButtonText: `No eliminar`,denyButtonColor: '#3085d6',confirmButtonColor: '#d33',
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
            Swal.fire('Eliminado!','Se eliminó la noticia','success').then(r => {
              this.router.navigateByUrl('noticias');
            });
          }, error => {
            console.log(error);
            Swal.fire('Error!','Ocurrió un error al eliminar','error'
            );
          })
        }
      }
    });
  }

  cargaArchivo(event: any) {
    this.files = event.target.files;

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
          console.log(this.noticia.IMAGEN_LINK);
        } else {
          Swal.fire({ title: 'Error', text: 'No se puede cargar el archivo, intente nuevamente', icon: 'error', });
        }
      }
    });
  }

}
