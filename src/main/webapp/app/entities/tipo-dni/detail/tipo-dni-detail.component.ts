import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDni } from '../tipo-dni.model';

@Component({
  selector: 'macavi-tipo-dni-detail',
  templateUrl: './tipo-dni-detail.component.html',
})
export class TipoDniDetailComponent implements OnInit {
  tipoDni: ITipoDni | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDni }) => {
      this.tipoDni = tipoDni;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
