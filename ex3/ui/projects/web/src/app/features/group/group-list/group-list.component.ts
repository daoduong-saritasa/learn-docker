import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Apollo, gql } from 'apollo-angular';
import { Observable, tap, map } from 'rxjs';

const getGroups = gql`
query MyQuery {
  allGroups {
    nodes {
      id,
      name
    }
  }
}

`;

/** Placeholder dashboard. */
@UntilDestroy()
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListComponent {
  /** Groups. */
  public readonly groups$: Observable<any>;

  private apollo = inject(Apollo);

  public constructor() {
    this.groups$ = this.apollo.watchQuery({
      query: getGroups,
    }).valueChanges.pipe(
      map((result: any) => result.data?.allGroups.nodes),
    );
  }

  /**
   * Group trackby funtion.
   * @param index Index of the group.
   * @param group Group.
   */
  public groupTrackBy(index: unknown, group: { id: number; }): number {
    return group.id;
  }
}
