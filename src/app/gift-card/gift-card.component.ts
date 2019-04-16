import { Component, OnInit, Inject, Input } from "@angular/core";

import { GiftCardService } from "../services/gift-card/gift-card.service";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { DialogData } from "../users/users.component";
import { Angular2CsvComponent } from "angular2-csv";
import { Router } from "@angular/router";
@Component({
  selector: "app-gift-card",
  templateUrl: "./gift-card.component.html",
  styleUrls: ["./gift-card.component.scss"]
})
export class GiftCardComponent implements OnInit {
  showsuccessMessage: string = "";
  giftCards;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  loading: boolean = true;
  noCards;

  @Input() dashboardGiftCard: boolean;
  constructor(
    private gift: GiftCardService,
    public dialog: MatDialog,
    private download: Angular2CsvComponent,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getAllCards();
  }

  getAllCards = () => {
    this.gift.getAllCards().subscribe(data => {
      this.giftCards = data;
      this.loading = false;
    });
  };

  deleteCard = card => {
    if (confirm("Do you really want to delete this card?")) {
      this.gift.deleteCard(card.uuid).subscribe(status => {
        this.getAllCards();
        this.showSuccessMessage("Card deleted successfully");
      });
    }
  };
  gotoUserDetails = id => {
    this.router.navigate(["posts/" + id]);
  };

  showSuccessMessage = message => {
    this.showsuccessMessage = message;
    setTimeout(() => {
      this.closeMessage();
    }, 1800);
  };

  closeMessage() {
    this.showsuccessMessage = "";
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(createGiftCard, {
      width: "500px",
      data: { uuid: "", type: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "add") {
        this.getAllCards();
        this.showSuccessMessage("Cards added successfully");
      }
    });
  }

  downloadAllCards = () => {
    this.options;
    this.download.filename = "GiftCards";
    this.download.data = this.giftCards;
    this.download.options = this.options;
    this.download.generateCsv();
  };

  options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalseparator: ".",
    showLabels: false,
    filename: "GiftCards",
    headers: [
      "Gift Card Code",
      "Created Time",
      "Expiry Time",
      "Created By First Name",
      "Created By Last Name",
      "Redeem Status",
      "Used By First Name",
      "Used By Last Name"
    ],
    showTitle: true,
    title: "GiftCards",
    useBom: false,
    removeNewLines: true,
    keys: [
      "unique_code",
      "createdAt",
      "gift_expiry_date",
      "p_firstname",
      "p_lastname",
      "redeemed_status",
      "used_firstname",
      "used_firstname"
    ]
  };
}

/*------------------Popup code--------------------*/

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html",
  styleUrls: ["./gift-card.component.scss"]
})
export class createGiftCard {
  submitted = false;
  isMerchant;
  passwordmissmatch: boolean = false;
  showBankingError: string;
  errorMessage: string;
  FetchedUser;
  amount;
  noOfCards;
  amountError;
  // accountDetails
  constructor(
    public dialogRef: MatDialogRef<createGiftCard>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gift: GiftCardService
  ) {}

  onSubmit = () => {
    this.amountError = "";
    if (!this.noOfCards || !this.amount) {
      this.amountError = "Please enter values before proceed";
      return false;
    }
    if (this.noOfCards < 1) {
      this.amountError = "Please Enter valid card number";
      return false;
    }
    if (this.amount < 25) {
      this.amountError = "Please Enter amount more than 25";
    } else {
      this.amountError = "";
      let object = {
        noOfCards: this.noOfCards,
        amount: this.amount,
        uuid: JSON.parse(localStorage.getItem("user")).uuid
      };
      this.gift.createGiftCards(object).subscribe(
        data => {
          this.dialogRef.close("add");
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }
  };
}
