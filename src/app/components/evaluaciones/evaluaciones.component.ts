import { Component, OnInit } from '@angular/core';
import { EvaluacionesService } from '../../services/evaluaciones.service';
import { Evaluaciones } from '../../models/evaluaciones';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent implements OnInit {

  // enlaces: Enlaces[] = [];
  evaluaciones: Evaluaciones[] = [];
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  textoBusqueda = '';

  constructor(private evaluacionesService: EvaluacionesService) { }

  ngOnInit(): void {
    this.evaluacionesService.getEvaluaciones().subscribe(resp => {
      this.evaluaciones = resp;
      // console.log(this.evaluaciones);
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
