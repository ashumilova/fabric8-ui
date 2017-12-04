import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureFlagResolver } from '../../feature-flag/resolver/feature-flag.resolver';
import { CodebasesComponent } from './codebases/codebases.component';
import { CreateComponent } from './create.component';

import { CodebaseResolver } from '../../shared/codebase-resolver';
import { ExperimentalFeatureResolver } from '../../shared/experimental-feature.resolver';


const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
    children: [
      { path: '', component: CodebasesComponent },
      {
        path: 'workspaces',
        loadChildren: './workspaces/workspaces.module#WorkspacesModule',
        data: {
          title: 'Workspaces'
        }
      },
      {
        path: 'pipelines',
        loadChildren: './pipelines/pipelines.module#PipelinesModule',
        data: {
          title: 'Pipelines'
        }
      },
      {
        path: 'deployments',
        loadChildren: './deployments/deployments.module#DeploymentsModule',
        resolve: {
          featureFlagConfig: FeatureFlagResolver
        },
        data: {
          title: 'Deployments',
          featureName: 'Deployments'
        }
      },
      // Codebase details
      {
        path: 'codebase/:codebase',
        resolve: {
          codebase: CodebaseResolver
        },
        loadChildren: './codebases/codebase-details/codebase-details.module#CodebaseDetailsModule',
        data: {
          title: 'Codebase',
          featureName: 'Create'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
