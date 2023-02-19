import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Navbar component. */
@Component(
  {
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  },
)

export class NavbarComponent {}
