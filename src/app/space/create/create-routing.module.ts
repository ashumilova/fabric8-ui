import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create.component';
import { CodebasesComponent } from './codebases/codebases.component';
import { ExperimentalFeatureResolver } from '../../shared/experimental-feature.resolver';
import { CodebaseResolver } from '../../shared/codebase-resolver';

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
        path: 'environments',
        loadChildren: './environments/create-environments.module#CreateEnvironmentsModule',
        resolve: {
          featureFlagConfig: ExperimentalFeatureResolver
        },
        data: {
          title: 'Environments',
          featureName: 'Environments'
        }
      },
      {
        path: 'apps',
        loadChildren: './apps/create-apps.module#CreateAppsModule',
        resolve: {
          featureFlagConfig: ExperimentalFeatureResolver
        },
        data: {
          title: 'Applications',
          featureName: 'Applications'
        }
      },
      {
        path: 'deployments',
        loadChildren: './deployments/deployments.module#DeploymentsModule',
        resolve: {
          featureFlagConfig: ExperimentalFeatureResolver
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
