import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Codebase } from '../services/codebase';
import { CodebasesService } from '../services/codebases.service';
import { Broadcaster, Notification, NotificationType, Notifications } from 'ngx-base';
import { Dialog } from 'ngx-widgets';
import { IModalHost } from '../../../wizard/models/modal-host';
import { Observable } from 'rxjs/Observable';
import { Contexts } from 'ngx-fabric8-wit';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'codebases-item-actions',
  templateUrl: './codebases-item-actions.component.html',
  styleUrls: ['./codebases-item-actions.component.less']
})
export class CodebasesItemActionsComponent implements OnDestroy, OnInit {
  @Input() cheRunning: boolean;
  @Input() codebase: Codebase;
  @Input() index: number = -1;
  @ViewChild('deleteCodebaseDialog') deleteCodebaseDialog: IModalHost;

  subscriptions: Subscription[] = [];
  workspaceBusy: boolean = false;
  dialog: Dialog;
  contextPath: Observable<string>;
  
  constructor(
      private context: Contexts,
      private broadcaster: Broadcaster,
      private notifications: Notifications,
      private codebasesService: CodebasesService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.contextPath = this.context.current.map(context => context.path);
  }

  // Actions

  /**
   * Confirmation dialog for codebase removal.
   *
   * @param {MouseEvent} event mouse event
   */
  confirmDeleteCodebase(event: MouseEvent): void {
    this.deleteCodebaseDialog.open();
  }

  /**
   * Process the click on confirm dialog button.
   */
  onDeleteCodebase() {
    this.deleteCodebase();
  }

  /**
   * Disassociate codebase from current space
   */
  deleteCodebase(): void {
    this.subscriptions.push(this.codebasesService.deleteCodebase(this.codebase).subscribe((codebase: Codebase) => {
      this.deleteCodebaseDialog.close();
      this.broadcaster.broadcast('codebaseDeleted', {
        codebase: codebase
      });
    }, (error: any) => {
      this.deleteCodebaseDialog.close();
      this.handleError('Failed to deleteCodebase codebase ' + this.codebase.name, NotificationType.DANGER);
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
