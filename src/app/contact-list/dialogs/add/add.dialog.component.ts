import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  addContact: FormGroup;
  submitted: boolean = false;
  action: string;
  local_data: any;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private fb: FormBuilder
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit() {
    this.addContact = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phone': ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });
    if (this.local_data) {
      this.addContact.addControl('id', this.fb.control(this.local_data.id));
      this.addContact.patchValue({
        firstName: this.local_data.firstName,
        lastName: this.local_data.lastName,
        phone: this.local_data.phone
      });
    }
  }
  get addContactControls() { return this.addContact.controls; }
  onClose(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onSubmitContact() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addContact.invalid) {
      return;
    }
    this.dialogRef.close({ event: this.action, data: this.addContact.value });
  }


  confirmDelete(data: any) {
    this.dialogRef.close({ event: this.action, data: data });
  }
}
