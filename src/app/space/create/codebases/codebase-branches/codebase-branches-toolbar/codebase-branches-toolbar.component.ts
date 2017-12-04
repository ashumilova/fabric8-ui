import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import {
  FilterConfig,
  FilterEvent,
  FilterField,
  SortConfig,
  SortEvent,
  ToolbarConfig
} from 'patternfly-ng';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'codebase-branches-toolbar',
  templateUrl: './codebase-branches-toolbar.component.html',
  styleUrls: ['./codebase-branches-toolbar.component.less']
})
export class CodebaseBranchesToolbarComponent implements OnInit, OnChanges {
  @Input() resultsCount: number = 0;
  @Input() branchesCount: number = 0;

  @Output('onFilterChange') onFilterChange = new EventEmitter();
  @Output('onSortChange') onSortChange = new EventEmitter();

  filterConfig: FilterConfig;
  isAscendingSort: boolean = true;
  sortConfig: SortConfig;
  toolbarConfig: ToolbarConfig;

  // Initialization

  ngOnInit(): void {
    this.filterConfig = {
      fields: [{
        id: 'branchName',
        title: 'Branch',
        placeholder: 'Filter by Branch...',
        type: 'text'
      }, {
        id: 'workspaceName',
        title: 'Workspace',
        placeholder: 'Filter by Workspace Name...',
        type: 'text'
      }] as FilterField[],
      appliedFilters: [],
      resultsCount: this.resultsCount,
      selectedCount: 0,
      totalCount: 0
    } as FilterConfig;

    this.sortConfig = {
      fields: [{
        id: 'workspaceName',
        title:  'Workspace',
        sortType: 'alpha'
      }, {
        id: 'branchName',
        title:  'Branch',
        sortType: 'alpha'
      }, {
        id: 'status',
        title: 'Status',
        sortType: 'alpha'
      }],
      isAscending: this.isAscendingSort
    } as SortConfig;

    this.toolbarConfig = {
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig
    } as ToolbarConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const resultsCount = changes.resultsCount;
    if (resultsCount) {
      this.resultsCount = resultsCount.currentValue || 0;
      this.updateResultsCount();
    }
  }

  updateResultsCount(): void {
    if (this.filterConfig) {
      this.filterConfig.resultsCount = this.resultsCount;
    }
  }

  // Actions

  filterChange($event: FilterEvent): void {
    this.onFilterChange.emit($event);
  }

  sortChange($event: SortEvent): void {
    this.onSortChange.emit($event);
  }
}
