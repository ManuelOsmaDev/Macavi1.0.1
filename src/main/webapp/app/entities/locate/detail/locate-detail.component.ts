import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocate } from '../locate.model';

@Component({
  selector: 'macavi-locate-detail',
  templateUrl: './locate-detail.component.html',
})
export class LocateDetailComponent implements OnInit {
  locate: ILocate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ locate }) => {
      this.locate = locate;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
