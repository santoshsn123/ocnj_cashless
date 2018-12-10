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

export interface DialogData {
  animal: string;
  name: string;
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

  constructor(
    private data: DataService,
    private user: UsersService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "500px",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed ", result);
      // this.animal = result;
      if(result=='add')
      {
        this.loadUsers();
        this.showSuccessMessage("New user added successfully");
      }
      
    });
  }

  showSuccessMessage=(message)=>{ this.showsuccessMessage = message; setTimeout(()=>{this.closeMessage();},1800) }

  ngOnInit() {
    this.loadUsers();
  }
  closeMessage() {
    this.showsuccessMessage = "";
  }

  loadUsers() {
    this.user.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }
  deleteUser(user) {
    if (confirm("Do you really want to delete this user ?")) {
      console.log("Here is user which we need to delete :- ", user);
      this.user.deleteUser(user.uuid).subscribe(
        data => {
          console.log("Data after delete :-  ", data);
          this.loadUsers(); //loading Users after deleting users.
          this.showerrorMessage = "";
          this.showSuccessMessage("User Deleted successfully");
        },
        error => {
          this.showerrorMessage = error.error.message;
        }
      );
    } else {
      console.log("No need to delete anything ");
    }
  }
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
  }

  // changeFieldsChange=()=>{
  //   console.log(this.isMerchant);
  //   // if(this.registerForm.value.isMerchant){

  //     // this.registerForm.addControl('bankRoutingNo',[]);
  //     // this.registerForm.addControl('bankRoutingNo',[validator]);
  //     // this.registerForm.addControl('bankRoutingNo', new FormControl('', Validators.required));
  //   // }
  // }

  // ,{validators:this.checkPasswords} ,{validator:this.passwordMissmatch.MatchPassword}
  get f() {
    return this.registerForm.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  checkPasswords() {
    console.log(this.registerForm.controls.password.value);
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
      // console.log("Saving this data : - ",this.registerForm.value);

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
          this.user.saveUser(this.registerForm.value).subscribe(
            data => {
              console.log("data : - ", data);
            },
            error => {
              this.errorMessage = error.error.message;
            }
          );
        }
      } else {
        this.registerForm.value.isMerchant = false;
        this.user.saveUser(this.registerForm.value).subscribe(
          data => {
            // console.log("data : - ", data);
            this.dialogRef.close("add");
          },
          error => {
            this.errorMessage = error.error.message;
          }
        );
      }
    }

    // alert('SUCCESS!! :-)')
  }
}
