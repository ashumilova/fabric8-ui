import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Broadcaster, Notification, Notifications } from 'ngx-base';
import { Context, Contexts } from 'ngx-fabric8-wit';
import {
  ActionConfig,
  EmptyStateConfig, Filter, FilterConfig, FilterEvent, FilterField, ListConfig, NotificationType, SortEvent, SortField,
  ToolbarConfig
} from 'patternfly-ng';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Codebase } from '../services/codebase';
import { Workspace } from '../services/workspace';
import { WorkspacesService } from '../services/workspaces.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'codebase-workspaces',
  templateUrl: 'codebase-workspaces.component.html',
  styleUrls: ['./codebase-workspaces.component.less']
})

export class CodebaseWorkspacesComponent implements OnInit, OnDestroy {
  @Input() codebase: Codebase;

  contextPath: Observable<string>;
  resultWorkspaces: Workspace[];
  appliedFilters: Filter[];
  workspaces: Workspace[] = [];
  currentSortField: SortField;
  emptyStateConfig: EmptyStateConfig;
  isAscendingSort: boolean = true;
  listConfig: ListConfig;
  resultsCount: number = 0;
  workspacesCount: number = 0;

  private context: Context;
  private subscriptions: Subscription[] = [];

  constructor(private broadcaster: Broadcaster,
              private notifications: Notifications, private workspacesService: WorkspacesService) {
  }

  ngOnInit() {
    this.emptyStateConfig = {
      actions: {
        primaryActions: [{
          id: 'createWorkspace',
          title: 'Create a Workspace',
          tooltip: 'Create a Workspace'
        }],
        moreActions: []
      } as ActionConfig,
      iconStyleClass: 'pficon-add-circle-o',
      title: 'Create a Workspace',
      info: 'Start by creating a workspace.'
    } as EmptyStateConfig;

    this.listConfig = {
      dblClick: false,
      emptyStateConfig: this.emptyStateConfig,
      headingRow: true,
      multiSelect: false,
      selectItems: false,
      showCheckbox: false,
      useHeading: true
    } as ListConfig;

    this.fetchWorkspaces();
  }

  ngOnDestroy() {
  }


  // Filter
  applyFilters(filters: Filter[]): void {
    this.appliedFilters = filters;
    this.resultWorkspaces = [];
    if (filters && filters.length > 0) {
      this.workspaces.forEach((workspace) => {
        if (this.matchesFilters(workspace, filters)) {
          this.resultWorkspaces.push(workspace);
        }
      });
    } else {
      this.resultWorkspaces = cloneDeep(this.workspaces);
    }
    this.resultsCount = this.resultWorkspaces.length;
  }

  filterChange($event: FilterEvent): void {
    this.applyFilters($event.appliedFilters);
  }

  matchesFilter(workspace: Workspace, filter: Filter): boolean {
    let match = true;

    if (filter.field.id === 'workspaceName') {
      match = workspace.attributes.name.match(filter.value) !== null;
    } else if (filter.field.id === 'branchName') {
      // todo nothing for branch yet
    }
    return match;
  }

  matchesFilters(workspace: Workspace, filters: Filter[]): boolean {
    let matches = true;

    filters.forEach((filter) => {
      if (!this.matchesFilter(workspace, filter)) {
        matches = false;
        return false;
      }
    });
    return matches;
  }

  // Sort

  compare(workspace1: Workspace, workspace2: Workspace): number {
    let compValue = 0;

    if (this.currentSortField.id === 'workspaceName') {
      compValue = workspace1.attributes.name.localeCompare(workspace2.attributes.name);
    } else if (this.currentSortField.id === 'brancheName') {
      // todo
    } else if (this.currentSortField.id === 'status') {
      compValue = workspace1.attributes.description.localeCompare(workspace2.attributes.description);
    }
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  sortChange($event: SortEvent): void {
    this.currentSortField = $event.field;
    this.isAscendingSort = $event.isAscending;
    this.resultWorkspaces.sort((workspace1: Workspace, workspace2: Workspace) => this.compare(workspace1, workspace2));
  }

  private fetchWorkspaces(): void {
    this.subscriptions.push(this.workspacesService.getWorkspaces(this.codebase.id)
      .subscribe(workspaces => {
        this.workspaces = workspaces || [];
        this.workspacesCount = this.workspaces.length;
        // apply filters:
        this.resultWorkspaces = cloneDeep(this.workspaces);
        this.applyFilters(this.appliedFilters);
      }, error => {
        console.log('Failed to retrieve workspaces for codebase ID: ' + this.codebase.id);
      }));
  }

  // Private
  private handleError(error: string, type: NotificationType) {
    this.notifications.message({
      message: error,
      type: type
    } as Notification);
  }
}
