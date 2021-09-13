import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { EvaluacionesService } from '../../services/evaluaciones.service';

import { Evaluaciones, Preguntas, Respuestas } from '../../models/evaluaciones';
import { GrupoEvaluaciones } from '../../models/grupoEvaluaciones';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  evaluacion = new Evaluaciones();
  grupos: GrupoEvaluaciones[] = [];
  preguntas: Preguntas[] = [];

  constructor(private evaluacionesService: EvaluacionesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {

      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();

      this.evaluacionesService.getEvaluacion(id).subscribe(resp => {
        this.evaluacion = resp;

        this.evaluacionesService.getPreguntas(this.evaluacion.id_categoria).subscribe(preguntas => {
          this.preguntas = preguntas;
          console.log(this.preguntas);

          this.preguntas.map(p => {
            // console.log(p.respuestas);
            p.respuestas.map(r => {
              const valido: any = r.respuesta_valida;
              r.respuesta_valida = valido == '1' ? true : false;
              // console.log(r);
            });
          });

        });

        Swal.close();
      }, (error) => {
        Swal.fire({ title: 'Error', text: 'No se pudo obtener los datos' })
      });
    }

    this.evaluacionesService.getGruposEvaluacion().subscribe(resp => {
      this.grupos = resp;
    });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.evaluacion.preguntas = this.preguntas;

    // console.log(this.evaluacion);
    // console.log(this.preguntas);
    // return;

    Swal.fire({ title: 'Espere', text: 'Guardando información', allowOutsideClick: false, icon: 'info', });
    Swal.showLoading();

    this.evaluacionesService.setGrupoEvaluacion(this.evaluacion).subscribe((resp: any) => {
      // console.log(resp);

      if (resp['err']) {
        Swal.fire({ title: 'Error', text: resp['mensaje'], icon: 'error', });
      } else {
        Swal.fire({ title: 'Listo', text: 'Realizado exitozamente', icon: 'success', }).then(r => {
          this.router.navigateByUrl('evaluaciones');
        });
      }

    }, error => {
      console.log(error);
      Swal.fire({ title: 'Error', text: 'Ocurrió un error al guardar la Información ', icon: 'error', });
    });

  }

  eliminarEvaluacion() {

  }

  agregarPregunta() {
    const nuevaPregunta = new Preguntas();
    nuevaPregunta.id_categoria = this.evaluacion.id_categoria;
    nuevaPregunta.activo = true;
    nuevaPregunta.respuestas = [];
    this.agregarRespuesta(nuevaPregunta);
    this.preguntas.push(nuevaPregunta);
  }

  agregarRespuesta(pregunta: Preguntas) {
    // console.log(pregunta);
    const nuevaRespuesta = new Respuestas();
    nuevaRespuesta.activo = true;
    nuevaRespuesta.respuesta_valida = false;
    nuevaRespuesta.id_pregunta = pregunta.id_pregunta;
    pregunta.respuestas.push(nuevaRespuesta);
  }

  quitarPregunta(pregunta: Preguntas, pos: number) {
    pregunta.activo = false;
    this.preguntas.splice(pos, 1);
  }

  quitarRespuesta(respuesta: Respuestas, pos: number) {
    respuesta.activo = false;
  }

}
