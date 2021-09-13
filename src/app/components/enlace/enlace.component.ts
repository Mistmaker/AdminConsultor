import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { Enlaces } from '../../models/enlaces';
import { GrupoEnlace } from '../../models/grupo-enlace';
import { EnlacesService } from '../../services/enlaces.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-enlace',
  templateUrl: './enlace.component.html',
  styleUrls: ['./enlace.component.css']
})
export class EnlaceComponent implements OnInit {

  enlace = new Enlaces();
  grupos: GrupoEnlace[] = [];

  constructor(private enlacesService: EnlacesService, private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {

      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();

      this.enlacesService.getEnlace(id).subscribe(resp => {
        this.enlace = resp;
        Swal.close();
      }, (error) => {
        Swal.fire({ title: 'Error', text: 'No se pudo obtener los datos' })
      });
    }

    this.dataService.getGrupoEnlaces().subscribe(resp => {
      this.grupos = resp;
    });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({ title: 'Espere', text: 'Guardando información', allowOutsideClick: false, icon: 'info', });
    Swal.showLoading();

    this.enlacesService.setEnlace(this.enlace).subscribe((resp: any) => {
      // console.log(resp);

      if (resp['err']) {
        Swal.fire({ title: 'Error', text: resp['mensaje'], icon: 'error', });
      } else {
        Swal.fire({ title: 'Listo', text: 'Realizado exitozamente', icon: 'success', }).then(r => {
          this.router.navigateByUrl('links');
        });
      }

    }, error => {
      console.log(error);
      Swal.fire({ title: 'Error', text: 'Ocurrió un error al guardar la Información ', icon: 'error', });
    });

  }

  eliminarEnlace(){
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

          this.enlacesService.deleteEnlace(this.enlace.id!).subscribe(resp => {
            Swal.fire('Eliminado!','Se eliminó el enlace','success').then(r => {
              this.router.navigateByUrl('links');
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

}
