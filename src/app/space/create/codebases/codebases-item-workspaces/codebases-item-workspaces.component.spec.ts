import { CodebasesItemWorkspacesComponent } from './codebases-item-workspaces.component';
import { Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Broadcaster, Notifications } from 'ngx-base';
import { WindowService } from '../services/window.service';
import { WorkspacesService } from '../services/workspaces.service';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

describe('Codebases Item Details Component', () => {
  let broadcasterMock: any;
  let windowServiceMock: any;
  let workspacesServiceMock: any;
  let notificationMock: any;
  let fixture, comp;
  let expectedWorkspace, expectedWorkspaces;

  beforeEach(() => {
    broadcasterMock = jasmine.createSpyObj('Broadcaster', ['on']);
    windowServiceMock = jasmine.createSpyObj('WindowService', ['open']);
    workspacesServiceMock = jasmine.createSpyObj('WorkspacesService', ['getWorkspaces', 'createWorkspace', 'openWorkspace']);
    notificationMock = jasmine.createSpyObj('Notifications', ['message']);

    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [CodebasesItemWorkspacesComponent],
      providers: [
        {
          provide: Broadcaster, useValue: broadcasterMock
        },
        {
          provide: WindowService, useValue: windowServiceMock
        },
        {
          provide: WorkspacesService, useValue: workspacesServiceMock
        },
        {
          provide: Notifications, useValue: notificationMock
        }
      ],
      // Tells the compiler not to error on unknown elements and attributes
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CodebasesItemWorkspacesComponent);
    comp = fixture.componentInstance;
    comp.codebase = { 'id': '6f5b6738-170e-490e-b3bb-d10f56b587c8', attributes: { type: 'git', url: 'toto/toto', last_used_workspace: 'me' } };
    expectedWorkspace = {
      attributes: {
        description: 'description',
        name: 'name'
      },
      links: { open: 'url' },
      type: 'git'
    };
    expectedWorkspaces = [expectedWorkspace];
    const workspaceCreatedEvent = {
      codebase: { 'id': '6f5b6738-170e-490e-b3bb-d10f56b587c8', attributes: { type: 'git', url: 'toto/toto' } },
      workspaceName: 'MyWorkspace'
    }
    workspacesServiceMock.getWorkspaces.and.returnValue(Observable.of(expectedWorkspaces));
    broadcasterMock.on.and.returnValue(Observable.of(workspaceCreatedEvent));
  });

  it('Init component fetches workspaces', async(() => {
    // given
    fixture.detectChanges();

    // when init
    comp.ngOnInit();

    // then
    expect(workspacesServiceMock.getWorkspaces).toHaveBeenCalled();
  }));
});
