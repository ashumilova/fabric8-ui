import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { TabsModule } from 'ngx-bootstrap';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { ToolbarModule } from 'patternfly-ng';
import { CodebaseWorkspacesItemComponent } from './codebase-workspaces-item.component';
import { CodebaseBranchesItemComponent } from './codebase-branches-item.component';


@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    ToolbarModule,
    TooltipModule.forRoot()
  ],
  declarations: [CodebaseBranchesItemComponent],
  providers: [
    TooltipConfig
  ],
  exports: [CodebaseBranchesItemComponent]
})
export class CodebaseBranchesItemModule {
  constructor(http: Http) { }
}
