import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { TabsModule } from 'ngx-bootstrap';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { ListModule, ToolbarModule } from 'patternfly-ng';
import { WorkspacesItemActionsModule } from '../../workspaces/workspaces-item-actions/workspaces-item-actions.module';
import { CodebaseWorkspacesToolbarModule } from './codebase-workaces-toolbar/codebase-workspaces-toolbar.module';
import { CodebaseWorkspacesItemModule } from './codebase-workspaces-item/codebase-workspaces-item.module';
import { CodebaseWorkspacesComponent } from './codebase-workspaces.component';


@NgModule({
  imports: [
    CommonModule,
    CodebaseWorkspacesItemModule,
    CodebaseWorkspacesToolbarModule,
    ListModule,
    TabsModule.forRoot(),
    ToolbarModule,
    TooltipModule.forRoot(),
    WorkspacesItemActionsModule
  ],
  declarations: [CodebaseWorkspacesComponent],
  providers: [
    TooltipConfig
  ],
  exports: [CodebaseWorkspacesComponent]
})
export class CodebaseWorkspacesModule {
  constructor(http: Http) { }
}
