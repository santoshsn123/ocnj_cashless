import { Component, OnInit, Inject } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { UsersService } from "../services/users/users.service";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

export interface DialogData {
  uuid: string;
  type: string;
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: any;
  animal: string;
  name: string;
  showerrorMessage: string = "";
  showsuccessMessage: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 10;
  userType: string = "";

  loading: boolean = true;
  constructor(
    private data: DataService,
    private user: UsersService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "500px",
      data: { uuid: "", type: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if (result == "add") {
        this.loadUsers();
        this.showSuccessMessage("New user added successfully");
      }
      if (result == "edit") {
        this.loadUsers();
        this.showSuccessMessage("User Updated successfully");
      }
    });
  }

  viewTransactions = user => {
    this.user.setUserData(user);
    this.router.navigate(["posts"]);
  };

  showSuccessMessage = message => {
    this.showsuccessMessage = message;
    setTimeout(() => {
      this.closeMessage();
    }, 1800);
  };

  ngOnInit() {
    this.loading = true;
    this.loadUsers();
  }
  closeMessage() {
    this.showsuccessMessage = "";
  }
  ActiveInactive = user => {
    if (user.activeStatus == 1) {
      if (confirm("Do you really want to deactivate user?")) {
        this.updateStatus(user);
      }
    } else {
      if (confirm("Do you really want to Activate user?")) {
        this.updateStatus(user);
      }
    }
  };
  updateStatus = user => {
    this.user.changeUserStatus(user, user.uuid).subscribe(status => {
      this.loadUsers();
      this.showSuccessMessage("User status Updated successfully");
    });
  };
  loadUsers() {
    this.user.getAllUsers().subscribe(data => {
      this.users = data;
      this.loading = false;
    });
  }
  deleteUser(user) {
    if (confirm("Do you really want to delete this user ?")) {
      this.user.deleteUser(user.uuid).subscribe(
        data => {
          this.loadUsers(); //loading Users after deleting users.
          this.showerrorMessage = "";
          this.showSuccessMessage("User Deleted successfully");
        },
        error => {
          this.showerrorMessage = error.error.message;
        }
      );
    } else {
    }
  }

  editUser = user => {
    user.type = "edit";
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "500px",
      data: { uuid: user.uuid, type: "edit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "edit") {
        this.loadUsers();
        this.showSuccessMessage("User Updated successfully");
      }
    });
  };
}

/*------------------Popup code--------------------*/

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html",
  styleUrls: ["./users.component.scss"]
})
export class DialogOverviewExampleDialog {
  registerForm: FormGroup;
  submitted = false;
  isMerchant;
  passwordmissmatch: boolean = false;
  showBankingError: string;
  errorMessage: string;
  FetchedUser;

  // accountDetails
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private user: UsersService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      phone: ["", [Validators.required, Validators.minLength(10)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      isMerchant: ["", [Validators.required]],
      address: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      cpassword: ["", [Validators.required]],
      bankRoutingNo: ["", []],
      bankAccountNo: ["", []]
    });

    //Fetch data to display in form to update
    if (this.data.type == "edit") {
      this.user.getSingleUser(this.data.uuid).subscribe(FetchedUser => {
        this.FetchedUser = FetchedUser;
        this.registerForm.patchValue({
          email: this.FetchedUser.user.email,
          password: this.FetchedUser.user.password,
          phone: this.FetchedUser.user.phone,
          firstName: this.FetchedUser.user.firstName,
          lastName: this.FetchedUser.user.lastName,
          isMerchant: this.FetchedUser.user.isMerchant ? "true" : "false",
          address: this.FetchedUser.location.localAddress,
          userName: this.FetchedUser.user.userName,
          cpassword: this.FetchedUser.user.cpassword,
          bankRoutingNo: this.FetchedUser.bankdetails
            ? this.FetchedUser.bankdetails.bankRoutingNo
            : "",
          bankAccountNo: this.FetchedUser.bankdetails
            ? this.FetchedUser.bankdetails.bankAccountNo
            : ""
        });
        this.registerForm.get("password").clearValidators();
        this.registerForm.get("password").updateValueAndValidity();
        this.registerForm.get("cpassword").clearValidators();
        this.registerForm.get("cpassword").updateValueAndValidity();
      });
    }
    // this.registerForm.value=this.data;
  }

  get f() {
    return this.registerForm.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  checkPasswords() {
    this.registerForm.controls.password.value ==
    this.registerForm.controls.cpassword.value
      ? (this.passwordmissmatch = true)
      : (this.passwordmissmatch = false);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      var value = this.checkPasswords();
      if (!this.passwordmissmatch) {
        return;
      }
      return;
    } else {
      var value = this.checkPasswords();
      if (!this.passwordmissmatch) {
        return;
      }

      if (this.isMerchant == "true") {
        if (
          !this.registerForm.value.bankRoutingNo ||
          !this.registerForm.value.bankAccountNo
        ) {
          this.showBankingError = "Please enter Bank Details.";
          return;
        } else {
          this.showBankingError = "";
          this.registerForm.value.accountDetails = {
            bankRoutingNo: this.registerForm.value.bankRoutingNo,
            bankAccountNo: this.registerForm.value.bankAccountNo
          };
          this.saveUser();
        }
      } else {
        this.registerForm.value.isMerchant = false;
        this.saveUser();
        // this.user.saveUser(this.registerForm.value).subscribe(
        //   data => {
        //     this.dialogRef.close("add");
        //   },
        //   error => {
        //     this.errorMessage = error.error.message;
        //   }
        // );
      }
    }

    // alert('SUCCESS!! :-)')
  }

  saveUser = () => {
    if (this.data.type == "add") {
      this.user.saveUser(this.registerForm.value).subscribe(
        data => {
          this.dialogRef.close("add");
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    } else {
      this.user
        .editUser(this.registerForm.value, this.FetchedUser.user.uuid)
        .subscribe(
          data => {
            this.dialogRef.close("edit");
          },
          error => {
            this.errorMessage = error.error.message;
          }
        );
    }
  };
}
