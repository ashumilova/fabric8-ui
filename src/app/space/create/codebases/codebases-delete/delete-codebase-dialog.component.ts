import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Modal } from 'ngx-modal';
import { Codebase } from '../services/codebase';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'delete-codebase-dialog',
  templateUrl: './delete-codebase-dialog.component.html',
  styleUrls: ['./delete-codebase-dialog.component.less']
})
export class DeleteCodebaseDialogComponent implements OnInit, OnDestroy {

  @Input() host: Modal;
  @Input() codebase: Codebase;
  @Output() onDelete = new EventEmitter<Codebase>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  deleteCodebase () {
    this.host.close();
    this.onDelete.emit(this.codebase);
  }

  cancel() {
    this.host.close();
  }
}
