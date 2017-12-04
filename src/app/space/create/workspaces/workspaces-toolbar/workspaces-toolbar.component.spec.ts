import {
  Component,
  DebugElement
} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { ModalModule } from 'ngx-modal';
import { ToolbarModule } from 'patternfly-ng';

import { WorkspaceNotFoundModule } from './workspace-not-found/workspace-not-found.module';
import { WorkspacesToolbarComponent } from './workspaces-toolbar.component';

@Component({
  template: `<workspaces-toolbar (onFilterChange)="filterChange($event)"
                                 (onSortChange)="sortChange($event)"
                                 (onOpenModal)="openModal($event)"
                                 [resultsCount]="resultsCount"
                                 [workspacesCount]="workspacesCount"></workspaces-toolbar>`
})
class TestHostComponent {
  resultsCount: number;
  workspacesCount: number;

  filterChange(): void { }
  sortChange(): void { }
  openModal(): void { }
}

describe(`WorkspacesToolbarComponent`, () => {

  let fixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;
  let workspacesToolbarElement: DebugElement;

  let openModalSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ModalModule,
        ToolbarModule,
        WorkspaceNotFoundModule
      ],
      declarations: [
        TestHostComponent,
        WorkspacesToolbarComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;

    openModalSpy = spyOn(testHostComponent, 'openModal');

    fixture.detectChanges();

    workspacesToolbarElement = fixture.debugElement.query(By.css('workspaces-toolbar'));

  });

  it(`should compile workspaces-toolbar component`, () => {
    expect(workspacesToolbarElement).toBeTruthy();
  });

  it(`should raise 'onOpenModal' event when action is clicked`, () => {
    const openButton = workspacesToolbarElement.query(By.css('.create-workspace-action'));

    openButton.triggerEventHandler('click', null);
    expect(openModalSpy.calls.any()).toBe(true, 'testHostComponent.openModal is called');
  });

});
