import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContactListRoutingModule } from './contact-list-routing.module';
import { BackendService } from './services/backend.service';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';


@NgModule({
  declarations: [
    ContactListComponent,
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    ContactListRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [BackendService]
})
export class ContactListModule { }
