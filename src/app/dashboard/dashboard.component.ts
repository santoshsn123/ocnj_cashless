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
  merchant;
  activeMerchants;
  payoutAmount;
  giftAmount;
  creditAmount;

  MerchantCurrentPage: number = 1;
  MerchantItemsPerPage: number = 5;
  ngOnInit() {
    this.getAllStats();
  }

  getAllStats = () => {
    this.transaction.getAllMerchants().subscribe(merchantCount => {
      console.log(merchantCount);
      this.merchant = merchantCount;
      this.merchantCount = this.merchant.count;
      this.activeMerchants = this.merchant.rows;
    });

    this.transaction.getMTDMerchantPayout().subscribe(amount => {
      this.payoutAmount = amount;
      this.payoutAmount = this.payoutAmount.count;
    });

    this.transaction.getMTDGiftCardPurchased().subscribe(amount => {
      this.giftAmount = amount;
      this.giftAmount = this.giftAmount.count;
    });

    this.transaction.getMTDCreditPurchased().subscribe(amount => {
      this.creditAmount = amount;
      this.creditAmount = this.creditAmount.count;
    });
  };

  getActiveMerchants = () => {};
}
