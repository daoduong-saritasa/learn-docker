import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Checkmark component. */
@Component(
  {
    selector: 'checkmark',
    templateUrl: './checkmark.component.html',
    styleUrls: ['./checkmark.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  },
)

export class CheckmarkComponent {}
