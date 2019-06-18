import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  

  constructor(private service: UserService,
    private toastr : ToastrService,
    public dialogRef: MatDialogRef<UserComponent>) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm()
  {
    if(this.service.formData == null)

    this.service.formData = { 
      Id: 0,
      Name: '',
      Email: '',
      MobileNumber: '',
      IsMale: 'true',
      IsDisabled: 'true',
      Hobbies: '',
      Description: ''
    }
  }

  onSubmit(form : NgForm)
  {
    if (this.service.formData.Id == undefined)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form : NgForm)
  {
    this.service.postUser(form.value).subscribe(res =>{
      this.toastr.success('Inserted successfully','User Registered');
      this.resetForm();
      this.service.refreshList();
    });
    this.onClose();
  }

  updateRecord(form: NgForm) {
    this.service.putUser(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'User Register');
      this.resetForm();
      this.service.refreshList();
    });
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }
}
