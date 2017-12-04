import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodebaseDetailsComponent } from './codebase-details.component';

const routes: Routes = [
  {
    path: '',
    component: CodebaseDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodebaseDetailsRoutingModule { }
