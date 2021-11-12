import { Component } from '@angular/core';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  // Font Awesome Icons
  faCalculator = faCalculator;

}
