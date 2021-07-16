import { Component, OnInit } from '@angular/core';
import { Enlaces } from '../../models/enlaces';
import { EnlacesService } from '../../services/enlaces.service';

@Component({
  selector: 'app-enlaces',
  templateUrl: './enlaces.component.html',
  styleUrls: ['./enlaces.component.css']
})
export class EnlacesComponent implements OnInit {

  enlaces: Enlaces[] = [];
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
  textoBusqueda = '';

  constructor(private enlacesService: EnlacesService) { }

  ngOnInit(): void {
    this.enlacesService.getEnlaces().subscribe(resp => {
      this.enlaces = resp;
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
