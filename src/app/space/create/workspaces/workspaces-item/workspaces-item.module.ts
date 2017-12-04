import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { MomentModule } from 'angular2-moment';

import { WorkspacesItemComponent } from './workspaces-item.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule
  ],
  declarations: [ WorkspacesItemComponent ],
  exports: [ WorkspacesItemComponent ],
  providers: [ ]
})
export class WorkspacesItemModule {
  constructor(http: Http) { }
}
