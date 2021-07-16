import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  salir() {
    this.auth.cerrarSesion();
    this.route.navigateByUrl('\login');
  }

  hasRoute(ruta: string) {
    return !this.route.url.includes(ruta);
  }

}
