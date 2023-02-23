import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { gql, Apollo, TypedDocumentNode } from 'apollo-angular';

const getGroup = gql`
query MyQuery($id: Int!) {
  groupById(id: $id) {
    taskGroupsByGroupId {
      nodes {
        taskByTaskId {
          id,
          name
          description
        }
        sentAt
      }
    }
    name
  }
}

  `;

const getAllTasks = gql`
query MyQuery {
  allTasks {
    nodes {
      name
      id
    }
  }
}

`;

const addTaskToGroup = gql`
mutation MyMutation($groupId: Int!, $taskId: Int!) {
  createTaskGroup(
    input: {
      taskGroup: {
        groupId: $groupId
        taskId: $taskId
      }
    }
  ) {
    groupByGroupId {
      name
      taskGroupsByGroupId {
        nodes {
          sentAt
          taskByTaskId {
            name
            description
          }
        }
      }
    }
    query {
      allTasks {
        nodes {
          id
          name
        }
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

  /** Available task. */
  public readonly availableTasks$: Observable<any>;

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
    this.tasks$ = this.group$.pipe(
      map((group: any) => group.taskGroupsByGroupId.nodes),
    );

    this.availableTasks$ = this.tasks$.pipe(
      switchMap(tasks => this.apollo.watchQuery({
        query: getAllTasks,
      }).valueChanges.pipe(
        map((result: any) => result.data?.allTasks.nodes),
        map((allTasks: any) => allTasks.filter((task: any) => !tasks.find((t: any) => t.taskByTaskId.id === task.id))),
      )),
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

  public onAddTaskClick(taskId: string): void {
    console.log(taskId);
    this.apollo.mutate(
      {
        mutation: addTaskToGroup,
        variables: {
          groupId: parseInt(this.route.snapshot.paramMap.get('id') ?? '', 10),
          taskId: parseInt(taskId, 10),
        },
      },
    ).subscribe();
  }
}
