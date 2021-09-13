import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

import { EvaluacionesService } from '../../services/evaluaciones.service';
import { GrupoEvaluaciones } from '../../models/grupoEvaluaciones';


@Component({
  selector: 'app-grupo-evaluacion',
  templateUrl: './grupo-evaluacion.component.html',
  styleUrls: ['./grupo-evaluacion.component.css']
})
export class GrupoEvaluacionComponent implements OnInit {

  grupo = new GrupoEvaluaciones();

  constructor(private evaluacionesService: EvaluacionesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {

      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();

      this.evaluacionesService.getGrupoEvaluacion(id).subscribe(resp => {
        this.grupo = resp;
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

    this.evaluacionesService.setGrupoEvaluacion(this.grupo).subscribe((resp: any) => {
      console.log(resp);

      if (resp['err']) {
        Swal.fire({ title: 'Error', text: resp['mensaje'], icon: 'error', });
      } else {
        Swal.fire({ title: 'Listo', text: 'Realizado exitozamente', icon: 'success', }).then(r => {
          this.router.navigateByUrl('grupo-evaluaciones');
        });
      }

    }, error => {
      console.log(error);
      Swal.fire({ title: 'Error', text: 'Ocurrió un error al guardar la Información ', icon: 'error', });
    });

  }

  eliminarGrupo() {
    let eliminar = false;
    Swal.fire({ title: 'Confirmación', text: 'Desea eliminar este grupo?', icon: 'warning', showDenyButton: true, confirmButtonText: `Eliminar`, denyButtonText: `No eliminar`, denyButtonColor: '#3085d6', confirmButtonColor: '#d33', }).then((result) => {
      if (result.isConfirmed) {
        eliminar = true;
        if (eliminar) {
          Swal.fire({ title: 'Espere', text: 'Eliminando información', allowOutsideClick: false, icon: 'info', });
          Swal.showLoading();

          this.evaluacionesService.deleteGrupoEvaluacion(this.grupo.id_categoria!).subscribe((resp: any) => {
            if (resp['err'] == true) {
              Swal.fire('Error!', resp['mensaje'], 'error');
            } else {
              Swal.fire('Eliminado!', 'Se eliminó el grupo', 'success').then(r => {
                this.router.navigateByUrl('grupo-evaluaciones');
              });
            }
          }, error => {
            console.log(error);
            Swal.fire('Error!', 'Ocurrió un error al eliminar', 'error'
            );
          })
        }
      }
    });
  }

}
