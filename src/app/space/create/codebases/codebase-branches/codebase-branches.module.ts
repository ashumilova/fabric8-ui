import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { TabsModule } from 'ngx-bootstrap';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { ListModule, ToolbarModule } from 'patternfly-ng';
import { CodebaseBranchesItemModule } from './codebase-branches-item/codebase-branches-item.module';
import { CodebaseBranchesToolbarModule } from './codebase-branches-toolbar/codebase-branches-toolbar.module';
import { CodebaseBranchesComponent } from './codebase-branches.component';


@NgModule({
  imports: [
    CodebaseBranchesItemModule,
    CodebaseBranchesToolbarModule,
    CommonModule,
    ListModule,
    TabsModule.forRoot(),
    ToolbarModule,
    TooltipModule.forRoot()
  ],
  declarations: [CodebaseBranchesComponent],
  providers: [
    TooltipConfig
  ],
  exports: [CodebaseBranchesComponent]
})
export class CodebaseBranchesModule {
  constructor(http: Http) { }
}
