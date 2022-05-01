import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LocateComponent } from './list/locate.component';
import { LocateDetailComponent } from './detail/locate-detail.component';
import { LocateUpdateComponent } from './update/locate-update.component';
import { LocateDeleteDialogComponent } from './delete/locate-delete-dialog.component';
import { LocateRoutingModule } from './route/locate-routing.module';

@NgModule({
  imports: [SharedModule, LocateRoutingModule],
  declarations: [LocateComponent, LocateDetailComponent, LocateUpdateComponent, LocateDeleteDialogComponent],
  entryComponents: [LocateDeleteDialogComponent],
})
export class LocateModule {}
