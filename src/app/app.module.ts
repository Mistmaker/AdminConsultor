import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RepositorioArchivosComponent } from './components/repositorio-archivos/repositorio-archivos.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroPipe } from './pipes/filtro.pipe';
import { ArchivoComponent } from './components/archivo/archivo.component';
import { EnlacesComponent } from './components/enlaces/enlaces.component';
import { EnlaceComponent } from './components/enlace/enlace.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaComponent } from './components/noticia/noticia.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RepositorioArchivosComponent,
    FiltroPipe,
    ArchivoComponent,
    EnlacesComponent,
    EnlaceComponent,
    NoticiasComponent,
    NoticiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
