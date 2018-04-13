import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { ModalModule } from 'ngx-modal';

import { BsDropdownConfig, BsDropdownModule, TabsModule, TooltipConfig, TooltipModule } from 'ngx-bootstrap';

import { ToolbarModule } from 'patternfly-ng';
import { CodebaseBranchesModule } from '../codebase-branches/codebase-branches.module';
import { CodebaseDeleteDialogModule } from '../codebases-delete/codebase-delete-dialog.module';
import { CodebaseDetailsRoutingModule } from './codebase-details-routing.module';
import { CodebaseDetailsComponent } from './codebase-details.component';

import { CodebaseWorkspacesModule } from '../codebase-workspaces/codebase-workspaces.module';

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    CodebaseBranchesModule,
    CodebaseDeleteDialogModule,
    CodebaseDetailsRoutingModule,
    CodebaseWorkspacesModule,
    ModalModule,
    TabsModule.forRoot(),
    ToolbarModule,
    TooltipModule.forRoot()
  ],
  declarations: [CodebaseDetailsComponent],
  exports: [ ModalModule ],
  providers: [
    BsDropdownConfig,
    TooltipConfig
  ]
})
export class CodebaseDetailsModule {
  constructor(http: Http) { }
}
