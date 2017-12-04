import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Broadcaster, Notification, Notifications } from 'ngx-base';
import { FilterConfig, FilterField, NotificationType, ToolbarConfig } from 'patternfly-ng';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GitHubBranch } from '../../services/github';
import { GitHubService } from '../../services/github.service';
import { Codebase } from '../services/codebase';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'codebase-branches-item',
  templateUrl: 'codebase-branches-item.component.html',
  styleUrls: ['./codebase-branches-item.component.less']
})

export class CodebaseBranchesItemComponent implements OnInit, OnDestroy {
  @Input() branch: GitHubBranch;

  contextPath: Observable<string>;

  private subscriptions: Subscription[] = [];

  constructor(private broadcaster: Broadcaster, private gitHubService: GitHubService,
              private notifications: Notifications) {
  }

  ngOnInit() {
    // todo
    //this.gitHubService.getRepoBranchesComparisonByUrl();

  }

  ngOnDestroy() {
  }

  // Private
  private handleError(error: string, type: NotificationType) {
    this.notifications.message({
      message: error,
      type: type
    } as Notification);
  }
}
