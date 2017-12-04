import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';

import { TooltipConfig, TooltipModule } from 'ngx-bootstrap';

import { ListModule } from 'patternfly-ng';

import { CheService } from '../codebases/services/che.service';
import { CodebasesService } from '../codebases/services/codebases.service';
import { GitHubService } from '../codebases/services/github.service';
import { WorkspacesService } from '../codebases/services/workspaces.service';
import { CreateWorkspacesDialogModule } from './create-workspaces-dialog/create-workspaces-dialog.module';
import { WorkspacesItemActionsModule } from './workspaces-item-actions/workspaces-item-actions.module';
import { WorkspacesItemHeadingModule } from './workspaces-item-heading/workspaces-item-heading.module';
import { WorkspacesItemModule } from './workspaces-item/workspaces-item.module';
import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { WorkspacesToolbarModule } from './workspaces-toolbar/workspaces-toolbar.module';
import { WorkspacesComponent } from './workspaces.component';


@NgModule({
  imports: [
    CommonModule,
    CreateWorkspacesDialogModule,
    FormsModule,
    ListModule,
    TooltipModule.forRoot(),
    WorkspacesItemActionsModule,
    WorkspacesItemHeadingModule,
    WorkspacesItemModule,
    WorkspacesRoutingModule,
    WorkspacesToolbarModule
  ],
  declarations: [ WorkspacesComponent ],
  exports: [ WorkspacesComponent ],
  providers: [
    CheService,
    CodebasesService,
    GitHubService,
    TooltipConfig,
    WorkspacesService
  ]
})
export class WorkspacesModule {
  constructor(http: Http) { }
}
