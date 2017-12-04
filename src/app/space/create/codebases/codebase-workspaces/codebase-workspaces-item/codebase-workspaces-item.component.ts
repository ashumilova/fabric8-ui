import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Broadcaster, Notification, Notifications } from 'ngx-base';
import { Context, Contexts } from 'ngx-fabric8-wit';
import { FilterConfig, FilterField, NotificationType, ToolbarConfig } from 'patternfly-ng';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Workspace } from '../../services/workspace';
import { Codebase } from '../services/codebase';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'codebase-workspaces-item',
  templateUrl: 'codebase-workspaces-item.component.html',
  styleUrls: ['./codebase-workspaces-item.component.less']
})

export class CodebaseWorkspacesItemComponent implements OnInit, OnDestroy {
  @Input() workspace: Workspace;

  contextPath: Observable<string>;

  private subscriptions: Subscription[] = [];

  constructor(private broadcaster: Broadcaster,
              private notifications: Notifications) {
  }

  ngOnInit() {
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
