import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { GitHubRepoComparison, GitHubRepoDetails } from '../../codebases/services/github';
import { GitHubService } from '../../codebases/services/github.service';
import { Workspace } from '../../codebases/services/workspace';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'workspaces-item',
  templateUrl: './workspaces-item.component.html',
  styleUrls: [ './workspaces-item.component.less' ]
})
export class WorkspacesItemComponent implements OnDestroy, OnChanges, OnInit {
  @Input() workspace: Workspace;
  @Input() repo: GitHubRepoDetails;
  @HostBinding('class.workspace-item')

  subscriptions: Subscription[] = [];

  workspaceStatus: string;
  branchName: string;
  branchBehind: number;
  branchAhead: number;
  updated: number;

  constructor(
    private gitHubService: GitHubService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const repo = changes.repo;
    if (repo) {
      this.repo = repo.currentValue;
      this.updateBranch();
    }
    const workspace = changes.workspace;
    if (workspace) {
      this.workspace = workspace.currentValue;
      this.updateWorkspaceStatus();
    }
  }

  ngOnInit(): void {
    this.updateWorkspaceStatus();
    this.updateBranch();
  }

  /**
   * Helper to update workspace status.
   */
  updateWorkspaceStatus(): void {
    if (this.workspace && this.workspace.attributes) {
      this.workspaceStatus = this.workspace.attributes.status;
    } else {
      this.workspaceStatus = '';
    }
  }

  /**
   * Helper to update repo props.
   */
  updateBranch(): void {
    if (this.workspace.relationships && this.workspace.relationships.codebase) {
      this.branchName = this.workspace.relationships.codebase.meta.branch;
    }

    if (!this.repo) {
      return;
    }

    this.branchName = this.branchName || this.repo.default_branch;
    this.updated = +new Date(this.repo.updated_at);

    this.compareBranch();
  }

  /**
   * Compares default branches of current and parent repositories.
   */
  compareBranch(): void {
    this.branchAhead = null;
    this.branchBehind = null;
    let baseBranch, headBranch;
    if (this.repo.parent) {
      baseBranch = this.repo.parent.owner.login + ':' + this.repo.parent.default_branch;
      headBranch = this.repo.default_branch;
    } else if (this.repo.default_branch !== this.branchName) {
      baseBranch = this.repo.default_branch,
      headBranch = this.branchName;
    } else {
      return;
    }

    this.subscriptions.push(
      this.gitHubService.getRepoBranchesComparisonByFullName(this.repo.full_name, baseBranch, headBranch)
        .subscribe((comparison: GitHubRepoComparison) => {
          this.branchAhead = comparison.ahead_by;
          this.branchBehind = comparison.behind_by;
        })
    );
  }
}
