import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocate } from '../locate.model';
import { LocateService } from '../service/locate.service';

@Component({
  templateUrl: './locate-delete-dialog.component.html',
})
export class LocateDeleteDialogComponent {
  locate?: ILocate;

  constructor(protected locateService: LocateService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.locateService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
