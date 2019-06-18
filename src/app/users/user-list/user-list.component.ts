import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from "@angular/material"
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  constructor(private service : UserService,
    private toastr : ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(user : User) {
    this.service.setValues(user);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = user;
    this.dialog.open(UserComponent,dialogConfig);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteUser(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'User Register');
      });
    }
  }

  onCreate(){
    this.service.setValues({Id:0});
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserComponent,dialogConfig);
  }
}
