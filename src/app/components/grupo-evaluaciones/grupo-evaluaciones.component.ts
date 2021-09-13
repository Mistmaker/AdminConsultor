import { Component, OnInit } from '@angular/core';
import { GrupoEvaluaciones } from '../../models/grupoEvaluaciones';
import { EvaluacionesService } from '../../services/evaluaciones.service';

@Component({
  selector: 'app-grupo-evaluaciones',
  templateUrl: './grupo-evaluaciones.component.html',
  styleUrls: ['./grupo-evaluaciones.component.css']
})
export class GrupoEvaluacionesComponent implements OnInit {

  grupoEvaluaciones: GrupoEvaluaciones[] = [];
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  textoBusqueda = '';

  constructor(private evaluacionesService: EvaluacionesService) { }

  ngOnInit(): void {
    this.evaluacionesService.getGruposEvaluacion().subscribe(resp => {
      this.grupoEvaluaciones = resp;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
