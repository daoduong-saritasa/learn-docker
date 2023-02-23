import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';

/** Navbar component. */
@Component(
  {
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  },
)

export class NavbarComponent {

  /** User. */
  public readonly user$: Observable<any>;

  /** Constructor. */
  public constructor() {
    this.user$ = of(
      {
        name: 'John Doe',
      },
    );
  }
}
