import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users/users.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  constructor(private user: UsersService, private data: DataService) {}

  oldpassword;
  newpassword;
  confpassword;
  userDetails;
  errorMessage: string = "";
  successMessage: string = "";
  status;
  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem("user"));
  }

  changePassword = () => {
    this.user
      .changePassword(
        {
          oldpassword: this.oldpassword,
          newpassword: this.newpassword,
          confpassword: this.confpassword
        },
        this.userDetails.uuid
      )
      .subscribe(
        stats => {
          this.status = stats;
          this.successMessage = this.status.message;
          this.errorMessage = "";
        },
        error => {
          this.errorMessage = error.error.message;
          this.successMessage = "";
        }
      );
  };
}