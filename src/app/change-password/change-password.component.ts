import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users/users.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  constructor(private user: UsersService) {}

  oldpassword;
  newpassword;
  confpassword;

  ngOnInit() {}
  changePassword = () => {
    console.log("Function called", this.oldpassword);
    this.user
      .changePassword({
        oldpassword: this.oldpassword,
        newpassword: this.newpassword,
        confpassword: this.newpassword
      })
      .subscribe(stats => {
        console.log(stats);
      });
  };
}
