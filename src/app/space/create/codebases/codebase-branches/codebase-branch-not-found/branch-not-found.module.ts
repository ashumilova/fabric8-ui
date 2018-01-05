import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';

import { EmptyStateModule } from 'patternfly-ng';

import { BranchNotFoundComponent } from './branch-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EmptyStateModule
  ],
  declarations: [
    BranchNotFoundComponent
  ],
  providers: [ ],
  exports: [ BranchNotFoundComponent ]
})
export class BranchNotFoundModule {
  constructor(http: Http) { }
}
