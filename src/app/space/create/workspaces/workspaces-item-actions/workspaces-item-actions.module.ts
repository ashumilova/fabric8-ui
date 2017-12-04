import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap';

import { WorkspacesService } from '../../codebases/services/workspaces.service';
import { WorkspacesItemActionsComponent } from './workspaces-item-actions.component';

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule
  ],
  declarations: [ WorkspacesItemActionsComponent ],
  exports: [ WorkspacesItemActionsComponent ],
  providers: [
    BsDropdownConfig,
    WorkspacesService
  ]
})
export class WorkspacesItemActionsModule {
  constructor(http: Http) { }
}
