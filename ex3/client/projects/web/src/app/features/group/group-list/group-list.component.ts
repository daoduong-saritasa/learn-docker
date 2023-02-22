import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  public constructor(
    private apollo: Apollo,
  ) {
    this.groups$ = this.apollo.watchQuery({
      query: getGroups,
    }).valueChanges.pipe(
      tap((result: any) => console.log(result)),
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
