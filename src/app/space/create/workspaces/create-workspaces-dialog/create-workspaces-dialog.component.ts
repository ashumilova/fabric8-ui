import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { IModalHost } from '../../../wizard/models/modal-host';
import { GitHubRepoBranch, GitHubRepoDetails } from '../../codebases/services/github';
import { GitHubService } from '../../codebases/services/github.service';

interface IRepositoryOption {
  codebaseId: string;
  fullName: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'create-workspaces-dialog',
  templateUrl: './create-workspaces-dialog.component.html',
  styleUrls: ['./create-workspaces-dialog.component.less']
})
export class CreateWorkspacesDialogComponent implements OnInit, OnDestroy {

  @Input() reposMap: Map<string, GitHubRepoDetails>;
  @Output('onCreate') onCreate = new EventEmitter();
  @ViewChild('createWorkspaceModal') createWorkspaceModal: IModalHost;
  @ViewChild('emptyOption') emptyOption: ElementRef;
  @ViewChild('branchNameModel') branchNameModel: NgModel;

  repoOptions: IRepositoryOption[] = [];
  codebaseId: string;
  branchName: string;
  repoFullName: string;
  branchesList: GitHubRepoBranch[];

  constructor(
    private gitHubService: GitHubService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() { }

  cancel() {
    this.createWorkspaceModal.close();
  }

  open(): void {
    this.createWorkspaceModal.open();
  }

  changeRepo($event: any): void {
    if (!this.codebaseId) {
      return;
    }

    this.disableEmptyOption();

    const fullName = this.reposMap.get(this.codebaseId).full_name;
    this.repoFullName = fullName;

    // update list of branches
    this.gitHubService.getRepoBranchesByFullName(fullName).subscribe(branchesList => {
      this.branchesList = branchesList;
    });
  }

  getRepos(): IRepositoryOption[] {
    this.repoOptions.length = 0;

    if (!this.reposMap || this.reposMap.size === 0) {
      return this.repoOptions;
    }

    this.reposMap.forEach((repo: GitHubRepoDetails, codebaseId: string) => {
      this.repoOptions.push({
        codebaseId: codebaseId,
        fullName: repo.full_name
      });
    });

    this.repoOptions.sort((a: IRepositoryOption, b: IRepositoryOption) => {
      return a.fullName === b.fullName ? 0 :
        a.fullName > b.fullName ? 1 : -1;
    });

    return this.repoOptions;
  }

  createWorkspace(form: NgForm): void {
    if (form.invalid) {
      for (let controlName in form.controls) {
        if (form.controls.hasOwnProperty(controlName)) {
          form.controls[controlName].markAsDirty();
        }
      }
      console.warn('Some necessary data are missed.');
      return;
    }

    this.onCreate.emit({codebaseId: this.codebaseId, branch: this.branchName});
    this.createWorkspaceModal.close();
  }

  private disableEmptyOption(): void {
    this.emptyOption.nativeElement.disabled = true;
  }

}
