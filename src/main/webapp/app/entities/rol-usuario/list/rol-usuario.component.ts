import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRolUsuario } from '../rol-usuario.model';
import { RolUsuarioService } from '../service/rol-usuario.service';
import { RolUsuarioDeleteDialogComponent } from '../delete/rol-usuario-delete-dialog.component';

@Component({
  selector: 'macavi-rol-usuario',
  templateUrl: './rol-usuario.component.html',
})
export class RolUsuarioComponent implements OnInit {
  rolUsuarios?: IRolUsuario[];
  isLoading = false;

  constructor(protected rolUsuarioService: RolUsuarioService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.rolUsuarioService.query().subscribe({
      next: (res: HttpResponse<IRolUsuario[]>) => {
        this.isLoading = false;
        this.rolUsuarios = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IRolUsuario): number {
    return item.id!;
  }

  delete(rolUsuario: IRolUsuario): void {
    const modalRef = this.modalService.open(RolUsuarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rolUsuario = rolUsuario;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
