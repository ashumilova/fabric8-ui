import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { CodebasesItemWorkspacesModule } from '../codebases-item-workspaces/codebases-item-workspaces.module';
import { CodebasesItemComponent } from './codebases-item.component';

import { CodebasesService } from '../services/codebases.service';
import { GitHubService } from '../services/github.service';

@NgModule({
  imports: [
    CodebasesItemWorkspacesModule,
    CommonModule,
    FormsModule,
    MomentModule,
    RouterModule
  ],
  declarations: [ CodebasesItemComponent ],
  exports: [ CodebasesItemComponent ],
  providers: [CodebasesService, GitHubService]
})
export class CodebasesItemModule {
  constructor(http: Http) {}
}
