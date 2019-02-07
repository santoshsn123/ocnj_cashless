import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions/transactions.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private transaction: TransactionsService) {}
  merchantCount;
  payoutAmount;
  giftAmount;
  creditAmount;
  ngOnInit() {
    this.getAllStats();
  }

  getAllStats = () => {
    this.transaction
      .getAllMerchants()
      .subscribe(merchantCount => (this.merchantCount = merchantCount));

    this.transaction
      .getMTDMerchantPayout()
      .subscribe(amount => (this.payoutAmount = amount));

    this.transaction
      .getMTDGiftCardPurchased()
      .subscribe(amount => (this.giftAmount = amount));

    this.transaction
      .getMTDCreditPurchased()
      .subscribe(amount => (this.creditAmount = amount));
  };
}
