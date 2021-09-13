import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { RepositorioArchivos } from '../../models/repositorioArchivos';
import { RepositorioService } from '../../services/repositorio.service';
import { DataService } from '../../services/data.service';
import { TipoRepositorio } from '../../models/tipoRepositorio';
import { TipoExtension } from '../../models/tipoExtension';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { urlWs } from 'src/environments/environment.prod';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

  archivo = new RepositorioArchivos();
  tipos: TipoRepositorio[] = [];
  extensiones: TipoExtension[] = [];
  imgExtension = '';
  usarLinkExterno = false;
  files: FileList | undefined;

  cargando = false;
  cargado = false;
  nombreArchivo: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private repositorioService: RepositorioService, private dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {

      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();

      this.repositorioService.getArchivo(id).subscribe(resp => {
        this.archivo = resp;
        this.dataService.getTipoRepositorio().subscribe(resp => {
          this.tipos = resp;
          this.cargarImagenTipo();
        });
        Swal.close();
      }, (error) => {
        Swal.fire({ title: 'Error', text: 'No se pudo obtener los datos' })
      });
    }

    this.dataService.getTipoExtension().subscribe(resp => {
      this.extensiones = resp;
    });

    this.dataService.getTipoRepositorio().subscribe(resp => {
      this.tipos = resp;
      this.cargarImagenTipo();
    });

  }

  guardar(form: NgForm) {
    // console.log(this.archivo);
    if (form.invalid) {
      return;
    }

    if(!this.archivo.LINK_ARCHIVO || this.archivo.LINK_ARCHIVO === ''){
      Swal.fire({ title: 'Advertencia', text: 'Seleccione el archivo y espere a que se cargue o ingrese un enlace para el mismo', icon: 'warning' });
      return;
    }

    Swal.fire({ title: 'Espere', text: 'Guardando información', allowOutsideClick: false, icon: 'info', });
    Swal.showLoading();

    this.repositorioService.setRepositorioArchivo(this.archivo).subscribe((resp: any) => {
      // console.log(resp);

      if (resp['err']) {
        Swal.fire({ title: 'Error', text: resp['mensaje'], icon: 'error', });
      } else {
        Swal.fire({ title: 'Listo', text: 'Realizado exitozamente', icon: 'success', }).then(r => {
          this.router.navigateByUrl('repositorio');
        });
      }

    }, error => {
      console.log(error);
      Swal.fire({ title: 'Error', text: 'Ocurrió un error al guardar la Información ', icon: 'error', });
    });

  }

  eliminarArchivo(){
    let eliminar = false;
    Swal.fire({
      title: 'Confirmación',text: 'Desea eliminar este enlace?',icon: 'warning',showDenyButton: true,confirmButtonText: `Eliminar`,denyButtonText: `No eliminar`,denyButtonColor: '#3085d6',confirmButtonColor: '#d33',
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

          this.repositorioService.deleteArchivo(this.archivo.id!).subscribe(resp => {
            // console.log(resp);
            Swal.fire('Eliminado!','Se eliminó el enlace','success').then(r => {
              this.router.navigateByUrl('repositorio');
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
    this.cargando = true;
    const currentFile = this.files!.item(0);
    this.repositorioService.uploadFile2(currentFile!).subscribe((response: any) => {
      // this.files!.value = '';
      if (response instanceof HttpResponse) {
        // this.msg = response.body;
        // console.log(response.body);
        if (response.body.resultado === true) {
          // console.log('cargado con exito')
          this.cargando = false;
          this.cargado = true;
          this.nombreArchivo =currentFile?.name;
          this.archivo.LINK_ARCHIVO = `${urlWs}/documentos/${currentFile?.name}`;
          // console.log(this.archivo.LINK_ARCHIVO);
          // setTimeout(() => {
          //   this.cargado = false;
          // }, 4000);
        } else {
          Swal.fire({ title: 'Error', text: 'No se puede cargar el archivo, intente nuevamente', icon: 'error', });
        }
      }
    });

  }

  cargarImagenTipo() {
    for (const ext of this.extensiones) {
      if (ext.id === this.archivo.ID_EXTENSION) {
        this.imgExtension = ext.LINK_ICONO || '';
      }
    }
  }

}
