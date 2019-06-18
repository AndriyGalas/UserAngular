import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from "@angular/common/http"
import { NgForm } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData : User;
  list : User[];
  readonly rootURL="https://localhost:44351/api";

  constructor(private http : HttpClient) { }

  setValues(data){
      this.formData= {
        Id:data.id,
        Name:data.name,
        Email:data.email,
        MobileNumber:data.mobileNumber,
        IsMale:data.isMale,
        IsDisabled:data.isDisabled,
        Hobbies:data.hobbies,
        Description:data.description};
      
  }

  

  postUser(formData : User)
  {
    return this.http.post(this.rootURL + '/users/', formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/users')
    .toPromise().then(res => this.list = res as User[])
  }

  putUser(formData : User){
    return this.http.put(this.rootURL+'/users/' + formData.Id, formData);
   }

   deleteUser(id : number){
    return this.http.delete(this.rootURL+'/users/'+ id);
  }
}
