import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListComponent implements OnInit {
  displayedColumns = ['name', 'phone', 'actions'];
  dataSource: any;
  constructor(
    private backendService: BackendService,
    public dialogService: MatDialog,
  ) { }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  ngOnInit() {
    this.backendService.GetContacts('https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts').subscribe(
      data => {
        if (!data) {
          this.dataSource = false;
        }
        this.dataSource = data
      }
    );
  }

  openAddDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialogService.open(AddDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    var d = new Date();
    this.dataSource.unshift({
      id: d.getTime(),
      firstName: row_obj.firstName,
      lastName: row_obj.lastName,
      phone: row_obj.phone
    });
    this.table.renderRows();

  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.firstName = row_obj.firstName;
        value.lastName = row_obj.lastName;
        value.phone = row_obj.phone;
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }

}
