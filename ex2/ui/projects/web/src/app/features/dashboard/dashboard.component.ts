import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from '@saanbo/common/core/models/user';
import { AppConfig } from '@saanbo/common/core/services/app.config';
import { UserService } from '@saanbo/common/core/services/user.service';
import { toggleExecutionState } from '@saanbo/common/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

/** Placeholder dashboard. */
@UntilDestroy()
@Component({
  selector: 'saanbow-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  /** Whether the controls should be marked as in loading state. */
  protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Current user. */
  public readonly user$: Observable<User | null>;

  /** Test api. */
  public readonly testApi$: Observable<string>;

  public constructor(
    public readonly userService: UserService,
    public readonly appConfigService: AppConfig,
    public readonly http: HttpClient,
  ) {
    this.user$ = this.userService.currentUser$.pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
    this.testApi$ = this.http.get<string>(this.appConfigService.apiUrl).pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    )
  }

  /** Handles click on logout button. */
  public onLogoutClick(): void {
    this.userService.logout()
      .pipe(
        toggleExecutionState(this.isLoading$),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
