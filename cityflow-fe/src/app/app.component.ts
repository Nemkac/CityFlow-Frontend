import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidePannelComponent } from './components/side-panel/side-panel.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidePannelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cityflow-fe';
}
