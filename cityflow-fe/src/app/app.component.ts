import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidePannelComponent } from './components/side-panel/side-panel.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidePannelComponent, NgToastModule, FullCalendarModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cityflow-fe';
}
