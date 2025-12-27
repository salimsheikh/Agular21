import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  userForm: FormGroup = new FormGroup({
    userId: new FormControl(0),
    userName: new FormControl(""),
    emailId: new FormControl(""),
    fullName: new FormControl(""),
    role: new FormControl("Customer"),
    projectName: new FormControl("BusBooking"),
    password: new FormControl("123456")
  });

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  urlPrefix: string = "https://api.freeprojectapi.com/api/BusBooking/";
  usersList: any[] = [];
  pagedUsers: any[] = [];
  totalPages: number = 0;
  pageSize: number = 4;
  currentPage: number = 1;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<{ data: any[] }>(this.urlPrefix + "getAllUsers")
      .subscribe({
        next: response => {
          this.usersList = response.data;
          this.totalPages = Math.ceil(response.data.length / this.pageSize);
          this.currentPage = 1;
          this.upagePage();
          this.cdr.markForCheck();
        }, error: err => {
          console.log("Error on api ", err);
        }
      });
  }

  upagePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedUsers = this.usersList.slice(start, end);
    // console.log("currentPage", this.currentPage);
    // console.log("pageed User", this.pagedUsers);
    // console.log("pageed length", this.pagedUsers.length);
    // console.log("Page Size", this.pageSize);
    // console.log("Start", start);
    // console.log("End", end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.upagePage();
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  onSubmit() {
    const formValue = this.userForm.value
    const userId = formValue.userId;
    const url = userId > 0 ? this.urlPrefix + "UpdateUser/" : this.urlPrefix + "AddNewUser";

    console.log(url);

    this.http.post(url, formValue)
      .subscribe({
        next: res => {
          if(userId > 0){
            console.log("Successfully updated");
          }else{
            console.log("Successfully Saved");
          }          
          console.log(res);
        }, error: err => {
          console.log("Error on save user");
          console.log(err);
        }
      });
  }

  userEdit(item: any) {
    this.userForm = new FormGroup({
      userId: new FormControl(item.userId),
      userName: new FormControl(item.userName),
      emailId: new FormControl(item.emailId),
      fullName: new FormControl(item.fullName),
      role: new FormControl(item.role),
      projectName: new FormControl(item.projectName),
      password: new FormControl(item.password)
    });
  }

  userDelete(item: any) {
    this.http.delete(this.urlPrefix + "DeleteUserByUserId/"+ item.userId)
    .subscribe({
      next: res => {
        console.log("Deleted successfully.")
      },
      error: err => { console.log("Error on delete.")}
    });
   }
}
