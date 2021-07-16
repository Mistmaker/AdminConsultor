import { Component, OnInit } from '@angular/core';
import { RepositorioArchivos } from '../../models/repositorioArchivos';
import { RepositorioService } from '../../services/repositorio.service';

@Component({
  selector: 'app-repositorio-archivos',
  templateUrl: './repositorio-archivos.component.html',
  styleUrls: ['./repositorio-archivos.component.css']
})
export class RepositorioArchivosComponent implements OnInit {

  repositorio: RepositorioArchivos[] = [];
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  textoBusqueda = '';

  constructor(private repositorioService: RepositorioService) { }

  ngOnInit(): void {
    this.repositorioService.getRespositorioArchivos().subscribe(resp => {
      this.repositorio = resp;
      // console.log(resp);
    })
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
