import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoDni } from '../tipo-dni.model';
import { TipoDniService } from '../service/tipo-dni.service';

@Component({
  templateUrl: './tipo-dni-delete-dialog.component.html',
})
export class TipoDniDeleteDialogComponent {
  tipoDni?: ITipoDni;

  constructor(protected tipoDniService: TipoDniService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDniService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
