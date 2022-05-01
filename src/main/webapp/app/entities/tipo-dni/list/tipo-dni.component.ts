import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoDni } from '../tipo-dni.model';
import { TipoDniService } from '../service/tipo-dni.service';
import { TipoDniDeleteDialogComponent } from '../delete/tipo-dni-delete-dialog.component';

@Component({
  selector: 'macavi-tipo-dni',
  templateUrl: './tipo-dni.component.html',
})
export class TipoDniComponent implements OnInit {
  tipoDnis?: ITipoDni[];
  isLoading = false;

  constructor(protected tipoDniService: TipoDniService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tipoDniService.query().subscribe({
      next: (res: HttpResponse<ITipoDni[]>) => {
        this.isLoading = false;
        this.tipoDnis = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ITipoDni): number {
    return item.id!;
  }

  delete(tipoDni: ITipoDni): void {
    const modalRef = this.modalService.open(TipoDniDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoDni = tipoDni;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
