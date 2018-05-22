import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-modal';

import { ToolbarModule } from 'patternfly-ng';
import { BranchNotFoundModule } from '../codebase-branch-not-found/branch-not-found.module';
import { CodebaseBranchesToolbarComponent } from './codebase-branches-toolbar.component';
import { CodebaseWorkspacesToolbarComponent } from './codebase-workspaces-toolbar.component';


@NgModule({
  imports: [
    BranchNotFoundModule,
    BsDropdownModule.forRoot(),
    CommonModule,
    ModalModule,
    ToolbarModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    CodebaseBranchesToolbarComponent
  ],
  providers: [
    BsDropdownConfig,
    TooltipConfig
  ],
  exports: [CodebaseBranchesToolbarComponent]
})
export class CodebaseBranchesToolbarModule { }