import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Root component. */
@Component({
  selector: 'saanbow-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
