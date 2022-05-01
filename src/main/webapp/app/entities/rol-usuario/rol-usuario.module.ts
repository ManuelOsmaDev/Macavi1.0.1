import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RolUsuarioComponent } from './list/rol-usuario.component';
import { RolUsuarioDetailComponent } from './detail/rol-usuario-detail.component';
import { RolUsuarioUpdateComponent } from './update/rol-usuario-update.component';
import { RolUsuarioDeleteDialogComponent } from './delete/rol-usuario-delete-dialog.component';
import { RolUsuarioRoutingModule } from './route/rol-usuario-routing.module';

@NgModule({
  imports: [SharedModule, RolUsuarioRoutingModule],
  declarations: [RolUsuarioComponent, RolUsuarioDetailComponent, RolUsuarioUpdateComponent, RolUsuarioDeleteDialogComponent],
  entryComponents: [RolUsuarioDeleteDialogComponent],
})
export class RolUsuarioModule {}
