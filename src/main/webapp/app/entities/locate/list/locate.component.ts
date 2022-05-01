import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocate } from '../locate.model';
import { LocateService } from '../service/locate.service';
import { LocateDeleteDialogComponent } from '../delete/locate-delete-dialog.component';

@Component({
  selector: 'macavi-locate',
  templateUrl: './locate.component.html',
})
export class LocateComponent implements OnInit {
  locates?: ILocate[];
  isLoading = false;

  constructor(protected locateService: LocateService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.locateService.query().subscribe({
      next: (res: HttpResponse<ILocate[]>) => {
        this.isLoading = false;
        this.locates = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ILocate): number {
    return item.id!;
  }

  delete(locate: ILocate): void {
    const modalRef = this.modalService.open(LocateDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.locate = locate;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
