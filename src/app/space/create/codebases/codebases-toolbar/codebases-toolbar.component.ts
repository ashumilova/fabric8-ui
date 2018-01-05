import {
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
  TemplateRef,
  ViewChild,
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
  selector: 'codebases-toolbar',
  templateUrl: './codebases-toolbar.component.html',
  styleUrls: ['./codebases-toolbar.component.less']
})
export class CodebasesToolbarComponent implements OnInit, OnChanges {
  @Input() resultsCount: number = 0;

  @Output('onFilterChange') onFilterChange = new EventEmitter();
  @Output('onSortChange') onSortChange = new EventEmitter();

  @ViewChild('addCodebaseTemplate') addCodebaseTemplate: TemplateRef<any>;

  filterConfig: FilterConfig;
  isAscendingSort: boolean = true;
  sortConfig: SortConfig;
  toolbarConfig: ToolbarConfig;

  constructor() {
  }

  // Initialization

  ngOnInit(): void {
    this.filterConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        placeholder: 'Filter by Name...',
        type: 'text'
      }] as FilterField[],
      appliedFilters: [],
      resultsCount: this.resultsCount,
      selectedCount: 0,
      totalCount: 0
    } as FilterConfig;

    this.sortConfig = {
      fields: [{
        id: 'name',
        title:  'Name',
        sortType: 'alpha'
      }, {
        id: 'branches',
        title:  'Branches',
        sortType: 'numeric'
      }, {
          id: 'pullRequests',
          title:  'Pull Requests',
          sortType: 'numeric'
      }, {
        id: 'pushedAt',
        title:  'Last Commit',
        sortType: 'numeric'
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
