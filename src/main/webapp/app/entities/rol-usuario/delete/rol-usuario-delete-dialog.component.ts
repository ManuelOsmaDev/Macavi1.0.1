import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRolUsuario } from '../rol-usuario.model';
import { RolUsuarioService } from '../service/rol-usuario.service';

@Component({
  templateUrl: './rol-usuario-delete-dialog.component.html',
})
export class RolUsuarioDeleteDialogComponent {
  rolUsuario?: IRolUsuario;

  constructor(protected rolUsuarioService: RolUsuarioService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rolUsuarioService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
