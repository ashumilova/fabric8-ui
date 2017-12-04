import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Broadcaster, Notification, Notifications } from 'ngx-base';
import { Context, Contexts } from 'ngx-fabric8-wit';
import {
  ActionConfig,
  EmptyStateConfig, Filter, FilterConfig, FilterEvent, FilterField, ListConfig, NotificationType, SortEvent, SortField
} from 'patternfly-ng';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Codebase } from '../services/codebase';
import { GitHubBranch } from '../services/github';
import { GitHubService } from '../services/github.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'codebase-branches',
  templateUrl: 'codebase-branches.component.html',
  styleUrls: ['./codebase-branches.component.less']
})

export class CodebaseBranchesComponent implements OnInit, OnDestroy {
  @Input() codebase: Codebase;

  contextPath: Observable<string>;
  resultBranches: GitHubBranch[];
  appliedFilters: Filter[];
  branches: GitHubBranch[] = [];
  currentSortField: SortField;
  emptyStateConfig: EmptyStateConfig;
  isAscendingSort: boolean = true;
  listConfig: ListConfig;
  resultsCount: number = 0;
  branchesCount: number = 0;

  private context: Context;
  private subscriptions: Subscription[] = [];

  constructor(private broadcaster: Broadcaster, private gitHubService: GitHubService,
              private notifications: Notifications) {
  }

  ngOnInit() {
    this.emptyStateConfig = {
      actions: {
        primaryActions: [{
          id: 'createBranch',
          title: 'Create a Branch',
          tooltip: 'Create a Branch'
        }],
        moreActions: []
      } as ActionConfig,
      iconStyleClass: 'pficon-add-circle-o',
      title: 'Create a Branch',
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

    this.fetchBranches();
  }

  ngOnDestroy() {
  }

  // Filter
  applyFilters(filters: Filter[]): void {
    this.appliedFilters = filters;
    this.resultBranches = [];
    if (filters && filters.length > 0) {
      this.branches.forEach((workspace) => {
        if (this.matchesFilters(workspace, filters)) {
          this.resultBranches.push(workspace);
        }
      });
    } else {
      this.resultBranches = cloneDeep(this.branches);
    }
    this.resultsCount = this.resultBranches.length;
  }

  filterChange($event: FilterEvent): void {
    this.applyFilters($event.appliedFilters);
  }

  matchesFilter(branch: GitHubBranch, filter: Filter): boolean {
    let match = true;

    if (filter.field.id === 'workspaceName') {
      // match = branch.attributes.name.match(filter.value) !== null;
    } else if (filter.field.id === 'branchName') {
      match = branch.name.match(filter.value) !== null;
    }
    return match;
  }

  matchesFilters(branch: GitHubBranch, filters: Filter[]): boolean {
    let matches = true;

    filters.forEach((filter) => {
      if (!this.matchesFilter(branch, filter)) {
        matches = false;
        return false;
      }
    });
    return matches;
  }

  // Sort

  compare(branch1: GitHubBranch, branch2: GitHubBranch): number {
    let compValue = 0;

    if (this.currentSortField.id === 'workspaceName') {
      // todo
    } else if (this.currentSortField.id === 'brancheName') {
      compValue = branch1.name.localeCompare(branch2.name);
    } else if (this.currentSortField.id === 'status') {
      // todo
    }
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  sortChange($event: SortEvent): void {
    this.currentSortField = $event.field;
    this.isAscendingSort = $event.isAscending;
    this.resultBranches.sort((branch1: GitHubBranch, branch2: GitHubBranch) => this.compare(branch1, branch2));
  }

  private fetchBranches() {
    this.subscriptions.push(this.gitHubService.getRepoBranchesByUrl(this.codebase.attributes.url)
      .subscribe(branches => {
        this.branches = branches || [];
        this.branchesCount = this.branches.length;
        // apply filters:
        this.resultBranches = cloneDeep(this.branches);
        this.applyFilters(this.appliedFilters);
      }, error => {
        this.handleError(`Failed to retrieve GitHub repo branches information: ${this.codebase.attributes.url}`,
          NotificationType.WARNING);
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
