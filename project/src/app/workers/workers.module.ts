import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersListComponent } from './workers-list/workers-list.component';
import { EditWorkerComponent } from './edit-worker/edit-worker.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    WorkersListComponent,
    EditWorkerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class WorkersModule { }
