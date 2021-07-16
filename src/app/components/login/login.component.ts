import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuarios';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();

  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Autenticando',
      allowOutsideClick: false,
      icon: 'info',
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe((resp) => {
      this.auth.leerToken();
      if (this.auth.userToken !== null && this.auth.userToken.length > 2) {
        Swal.close();
        this.route.navigateByUrl('home');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
        });
      }
    });
  }

}
