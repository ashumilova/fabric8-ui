import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { TabsModule } from 'ngx-bootstrap';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { ToolbarModule } from 'patternfly-ng';
import { CodebaseWorkspacesItemComponent } from './codebase-workspaces-item.component';


@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    ToolbarModule,
    TooltipModule.forRoot()
  ],
  declarations: [CodebaseWorkspacesItemComponent],
  providers: [
    TooltipConfig
  ],
  exports: [CodebaseWorkspacesItemComponent]
})
export class CodebaseWorkspacesItemModule {
  constructor(http: Http) { }
}
