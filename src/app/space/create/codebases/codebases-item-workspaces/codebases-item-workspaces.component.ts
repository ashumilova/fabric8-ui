import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Codebase } from '../services/codebase';
import { Broadcaster, Notification, NotificationType, Notifications } from 'ngx-base';
import { WorkspacesService } from '../services/workspaces.service';
import { Workspace } from '../services/workspace';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'codebases-item-workspaces',
  templateUrl: './codebases-item-workspaces.component.html',
  styleUrls: ['./codebases-item-workspaces.component.less']
})
export class CodebasesItemWorkspacesComponent implements OnDestroy, OnInit {
  @Input() codebase: Codebase;
  @Input() index: number = -1;

  subscriptions: Subscription[] = [];
  workspaceBusy: boolean = false;
  workspaces: Workspace[];

  constructor(
      private broadcaster: Broadcaster,
      private notifications: Notifications,
      private workspacesService: WorkspacesService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    if (this.codebase === undefined) {
      return;
    }
    this.workspaces = [];
    this.updateWorkspaces();
    this.broadcaster.on('workspaceCreated')
      .subscribe((val) => {
      // todo
       /* if ((val as WorkspaceCreatedEvent).codebase.id === this.codebase.id) {
          this.updateWorkspacesPoll((val as WorkspaceCreatedEvent).workspaceName);
        }*/
      });
  }

  // Actions

  /**
   * Helper to update workspaces
   */
  private updateWorkspaces(): void {
    this.subscriptions.push(this.workspacesService.getWorkspaces(this.codebase.id)
      .subscribe(workspaces => {
        if (workspaces != null && workspaces.length > 0) {
          this.workspaces = workspaces;
        }
      }, error => {
        this.handleError(error, NotificationType.DANGER);
        console.log('Failed to retrieve workspaces for codebase ID: ' + this.codebase.id);
      }));
  }

  private handleError(error: string, type: NotificationType) {
    this.notifications.message({
      message: error,
      type: type
    } as Notification);
  }
}
