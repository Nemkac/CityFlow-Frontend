import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Dodaj ako planiraš da koristiš ruting
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NgToastComponent } from 'ng-angular-popup';

@NgModule({
  declarations: [ // Dodaj AppComponent u deklaracije
  ],
  imports: [
    BrowserModule,  // Neophodno za pokretanje aplikacije u pregledaču
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),  // Dodaj prazan niz ruta ili konfiguriši rute
    FontAwesomeModule,
    NgbModule
  ],
  providers: [NgToastComponent],
  bootstrap: []  // Definiše root komponentu koja se pokreće
})
export class AppModule { }
