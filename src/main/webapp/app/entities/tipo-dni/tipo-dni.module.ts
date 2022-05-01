import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoDniComponent } from './list/tipo-dni.component';
import { TipoDniDetailComponent } from './detail/tipo-dni-detail.component';
import { TipoDniUpdateComponent } from './update/tipo-dni-update.component';
import { TipoDniDeleteDialogComponent } from './delete/tipo-dni-delete-dialog.component';
import { TipoDniRoutingModule } from './route/tipo-dni-routing.module';

@NgModule({
  imports: [SharedModule, TipoDniRoutingModule],
  declarations: [TipoDniComponent, TipoDniDetailComponent, TipoDniUpdateComponent, TipoDniDeleteDialogComponent],
  entryComponents: [TipoDniDeleteDialogComponent],
})
export class TipoDniModule {}
