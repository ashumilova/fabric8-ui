import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { ToolbarModule } from 'patternfly-ng';
import { CodebaseDetailsRoutingModule } from './codebase-details-routing.module';
import { CodebaseDetailsComponent } from './codebase-details.component';
import { CodebaseDeleteDialogModule } from '../codebases-delete/codebase-delete-dialog.module';
import { CodebaseBranchesModule } from '../codebase-branches/codebase-branches.module';
import { CodebaseWorkspacesModule } from '../codebase-workspaces/codebase-workspaces.module';


@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    CodebaseBranchesModule,
    CodebaseDeleteDialogModule,
    CodebaseDetailsRoutingModule,
    CodebaseWorkspacesModule,
    TabsModule.forRoot(),
    ToolbarModule,
    TooltipModule.forRoot()
  ],
  declarations: [CodebaseDetailsComponent],
  providers: [
    BsDropdownConfig,
    TooltipConfig
  ]
})
export class CodebaseDetailsModule {
  constructor(http: Http) { }
}
