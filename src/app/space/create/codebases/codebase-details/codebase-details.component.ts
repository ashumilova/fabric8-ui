import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import {NotificationType, ToolbarConfig} from 'patternfly-ng';
import { Context, Contexts } from 'ngx-fabric8-wit';
import { Subscription } from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import { Codebase } from '../services/codebase';
import { IModalHost } from '../../../wizard/models/modal-host';
import {CodebasesService} from '../services/codebases.service';
import {Broadcaster, Notification, Notifications} from 'ngx-base';
import {Observable} from 'rxjs/Observable';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'codebase-details',
  templateUrl: 'codebase-details.component.html',
  styleUrls: ['./codebase-details.component.less']
})

export class CodebaseDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('deleteCodebaseDialog') deleteCodebaseDialog: IModalHost;
  toolbarConfig: ToolbarConfig;
  codebase: Codebase;
  contextPath: Observable<string>;

  private context: Context;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private codebasesService: CodebasesService, private broadcaster: Broadcaster,
              private notifications: Notifications, private contexts: Contexts, private router: Router) {
  }

  ngOnInit() {
    this.subscriptions.push(this.contexts.current.subscribe(val => this.context = val));
    this.codebase = this.route.snapshot.data['codebase'];
  }

  ngOnDestroy() {
  }

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
      this.router.navigate(['/', this.context.user.attributes.username, this.context.space.attributes.name, 'create']);
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
