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
  convenienceFees;
  adminCount;

  // MerchantCurrentPage: number = 1;
  // MerchantItemsPerPage: number = 5;

  ngOnInit() {
    this.getAllStats();
  }
  userTypes: string;
  thismonthACH: boolean = false;
  thismonthGiftCard: boolean = false;
  thismonthPurchasedCredits: boolean = false;
  convenienceFeesPaid: boolean = false;
  getAllStats = () => {
    this.transaction.getAllMerchants().subscribe(merchantCount => {
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

    this.transaction.getAllConvenienceFeesPaid().subscribe(amount => {
      this.convenienceFees = amount;
      this.convenienceFees = this.convenienceFees.count.toFixed(2);
    });
    this.transaction.getAllAdminCount().subscribe(admin => {
      // console.log(admin);
      this.adminCount = admin;
      this.adminCount = this.adminCount.count.count;
    });
  };

  getActiveMerchants = () => {};

  setValues = () => {
    this.userTypes = "";
    this.thismonthACH = false;
    this.thismonthGiftCard = false;
    this.thismonthPurchasedCredits = false;
    this.convenienceFeesPaid = false;
  };
}
