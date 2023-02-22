import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { gql, Apollo, TypedDocumentNode } from 'apollo-angular';

const getGroup = (id: string | null): TypedDocumentNode => gql`
  query MyQuery {
    groupById(id: ${id}) {
      id,
      name,
      tasksByGroupId {
        nodes {
          name
          description,
          sentAt,
        }
      }
    }
  }

  `;

/** Placeholder dashboard. */
@UntilDestroy()
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetailComponent {

  /** Group. */
  public readonly group$: Observable<any>;

  /** Group id. */
  public readonly groupId$: Observable<string | null> = this.route.paramMap.pipe(
    map(params => params.get('id')),
    filter(id => !!id),
  );

  /** Tasks. */
  public readonly tasks$: Observable<any>;

  public constructor(
    private readonly route: ActivatedRoute,
    private apollo: Apollo,
  ) {
    this.group$ = this.groupId$.pipe(
      switchMap(id => this.apollo.watchQuery({
        query: getGroup(id),
      }).valueChanges.pipe(
        tap((result: any) => console.log(result.data)),
        map((result: any) => result.data?.groupById),
      )),
    );
    this.tasks$ = this.group$.pipe(
      tap((group: any) => console.log(group.tasksByGroupId.nodes)),
      map((group: any) => group.tasksByGroupId.nodes),
    );
  }

  /**
   * Track by task.
   * @param index Index.
   * @param task Task.
   */
  public trackByTask(index: number, task: any): string {
    return task.id;
  }
}
