import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions/transactions.service";

@Component({
  selector: "app-purchased-bucks",
  templateUrl: "./purchased-bucks.component.html",
  styleUrls: ["./purchased-bucks.component.scss"]
})
export class PurchasedBucksComponent implements OnInit {
  constructor(private trans: TransactionsService) {}

  purchasedBuck;
  showsuccessMessage;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  loading: boolean = true;
  ngOnInit() {
    this.loading = true;
    this.getPrchasedBucks();
  }

  getPrchasedBucks = () => {
    this.trans.getPurchasedBucks().subscribe(data => {
      this.purchasedBuck = data;
      this.loading = false;
    });
  };
}
