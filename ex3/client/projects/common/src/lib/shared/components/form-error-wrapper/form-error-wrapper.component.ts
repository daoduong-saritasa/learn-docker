import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControlDirective, NgControl, NgModel, ValidationErrors } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { listenControlTouched } from '@saanbo/common/core/utils/rxjs/listen-control-touched';
import { AppValidators } from '@saanbo/common/core/utils/validators';
import { distinct, EMPTY, filter, map, merge, Observable, ReplaySubject, switchMap, tap } from 'rxjs';

/** Wrapper component that queries errors from form control directive and presents it. */
@UntilDestroy()
@Component({
  selector: 'saanboc-form-error-wrapper',
  templateUrl: './form-error-wrapper.component.html',
  styleUrls: ['./form-error-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorWrapperComponent implements OnInit {

  /** Form control directive. */
  protected readonly input$ = new ReplaySubject<NgModel | FormControlDirective>(1);

  /** Errors stream. */
  protected readonly errorsSubject = new ReplaySubject<ValidationErrors | null>(1);

  /** Catch inner input by form control directive. */
  @ContentChild(NgControl, { descendants: true })
  public set input(i: NgModel | FormControlDirective) {
    if (i) {
      this.input$.next(i);
    }
  }

  /** Custom errors message. */
  @Input()
  public set errorText(value: string | null) {
    this.errorsSubject.next(
      value != null ? AppValidators.buildAppError(value) : value,
    );
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.initErrorStreamSideEffect().pipe(
      untilDestroyed(this),
    )
      .subscribe();
  }

  private initErrorStreamSideEffect(): Observable<ValidationErrors | null> {
    return this.input$.pipe(
      distinct(),
      switchMap(input =>
        merge(
          input.statusChanges ?? EMPTY,
          listenControlTouched(input.control).pipe(filter(touched => touched)),
        ).pipe(map(() => input))),
      tap(input => this.errorsSubject.next(input.errors)),
    );
  }
}
