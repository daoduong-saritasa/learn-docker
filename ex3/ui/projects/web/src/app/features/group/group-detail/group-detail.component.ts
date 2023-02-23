import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { gql, Apollo, QueryRef } from 'apollo-angular';

const getGroup = gql`
query MyQuery($id: Int!) {
  groupById(id: $id) {
    name,
    id,
  }
}
  `;

const getAllTasks = gql`
query MyQuery {
  allTasks {
    nodes {
      name
      id
      description
      taskGroupsByTaskId {
        nodes {
          sentAt
          groupId
        }
      }
    }
  }
}


`;

const updateTaskGroupStatus = gql`
mutation MyMutation($taskId: Int!, $groupId: Int!) {
  updateTaskStatusInGroup(input: {groupid: $groupId, taskid: $taskId}) {
    clientMutationId
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

  /** Get all task query. */
  public getAllTaskQuery: QueryRef<any> = this.apollo.watchQuery({
    query: getAllTasks,
  });

  public constructor(
    private readonly route: ActivatedRoute,
    private apollo: Apollo,
  ) {
    this.group$ = this.groupId$.pipe(
      switchMap(id => this.apollo.watchQuery({
        query: getGroup,
        variables: { id: parseInt(id ?? '', 10) },
      }).valueChanges.pipe(
        map((result: any) => result.data?.groupById),
      )),
    );
    this.tasks$ = this.getAllTaskQuery.valueChanges.pipe(
      tap((result: any) => console.log(result)),
      map((result: any) => result.data?.allTasks?.nodes),
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

  /**
   * Send task.
   * @param taskId Task id.
   * @param groupId Group id.
   */
  public onSendTaskClick(taskId: number, groupId: number): void {
    this.apollo.mutate(
      {
        mutation: updateTaskGroupStatus,
        variables: {
          taskId,
          groupId,
        },
      },
    ).subscribe(() => {
      this.getAllTaskQuery.refetch();
    });
  }

  /**
   * Check task status.
   * @param taskGroup Task group.
   * @param groupId Group id.
   */
  public checkTaskStatus(taskGroup: any[], groupId: number): boolean {
    return taskGroup.some((task: any) => task.groupId === groupId && task.sentAt !== null);
  }
}
