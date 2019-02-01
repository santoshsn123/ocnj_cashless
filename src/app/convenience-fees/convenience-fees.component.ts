import { Component, OnInit, Inject } from "@angular/core";
import { GiftCardService } from "../services/gift-card/gift-card.service";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

import { DialogData } from "../users/users.component";

@Component({
  selector: "app-convenience-fees",
  templateUrl: "./convenience-fees.component.html",
  styleUrls: ["./convenience-fees.component.scss"]
})
export class ConvenienceFeesComponent implements OnInit {
  conveniences;
  itemsPerPage = 10;
  currentPage = 1;
  loading: boolean = false;
  showsuccessMessage: String = "";
  constructor(private giftcard: GiftCardService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllConvenience();
  }

  getAllConvenience = () => {
    this.loading = true;
    this.giftcard.getConvenienceFees().subscribe(data => {
      console.log(data);
      this.conveniences = data;
      this.loading = false;
    });
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(createConvenience, {
      width: "500px",
      data: { convId: "", type: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "add") {
        this.showSuccessMessage("Convenience Fees added successfully");
        this.getAllConvenience();
      }
    });
  }

  showSuccessMessage = message => {
    this.showsuccessMessage = message;
    setTimeout(() => {
      this.closeMessage();
    }, 1800);
  };

  closeMessage() {
    this.showsuccessMessage = "";
  }

  deleteConv = conv => {
    if (confirm("Do You really want to delete this record?")) {
      this.giftcard.deleteConv(conv.id).subscribe(data => {
        this.showSuccessMessage("Record Deleted successfully");
        this.getAllConvenience();
      });
    }
  };

  editConv = conv => {
    const dialogRef = this.dialog.open(createConvenience, {
      width: "500px",
      data: { convId: conv.id, type: "edit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "edit") {
        this.getAllConvenience();
        this.showSuccessMessage("Convenience Fees Updated successfully");
      }
    });
  };
}

/*------------------Popup code--------------------*/

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "create-convenience-fees.html",
  styleUrls: ["./convenience-fees.component.scss"]
})
export class createConvenience {
  submitted = false;
  isMerchant;
  passwordmissmatch: boolean = false;
  showBankingError: string;
  errorMessage: string;
  FetchedUser;
  amountMin;
  amountMax;
  rate;
  pageData;
  // accountDetails
  constructor(
    public dialogRef: MatDialogRef<createConvenience>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gift: GiftCardService
  ) {}

  ngOnInit() {
    this.pageData = this.data;
    if (this.pageData.type == "edit") {
      this.gift
        .getConvenienceFeesOne(this.pageData.convId)
        .subscribe(response => {
          console.log(response);
          this.amountMin = response[0].amountMin;
          this.amountMax = response[0].amountMax;
          this.rate = response[0].rate;
        });
    }
  }
  onSubmit = () => {
    this.errorMessage = "";
    if (this.amountMin < 25) {
      this.errorMessage = "Min Ammount Can not be less than 25";
      return false;
    }
    let object = {
      amountMin: this.amountMin,
      amountMax: this.amountMax,
      rate: this.rate,
      uuid: JSON.parse(localStorage.getItem("user")).uuid
    };
    if (this.pageData.type == "add") {
      this.gift.createConvenienceFees(object).subscribe(
        data => {
          this.dialogRef.close("add");
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }
    if (this.pageData.type == "edit") {
      this.gift.updateConvenienceFees(this.pageData.convId, object).subscribe(
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
