import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Broadcaster, Notifications } from 'ngx-base';
import { ModalDirective } from 'ngx-bootstrap';
import { Context, Contexts } from 'ngx-fabric8-wit';
import { Workspace } from '../../codebases/services/workspace';
import { WorkspacesService } from '../../codebases/services/workspaces.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'workspaces-item-actions',
  templateUrl: './workspaces-item-actions.component.html',
  styleUrls: [ './workspaces-item-actions.component.less' ]
})
export class WorkspacesItemActionsComponent {
  subscriptions: Subscription[] = [];
  context: Context;
  @Input() workspace: Workspace;
  @ViewChild(ModalDirective) modal: ModalDirective;

  constructor(
    private broadcaster: Broadcaster,
    private contexts: Contexts,
    private notifications: Notifications,
    private workspacesService: WorkspacesService) {
    this.subscriptions.push(this.contexts.current.subscribe((context: Context) => {
      this.context = context;
    }));
  }

  stopWorkspace(): void {
    if (!this.isRunning()) {
      return;
    }

    this.workspacesService.stopWorkspace(this.workspace).subscribe();
  }

  /**
   * Confirmation dialog for codebase removal.
   *
   * @param {MouseEvent} event mouse event
   */
  confirmDeleteCodebase(event: MouseEvent): void {
    this.modal.show();
  }

  /**
   * Process the click on confirm dialog button.
   */
  onDeleteCodebase() {
    /*this.subscriptions.push(this.codebasesService.deleteCodebase(this.codebase).subscribe((codebase: Codebase) => {
      this.modal.hide();
      this.broadcaster.broadcast('codebaseDeleted', {
        codebase: codebase
      });
    }, (error: any) => {
      this.modal.hide();
      this.handleError('Failed to deleteCodebase codebase ' + this.codebase.name, NotificationType.DANGER);
    }));*/
  }

  isRunning(): boolean {
    return this.workspace && this.workspace.attributes.status === 'RUNNING';
  }
}
