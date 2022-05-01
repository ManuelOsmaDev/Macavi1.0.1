import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRolUsuario } from '../rol-usuario.model';

@Component({
  selector: 'macavi-rol-usuario-detail',
  templateUrl: './rol-usuario-detail.component.html',
})
export class RolUsuarioDetailComponent implements OnInit {
  rolUsuario: IRolUsuario | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rolUsuario }) => {
      this.rolUsuario = rolUsuario;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
